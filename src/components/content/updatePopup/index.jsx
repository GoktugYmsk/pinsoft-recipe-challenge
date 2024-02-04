import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import api from '../../../interceptor';


function UpdatePopup({ setRecipePopup,
    setEditRecipeName, setEditRecipeContent,
    setEditRecipeCategory, handleSaveChanges,
    editRecipeName, editRecipeContent, editRecipeCategory, setIngredientsRecipe, photo, setPhoto, ingredientsRecipe, setSelectedCategoryUpdate
}) {
    const [ingredienstID, setIngredientsID] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState([]);

    console.log('ingredientsRecipeingredientsRecipeingredientsRecipe', ingredientsRecipe);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const sendNewCategory = await api.get('/ingredients');
                if (sendNewCategory.status === 200) {
                    setIngredientsID(sendNewCategory.data);
                }
            } catch (error) {
                console.log('Veriler gönderilirken hata oluştu');
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const sendNewCategory = await api.get('/category');
                if (sendNewCategory.status === 200) {
                    setCategoryInfo(sendNewCategory.data);
                }
            } catch (error) {
                console.log('Veriler gönderilirken hata oluştu');
            }
        }
        fetchData();
    }, []);



    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setPhoto(base64Image);
            };

            reader.readAsDataURL(file);
        }
    };

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
                    <Dropdown value={editRecipeCategory} >
                        <Dropdown.Toggle className='topContent__filter__dropdown'>
                            Kategori
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='topContent__filter_-dropdownMenu'>
                            <Dropdown.Item
                                className='topContent__filter_-dropdownMenu__hover'
                                onClick={() => setSelectedCategoryUpdate('')}
                            >
                                Tüm Kategoriler
                            </Dropdown.Item>
                            {categoryInfo.map((item, key) => (
                                <Dropdown.Item
                                    key={key}
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategoryUpdate(item.id)}
                                >
                                    {item.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <input type="text" value={editRecipeCategory} onChange={(e) => setEditRecipeCategory(e.target.value)} /> */}
                    <h3>Ingredints:</h3>
                    <textarea
                        onChange={(e) => setIngredientsRecipe(e.target.value.split('\n'))}
                        className='textare-two'
                        placeholder='Malzemeler'
                    />
                    <label htmlFor='file-input' className='file-input' >
                        <input
                            id='file-input'
                            type='file'
                            style={{ display: 'flex' }}
                            onChange={(e) => handleFileChange(e)}
                        />
                        Add Photo
                    </label>
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
