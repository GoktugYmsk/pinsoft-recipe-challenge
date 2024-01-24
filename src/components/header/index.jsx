import React, { useEffect, useState } from 'react';
import './index.scss';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { setIsHamburger } from '../configure';

function Header() {
    const [islogin, setIslogin] = useState(false);

    const dispatch = useDispatch();
    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    const handleHamburgerClick = () => {
        dispatch(setIsHamburger(!isHamburger));
    };

    return (
        <>
            <div className='container-header'>
                <h1>PİNSOFT RECİPE</h1>
                {!islogin ? (
                    <div className='container-header__login' >
                        <FaRegUser className='container-header__loginIcon' />
                        <h5>Göktuğ</h5>
                        <GiHamburgerMenu onClick={handleHamburgerClick} className='container-header__hamburger' />
                    </div>
                ) : (
                    <IoIosLogOut className='container-header__logoutIcon' />
                )}
            </div>
        </>
    );
}

export default Header;
