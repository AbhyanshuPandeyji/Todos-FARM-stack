import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { NavbarLinks } from '../../constants/common/NavbarDataConstants';
// import logo from "../../assets/images/Deep Work.jpg"
import { FaRegUserCircle } from "react-icons/fa";
// import user from "../../assets/images/person-image.jpg"




const Navbar = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchOpen, setSerachOpen] = useState(false);

  // const [show, setShow] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // const controlNavbar = () => {
  //   if (typeof window !== 'undefined') {
  //     if (window.scrollY > lastScrollY) {
  //       // if scroll down hide the navbar
  //       setShow(false);
  //     } else {
  //       // if scroll up show the navbar
  //       setShow(true);
  //     }
  //     setLastScrollY(window.scrollY);
  //   }
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', controlNavbar);

  //     // cleanup function
  //     return () => {
  //       window.removeEventListener('scroll', controlNavbar);
  //     };
  //   }
  // }, [lastScrollY]);

  // ${show ? 'block transition-all duration-500 ease-in-out' : 'hidden transition-all duration-500 ease-in-out'}
  return (

    <div className='w-full bg-gray-100'>
      <nav className={`min-h-[80px] h-fit w-full bg-gray-100 text-gray-900 fixed flex z-[999] 
      md:flex-row flex-col  justify-center items-center top-0 left-0 shadow-lg `}>
        {/* <img src={logo} alt="" className='h-[50px] w-[50px] rounded-full' /> */}

        <NavLink className={`bg-none font-semibold text-2xl md:w-1/5 w-full text-center p-4`} to={"/"} >Abhyanshu</NavLink>
        <div className='md:block hidden md:w-3/5 w-full'>
          <ul className='flex justify-center items-center mx-auto p-4 gap-x-[60px] '>
            {NavbarLinks && NavbarLinks?.map((item, index) => {
              return (
                <NavLink key={index} className={`bg-none font-semibold text-lg transition-all 
                  duration-500 ease-in-out hover:underline`} to={item?.linkTo} >{item?.title}</NavLink>
              )
            })}
          </ul>
        </div>

        <div className='md:w-1/5 w-full lg:block hidden'>
          <div className={`flex justify-center items-center mx-auto p-4 gap-x-[20px]`}> 
            <NavLink className={`bg-none font-semibold text-lg transition-all duration-500 ease-in-out`} to={"/profile"} >
            </NavLink>
            <NavLink className={`bg-none font-semibold text-lg bg-yellow-400 px-4 py-2 transition-all duration-500 ease-in-out hover:underline`} to={"/login"} >Login</NavLink>
            <NavLink className={`bg-none font-semibold text-lg bg-yellow-400 px-4 py-2 transition-all duration-500 ease-in-out hover:underline`} to={"/register"} >Register</NavLink>
          </div>
        </div>



        {/* mobile view */}
        <div className='md:hidden block absolute top-5 right-5'>
          {
            !isNavOpen ? <GoSidebarExpand className='text-3xl' onClick={() => setIsNavOpen(true)} /> : <GoSidebarCollapse className='text-3xl' onClick={() => setIsNavOpen(false)} />
          }
        </div>

        <div className={` ${isNavOpen ? "block" : "hidden"} h-full`}>
          <ul className='justify-center w-full flex-col flex gap-y-2 p-2 transition-all mx-auto duration-500 ease-in-out'>
            <NavLink
              className={`bg-none font-semibold text-lg transition-allduration-500 ease-in-out `}
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={`bg-none font-semibold text-lg transition-allduration-500 ease-in-out `}
              to={"/login"}
            >
              Login
            </NavLink>
            {/* <NavLink className={`bg-none font-semibold text-lg `} >Home</NavLink> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
