import React from 'react'
import './index.scss'
import { IoIosLogOut } from "react-icons/io";

function Header() {
    return (
        <>
            <div className='container-header'>
                <h1>PİNSOFT RECİPE</h1>
                <IoIosLogOut className='container-header__logoutIcon' />
            </div>
        </>
    )
}

export default Header
