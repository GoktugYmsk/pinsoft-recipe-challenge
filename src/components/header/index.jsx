import React, { useEffect, useState } from 'react';
import './index.scss';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { setIsHamburger } from '../configure';
import { useNavigate } from 'react-router-dom';

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
        window.location.reload();
    };

    const handleLoginClick = () => {
        dispatch(setIsHamburger(false));
        navigate('/login');
    };

    const userName = sessionStorage.getItem('userName');

    return (
        <>
            <div className='container-header'>
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
