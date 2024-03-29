import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FaTimes } from "react-icons/fa";
import Toast from 'react-bootstrap/Toast';
import { FcApproval } from "react-icons/fc";
import Button from 'react-bootstrap/Button';

import api from '../../../interceptor';
import HamburgerMenu from '..'
import Header from '../../header'
import { setIsToastActive, setToastMessage } from '../../configure';

import './index.scss'

function UserActivation() {
    const [userList, setUserList] = useState([]);

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);
    const toastMessage = useSelector((state) => state.recipeStringControl.toastMessage);
    const isToastACtive = useSelector((state) => state.recipeBooleanControl.isToastACtive);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user_account');
                setUserList(response.data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    const handleActivateClick = async (userId) => {
        try {
            const response = await api.post(`/activate/${userId}`);
            if (response.status === 200) {
                dispatch(setToastMessage(`id'si ${userId} olan kullanıcı aktive edildi`));
                dispatch(setIsToastActive(true));
                setTimeout(() => {
                    dispatch(setIsToastActive(false));
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error('Veri alınamadı:', error);
        }
    };

    const handleInActivateClick = async (userId) => {
        try {
            const response = await api.post(`/inactivate/${userId}`);
            if (response.status === 200) {
                dispatch(setToastMessage(`id'si ${userId} olan kullanıcı inaktive edildi`));
                dispatch(setIsToastActive(true));
                setTimeout(() => {
                    dispatch(setIsToastActive(false));
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error('Veri alınamadı:', error);
        }
    };


    return (
        <>
            <Header />
            <div className='container-userActivation'>
                <div className='container-userActivation__box'>
                    {Array.isArray(userList) && userList.map((item, index) => (
                        <div className='container-userActivation__box__top' key={index}>
                            <div className='container-userActivation__box__list'>
                                <table className='container-userActivation__box__list__userInfo'>
                                    <tbody>
                                        <tr>
                                            <td><strong>Username:</strong></td>
                                            <td>{item.username}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Role:</strong></td>
                                            <td>{item.role.name}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email:</strong></td>
                                            <td>{item.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {item.accountActive &&
                                    <FcApproval className='active-icon' />
                                }
                                <div className='container-userActivation__box__list__buttons'>
                                    {(!item.accountActive ?

                                        <Button onClick={() => handleActivateClick(item.id)}>Activate User</Button>
                                        : (
                                            <Button onClick={() => handleInActivateClick(item.id)}>Inactivate User</Button>
                                        )
                                    )}
                                </div>
                                {!item.accountActive &&
                                    <FaTimes className='inactive-icon' />
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isHamburger && <HamburgerMenu />}
            {isToastACtive && (
                <div className="toast-container">
                    <Toast onClose={() => dispatch(setIsToastActive(false))} show={isToastACtive} autohide>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </div>
            )}
        </>
    );

}

export default UserActivation
