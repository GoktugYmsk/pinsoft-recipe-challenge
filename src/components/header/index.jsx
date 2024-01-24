import React, { useEffect, useState } from 'react';
import './index.scss';
import { IoIosLogOut } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';

function Header() {
    const [islogin, setIslogin] = useState(false);

    return (
        <>
            <div className='container-header'>
                <h1>PİNSOFT RECİPE</h1>
                {!islogin ? (
                    <div className='container-header__login' >
                        <FaRegUser className='container-header__loginIcon' />
                        <h5>Göktuğ</h5>
                    </div>
                ) : (
                    <IoIosLogOut className='container-header__logoutIcon' />
                )}
            </div>
        </>
    );
}

export default Header;
