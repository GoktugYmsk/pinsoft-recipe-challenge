import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './index.scss'
import api from '../../../interceptor';
import { setIsToastActive, setToastMessage } from '../../configure';
import { useDispatch } from 'react-redux';

function CategoryPopup({ setOpenCategoryPopup, openCategoryPopup }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryID, setCategoryID] = useState();
    const dispacth = useDispatch();

    const getUserId = sessionStorage.getItem('userId');

    console.log('categoryID', categoryID);

    const handleCategoryClick = async () => {
        try {
            const newCategory = {
                name: newCategoryName,
            };

            const sendNewCategory = await api.post('/category', newCategory);
            if (sendNewCategory.status === 200) {
                setOpenCategoryPopup(false);
                dispacth(setToastMessage('Yeni Kategori Eklendi'));
                setTimeout(() => {
                    dispacth(setIsToastActive(true));
                    setInterval(() => {
                        window.location.reload();
                    }, 3000);
                }, 3000);

            }
        } catch (error) {
            console.log('Veriler gönderilirken hata oluştu');
        }
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {

    //             const sendNewCategory = await api.get('/category');
    //             if (sendNewCategory.status === 200) {
    //                 setCategoryID(sendNewCategory.data.length);
    //             }
    //         } catch (error) {
    //             console.log('Veriler gönderilirken hata oluştu');
    //         }
    //     }
    //     fetchData();
    // }, []);


    // category post isteği atarken 400 geliyor

    return (
        <>
            <Modal className='category-popup-container' show={openCategoryPopup} onHide={() => setOpenCategoryPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body className='category-popup-container'>
                    <h3>Name:</h3>
                    <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenCategoryPopup(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCategoryClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default CategoryPopup
