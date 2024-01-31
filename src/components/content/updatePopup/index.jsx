import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function UpdatePopup({ setRecipePopup,
    setEditRecipeName, setEditRecipeContent,
    setEditRecipeCategory, handleSaveChanges,
    editRecipeName, editRecipeContent, editRecipeCategory
}) {
    return (
        <>
            <Modal className='products-popup-container' show={true} onHide={() => setRecipePopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body className='products-popup-container__box'>
                    <h3>Name:</h3>
                    <input type="text" value={editRecipeName} onChange={(e) => setEditRecipeName(e.target.value)} />
                    <h3>Content:</h3>
                    <textarea value={editRecipeContent} onChange={(e) => setEditRecipeContent(e.target.value)} />
                    <h3>Category:</h3>
                    <input type="text" value={editRecipeCategory} onChange={(e) => setEditRecipeCategory(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setRecipePopup(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdatePopup
