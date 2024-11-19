import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='w-[100%] h-[100vh] justify-center items-center flex ' >
            <div className='z-0 bg-gray-600 opacity-10 h-[100vh] w-full' ></div>
            <MoonLoader
                className='z-1'
                // sizeUnit={"px"}
                // className='w-full h-[100vh] bg-gray-900 opacity-0 '
                size={"30px"}
                color={"#000000"}
            />
        </div>
    )
}

export default Loader
