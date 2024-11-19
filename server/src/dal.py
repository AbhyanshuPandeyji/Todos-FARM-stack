#data access later
# to run the mongodb object ids
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo import ReturnDocument

# for creating classes
from pydantic import BaseModel


# to generate unique ids
from uuid import uuid4



# Data models - so we able to use
# the class as an schema for sending request to mongo db
class ListSummary(BaseModel):
  id: str
  name: str
  item_count: int

  @staticmethod
  def from_doc(doc) -> "ListSummary":
      return ListSummary(
          id=str(doc["_id"]),
          name=doc["name"],
          item_count=doc["item_count"],
      )

class ToDoListItem(BaseModel):
  id: str
  label: str
  checked: bool

  @staticmethod
  def from_doc(item) -> "ToDoListItem":
      return ToDoListItem(
          id=item["id"],
          label=item["label"],
          checked=item["checked"],
      )

class ToDoList(BaseModel):
  id: str
  name: str
  items: list[ToDoListItem]

  @staticmethod
  def from_doc(doc) -> "ToDoList":
      return ToDoList(
          id=str(doc["_id"]),
          name=doc["name"],
          items=[ToDoListItem.from_doc(item) for item in doc["items"]],
      )

class ToDoDAL:
  def __init__(self, todo_collection: AsyncIOMotorCollection):
      self._todo_collection = todo_collection

  async def list_todo_lists(self, session=None):
      async for doc in self._todo_collection.find(
          {},
          projection={
              "name": 1,
              "item_count": {"$size": "$items"},
          },
          sort={"name": 1},
          session=session,
      ):
          yield ListSummary.from_doc(doc)

  async def create_todo_list(self, name: str, session=None) -> str:
      response = await self._todo_collection.insert_one(
          {"name": name, "items": []},
          session=session,
      )
      return str(response.inserted_id)

  async def get_todo_list(self, id: str | ObjectId, session=None) -> ToDoList:
      doc = await self._todo_collection.find_one(
          {"_id": ObjectId(id)},
          session=session,
      )
      return ToDoList.from_doc(doc)

  async def delete_todo_list(self, id: str | ObjectId, session=None) -> bool:
      response = await self._todo_collection.delete_one(
          {"_id": ObjectId(id)},
          session=session,
      )
      return response.deleted_count == 1

  async def create_item(
      self,
      id: str | ObjectId,
      label: str,
      session=None,
  ) -> ToDoList | None:
      result = await self._todo_collection.find_one_and_update(
          {"_id": ObjectId(id)},
          {
              "$push": {
                  "items": {
                      "id": uuid4().hex,
                      "label": label,
                      "checked": False,
                  }
              }
          },
          session=session,
          return_document=ReturnDocument.AFTER,
      )
      if result:
          return ToDoList.from_doc(result)

  async def set_checked_state(
      self,
      doc_id: str | ObjectId,
      item_id: str,
      checked_state: bool,
      session=None,
    #   this is the way to say this all the data is referencing to a class
    #   type todo list
  ) -> ToDoList | None:
      result = await self._todo_collection.find_one_and_update(
          {"_id": ObjectId(doc_id), "items.id": item_id},
          {"$set": {"items.$.checked": checked_state}},
          session=session,
          return_document=ReturnDocument.AFTER,
      )
      if result:
          return ToDoList.from_doc(result)

  async def delete_item(
      self,
      doc_id: str | ObjectId,
      item_id: str,
      session=None,
  ) -> ToDoList | None:
    #   its this keyword like in js in this code the self -> and as we 
    #   are using the same class to do all the operations in the same file 
    #   and all the other classes are also here , we dont need to import 
    #   just use these classes
      result = await self._todo_collection.find_one_and_update(
        #   to search an item
          {"_id": ObjectId(doc_id)},
        # to apply a sepecific functionality or logic to that item
          {"$pull": {"items": {"id": item_id}}},
          session=session,
        # return the updated data
          return_document=ReturnDocument.AFTER,
      )

    #   if successful then create an object on the basis of todolist class 
    #   and return that from that class when used
    #   its basically using a class with builtin methods that later uses the
    #   other classes as data type to use and then return the values
    #   from this functions in the main class as used 
      if result:
          return ToDoList.from_doc(result)