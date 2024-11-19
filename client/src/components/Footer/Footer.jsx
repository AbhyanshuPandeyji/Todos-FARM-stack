import { useEffect, useState } from "react"
import { footerMainAppLinks } from "../../constants/common/FooterDataConstants";
import { NavLink } from "react-router-dom";

// icons
import { FaArrowRight, FaYoutube } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

import { FaInstagramSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


import { FaWhatsappSquare } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


const Footer = () => {

    const [currentYear, setCurrentYear] = useState()

    const handleCurrentYear = () => {
        const d = new Date();
        const year = d.getFullYear()
        // console.log(year)
        setCurrentYear(year)
        // return year
    }

    useEffect(() => {
        handleCurrentYear();
    }, [])

    // handleCurrentYear();

    return (
        <div className="w-full flex flex-col h-fit  bg-yellow-100">

            {/* copy right section */}
            <div className="md:h-1/6 h-fit w-full bg-blue-200 p-4 text-center">
                &copy; Copyright Abhyanshu Pandey - {currentYear}
            </div>
        </div>
    )
}

export default Footer