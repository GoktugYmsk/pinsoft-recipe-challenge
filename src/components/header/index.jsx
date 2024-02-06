import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoIosLogOut } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";

import { setIsHamburger } from '../configure';

import './index.scss';

function Header() {
    const [islogin, setIslogin] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    const handleHamburgerClick = () => {
        dispatch(setIsHamburger(!isHamburger));
    };
    const isToken = sessionStorage.getItem('token');

    useEffect(() => {
        if (isToken) {
            setIslogin(true);
        }
    }, [isToken])


    const handleLogoutClick = () => {
        sessionStorage.removeItem('token');
        navigate('/')
        window.location.reload();
    };

    const handleLoginClick = () => {
        dispatch(setIsHamburger(false));
        navigate('/login');
    };


    const userName = sessionStorage.getItem('userName');

    return (
        <>
            <div className={`container-header ${isHamburger ? 'opacityActive' : ''} `}>
                <h1>PİNSOFT RECİPE</h1>
                {islogin ? (
                    <div className='container-header__login' >
                        <FaRegUser className='container-header__loginIcon' />
                        <h5>{userName}</h5>
                        <GiHamburgerMenu onClick={handleHamburgerClick} className='container-header__hamburger' />
                        <IoIosLogOut onClick={handleLogoutClick} className='container-header__logoutIcon' />
                    </div>
                ) : (
                    <div className='container-header__login' >
                        <FaRegUser className='container-header__loginIcon' />
                        <h3 onClick={handleLoginClick} >Giriş Yap</h3>
                        <GiHamburgerMenu onClick={handleHamburgerClick} className='container-header__hamburger' />
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
