import React from 'react'
import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import api from '../../../interceptor';
import { setToastMessage } from '../../configure';
import { setIsToastActive } from '../../configure';


function DeletePopup({ deleteRecipeId, setDeletePopup }) {

    const dispatch = useDispatch();

    const handleDeleteClick = async () => {
        try {
            const deleteRecipe = await api.delete(`/recipe/${deleteRecipeId}`);
            if (deleteRecipe.status === 200) {
                dispatch(setToastMessage('Tarif başarıyla silindi !'));
                dispatch(setIsToastActive(true));
                setDeletePopup(false);
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            } else {
                console.error('Error deleting recipe:', deleteRecipe.statusText);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }

    };

    return (
        <>
            <Modal show={true} onHide={() => setDeletePopup(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>Are you sure you want to delete this product</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setDeletePopup(false)} variant="secondary">Cancel</Button>
                    <Button onClick={handleDeleteClick} variant="secondary">Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeletePopup
