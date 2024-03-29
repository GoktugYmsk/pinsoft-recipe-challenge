import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import api from '../../../interceptor';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { setIsToastActive, setToastMessage } from '../../configure';

import './index.scss'

function CategoryPopup({ setOpenCategoryPopup, openCategoryPopup }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const dispacth = useDispatch();

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
