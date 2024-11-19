import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate

} from "react-router-dom";


// components import 
// import Home from "../pages/Home/Home.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Loader from '../utils/Loader.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import Home from '../pages/Home/Homepage.jsx';
import Footer from '../components/Footer/Footer.jsx';


const Routing = () => {
  const Layout = () => {

    return (
      <div className="relative min-h-screen">
        <Navbar />
        <div className='relative top-[80px]'>
          <div id="main-outlet" className='min-h-[100vh]  h-fit mb-[100px]'>
            <Outlet />
          </div>
          <Footer/>
        </div>
      </div>
    )
  };


  // in this
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<Layout />),
      // these are the components that are going to pass in the layout to render in outlet
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/register",
          element: <LoginPage />
        },
      ]
    },
  ])


  return (
    <Suspense fallback={<Loader />} >
      <RouterProvider router={router} />
    </Suspense>
  )

}

export default Routing;
