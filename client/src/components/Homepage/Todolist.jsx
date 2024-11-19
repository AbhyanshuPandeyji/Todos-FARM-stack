// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import ConfirmMessage from "../../common/ConfirmMessage";
// import { MdDeleteOutline } from "react-icons/md";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { Modal, Select } from "antd";
// import { IoMdAdd } from "react-icons/io";
// import { IoReload, IoSearch } from "react-icons/io5";

// import { blogsData } from "../../constants/BlogsDataConstant";


// const Todolist = ({ toggle }) => {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [editModal, setEditModal] = useState(false);
//   // const [selectedUser, setSelectedUser] = useState(null);
//   const [editRow, setEditRow] = useState(null)
//   const navigate = useNavigate();

//   const tableCustomStyles = {
//     headRow: {
//       style: {
//         background: "linear-gradient(90deg, #359FF3 0%, #8256FF 100%)",
//         color: "#ffffff",
//         fontWeight: "38px",
//         fontSize: "14px",
//         borderRadius: "5px",
//         minHeight: "41px",
//       },
//     },
//     rows: {
//       style: {
//         borderBottomStyle: "solid",
//         borderBottomWidth: "1px",
//         borderBottomColor: "#42bbff",
//         cursor: "pointer",
//         "&:not(:last-of-type)": {
//           borderBottomStyle: "solid",
//           borderBottomWidth: "1px",
//           borderBottomColor: "#42bbff",
//         },
//       },
//     },
//   };


//   const columns = [
//     // Changes Done By Abhyanshu
//     // {
//     //   name: "Id",
//     //   selector: (row) => row._id,
//     // },
//     {
//       name: "Name",
//       selector: (row) => (  
        
//         <div className="p-8 my-4 bg-blue-400 rounded-lg w-[100vw]" > {row.title}</div>
//       ),
//       width: "60vw",
//     },
//     // {
//     //   name: "Edit",
//     //   selector: (row) => {
//     //     return (
//     //       <button
//     //         // onClick={(e) => handleEditData(e, row)}
//     //         onClick={(e) => { setEditModal(true); setEditRow(row) }}
//     //         className="flex bg-green-600 font-semibold text-white rounded-lg justify-center items-center px-3 py-1" >
//     //         {/* <span><MdOutlineModeEdit size={"14px"} /></span> */}
//     //         <span className="text-sm">Edit</span>
//     //       </button>
//     //     )
//     //   },
//     //   width: "120px"
//     // },
//     {
//       name: "Delete",
//       width: "100px",
//       cell: (row) => {

//         // const handleDeleteCampaign = (id) => {
//         //   if (!row) {
//         //     return
//         //   }
//         //   const singleUserArr = []
//         //   singleUserArr.push(id);
//         //   dispatch(deleteCampaigns({ userId: singleUserArr, accountId: singleUser.accountId }));
//         // }

//         return (
//           <div>
//             < button
//               className="bg-red-400 px-2 py-1 rounded-md text-white font-semibold"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setSelectedRow(row)
//               }}
//             > Delete
//             </button >
//           </div>
//         )
//       }
//     }
//   ];

//   const dispatch = useDispatch();
//   // const { allCampaigns, singleUser } = useSelector((state) => state.campaigns);
//   // const { getLoader } = useSelector((state) => state.loaders);

//   // console.log(allCampaigns)

//   // console.log(allCampaigns)

//   // const rowClickHandler = (campaignDetails) => {
//   //   dispatch(
//   //     getCampaignByNameThunkMiddleware(
//   //       {
//   //         campaignName: campaignDetails.name,
//   //       },
//   //       (error) => {
//   //         if (!error) {
//   //           navigate("campaigndetails");
//   //         }
//   //       }
//   //     )
//   //   );
//   // };

//   const [multiSelectRows, setMultiSelectRows] = useState([]);
//   // const [seletedUsersId , SetSelectedUsersId] = useState(null)

//   const handleSelectedRowsChange = (state) => {
//     // selected rows is the property of the datatable rows
//     setMultiSelectRows(state.selectedRows); // Update the selected rows state
//   };

//   // const handleMultiSelectClick = () => {
//   //   let userIdArr = [];
//   //   multiSelectRows.forEach((row) => {
//   //     userIdArr.push(row._id);
//   //   })
//   //   console.log("all data in the selected row multiselected rows" , multiSelectRows); // Log the selected rows data
//   //   console.log("userId array" , userIdArr);
//   //   dispatch(deleteCampaigns({ userId: userIdArr }))
//   // };


//   return (
//     <div>
//       <div className="relative z-0">
//         <DataTable
//           columns={columns}
//           // changes done by Abhyanshu - reverse the data showing order
//           data={blogsData ? blogsData.slice().reverse() : []}
//           // data={allCampaigns ? allCampaigns : []}
//           pagination
//           selectableRows
//           onSelectedRowsChange={handleSelectedRowsChange}
//           customStyles={tableCustomStyles}
//           // progressPending={getLoader}
//           // onRowClicked={rowClickHandler}
//           responsive={true}
//           noDataComponent={<CustomNoDataComponenet />}
//           progressComponent={<CustomProgressComponenet />}
//         />
//       </div>
//       {/* {editModal && <EditCampaignModal editModal={editModal} setEditModal={setEditModal} editRow={editRow} accountId={singleUser.accountId} />} */}
//     </div>
//   );
// };

// const CustomNoDataComponenet = () => {
//   return (
//     <div className="w-full p-10 text-center">
//       There are no records to displays
//     </div>
//   );
// };

// const CustomProgressComponenet = () => {
//   return <div className="w-full p-10 text-center">Loading...</div>;
// };



// export default Todolist;


import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoLists from "./ListTodoLists.jsx";
import ToDoLists from "./ToDoLists.jsx";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    const response = await axios.get("/api/lists");
    const data = await response.data;
    setListSummaries(data);
  }

  function handleNewToDoList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`/api/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteToDoList(id) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleSelectList(id) {
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData().catch(console.error);
  }

  if (selectedItem === null) {
    return (
      <div className="App">
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ToDoLists listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;