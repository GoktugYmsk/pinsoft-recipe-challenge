import React, { useEffect, useState } from 'react'
import { FaInstagram, FaFacebook, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsHamburger } from '../configure';
import './index.scss'

function HamburgerMenu() {
    const [isLogin, setIslogin] = useState(false);



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    const handleEscKeyPress = (event) => {
        if (event.key === 'Escape') {
            dispatch(setIsHamburger(false));
        }
    };

    const handleClickOutside = (event) => {
        const isMenuClicked = event.target.closest('.container-hamburger');
        if (!isMenuClicked) {
            dispatch(setIsHamburger(false));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscKeyPress);
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEscKeyPress);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);


    const handleAddClick = () => {
        dispatch(setIsHamburger(false));
        navigate('/addRecipe');
    };

    const handleLogin = () => {
        dispatch(setIsHamburger(false));
        navigate('/login');
    };

    const handleSignUp = () => {
        dispatch(setIsHamburger(false));
        navigate('/signup');
    };
    const isToken = sessionStorage.getItem('token');

    useEffect(() => {
        if (isToken) {
            setIslogin(true);
        }
    }, [isToken])

    const handleMainClick = () => {
        dispatch(setIsHamburger(false));
        navigate('/');
    };

    return (
        <div className={`container-hamburger ${isHamburger ? 'hamburgerActive' : ''}`} >
            <div className='container-hamburger__top' >
                {!isLogin &&
                    <>
                        <h3 onClick={handleSignUp} >Üye Ol</h3>
                        <h3 onClick={handleLogin} >Giriş yap</h3>
                    </>
                }
                {isLogin &&
                    <h3 onClick={handleAddClick} >Tarif ekle</h3>
                }
                <h3>Şikayet</h3>
                <h3>İletişim</h3>
                <h3>Hakkımızda</h3>
                <h3 onClick={handleMainClick} >Ana Sayfa</h3>
            </div>
            <div className='socialIconsGroup' >
                <FaInstagram style={{ color: 'white' }} className='socialIcon' />
                <FaFacebook style={{ color: 'white' }} className='socialIcon' />
                <FaTwitterSquare style={{ color: 'white' }} className='socialIcon' />
                <FaYoutube style={{ color: 'white' }} className='socialIcon' />
            </div>
        </div >
    )
}

export default HamburgerMenu
