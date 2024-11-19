import { useForm } from "react-hook-form";
import { blogsData } from "../../constants/BlogsDataConstant";
import Todolist from "../../components/Homepage/Todolist";

const Homepage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  const submitHandler = (data) => {
    console.log("Submit Handler has been clicked", data)
  }


  return (
    <div className="px-8">
      {/* data submission form */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 mt-10"
        action="#"
        method="POST"
      >

        <div>
          <label
            htmlFor="User"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            User
          </label>
          <div className="mt-2">
            <input
              id="user"
              name="user"
              autoComplete="user"
              {...register("user")}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500">{errors.user?.message}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="data"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Content
            </label>
          </div>
          <div className="mt-2">
            <textarea
              id="content"
              name="content"
              type="content"
              autoComplete="current-content"
              {...register("content", {})}
              rows={4}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500">{errors.content?.message}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {/* {loginLoader ? <MoonLoader /> : "Log In"} */}
            Submit
          </button>
        </div>
      </form>

      <div className="h-[2px] bg-gray-300 my-4" />

      {/* data display table */}
      {/* {
        blogsData && blogsData.map((item, index) => {
          return (
            <p key={index}>{item?.title}</p>
          )
        })
      } */}
      
      <Todolist/>


    </div>
  )
}

export default Homepage