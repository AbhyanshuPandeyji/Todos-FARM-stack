import { createSlice } from "@reduxjs/toolkit";
import { toastify } from "../../../utils/toast";
import createAxiosInstance from "../../../config/axiosConfig";
import { setLoader } from "../Loaders/loaders";
import { setStorageItem } from "../../../utils/storeItems";

const axios = createAxiosInstance();

// no need to use the assign operator to define the single reducer in the reducers because when using this , its just
// like use state , it will create multiple keys in the state with the different names to access and then in those keys
// we can store different kinds of data's with key value pairs
/*
    example :
    setData = {
        state.allUsers : action.payload ; // this will give us the all users as the data
        state.user : action.payload.singleUser // this will create the value of the user as single user 
    }

    its all the game of the key value pair,
    every value we will send and set by the key value pair thanks to object.keys method , and for each 
    the values that needs to be set will be sent by key and the values of those value of after initial state 
    will be sent by the value pair , 
    now inside the function the values will be set as usual , only difference is instead of directly passing in the data
    we are now passing in the key value pair 
    setCampaigns(state, action) {
      Object.keys(action.payload).forEach((key) => {
        // as in this function the name of the state thats needs to be set will be taken by the keys , and payload value
        / name will be taken by the value pair of the key , now its still looks confusing , so lets try it,
        // now but how this is setting the value we want to set and how its taking in the data and the name its still confusing , use
        chat gpt to explain
        state[key] = action.payload[key];
      });

      now i understand , as action is in itself is an object with key as payload which have the object we send , so action is same
      // the payload is always the data we are sending when accessing the set user or any reducer method 
      setUser(action.payload) // similar to writing ,  setUser({user : data})
      // now the keys are taken by the action.payload , and action.payload is similar in the object.keys method and the inside the function
      // the thing changing is the we on above taking in the key to select the specific data in the initial state we want to change
      // and when we pass its name in the state with the help of key , then in the action.payload when we pass that same key it takes in the 
      // value of that key and sets it in the state , so its like we are setting the keys values in useState , where there
      // are keys defined or added in the state as we go and inputs increases or key value pairs added while the initial state is an empty object
      // only difference is its not an empty object and it have the specific defined keys which will be only accessed and no new ones till
      // we create one , its a great method than individually naming or setting up state with different reducer functions , just passing the 
      // object and the functions sets up and work on the rest
    },
*/
const initialState = {
  user: null,
  singleUser: null,
  allUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

// [index] : name,
// same as writing : 1: "SomeValue",

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const getAllUsersThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));
      const response = await axios.get("/user/getAll");
      // console.log("getAllUsers", response.data);
      if (response.status === 200) {
        // response.data is the usually how the data will come and data is not something that is defined by the backend is the value in side response ,
        // if no object then data become the response.data value otherwise the response.data.valuefrombackend is the result
        // else if the data is directly coming without any object no need to access it with the destructure object it can be directly used
        // if coming as object the destructure used to easily access the data instead of writing the name after every response.data access either from frontend or backend
        const data = response.data.users;
        await dispatch(setUser({ allUsers: data }));
      }
    } catch (error) {
      toastify({ msg: "error while fetching the users", type: "error" });
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
};

export const createUserThunkMiddleware = ({ data }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/user/create`, {
        userData: data,
      });

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });

        await dispatch(getAllUsersThunkMiddleware());
      }
      console.log("api request response data", response.data);
    } catch (error) {
      if (error) {
        console.log("error message in frontend api request", error);
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }

    // if (response.status === 200) {
    //   const { message } = response.data;
    //   toastify({
    //     msg: message,
    //     type: "success",
    //   });
    // }
  };
};

export const loginUserThunkMiddleware = ({ data }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/user/login`, {
        userData: data,
      });

      console.log("response data when logging in user", response.data);

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });

        await setStorageItem(response.data.token);
      }
      // console.log("api request response data", response.data);
    } catch (error) {
      if (error) {
        console.log("error message in frontend api request", error.message);
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};
