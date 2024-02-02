import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import HamburgerMenu from '../hamburgerMenu';
import Button from 'react-bootstrap/Button';
import './index.scss';
import api from '../../interceptor';
import { setToastMessage } from '../configure';
import { setIsToastActive } from '../configure';

function AddRecipe() {
    const [category, setCategory] = useState('Tatlı');
    const [recipeName, setRecipeName] = useState('');
    const [prepare, setPrepare] = useState('');
    const [ingredientsRecipe, setIngredientsRecipe] = useState('');
    const [photo, setPhoto] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);
    const userName = sessionStorage.getItem('userName');

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('isHamburger', isHamburger);
    }, [isHamburger]);

    const handleReturnMainPage = () => {
        navigate('/');
    };

    const handleAddRecipe = async () => {
        if (prepare.length > 250) {
            setErrorMessage('Hazırlanışı alanına en fazla 250 karakter girebilirsiniz.');
            return;
        }

        try {
            let selectCategoryId;
            switch (category) {
                case 'Kahvaltı':
                    selectCategoryId = 1;
                    break;
                case 'Ana Yemek':
                    selectCategoryId = 2;
                    break;
                case 'Tatlı':
                    selectCategoryId = 3;
                    break;
                case 'Salata':
                    selectCategoryId = 4;
                    break;
            }

            const ingredientsArray = ingredientsRecipe.split(',').map(item => item.trim());

            const newRecipe = {
                name: recipeName,
                explanation: prepare,
                categoryId: selectCategoryId,
                base64img: photo,
                createdBy: userName,
                ingredients: ingredientsArray,
            };

            const sendRecipe = await api.post('/recipe', newRecipe);

            if (sendRecipe.status === 200) {
                dispatch(setToastMessage('Tarif Başarıyla Eklendi'));
                dispatch(setIsToastActive(true));
                navigate('/');
            }
            console.log('Tarif başarıyla eklendi:', sendRecipe);
        } catch (error) {
            console.error('Veri gönderilemedi:', error);
        }
    };



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
            <Header />
            <div className={`container-addRecipe ${isHamburger ? 'opacityActive' : ''}`}>
                <div className='container-addRecipe__box'>
                    <h1>Tarif Ekle</h1>
                    <div className='container-addRecipe__box__top'>
                        <input onChange={(e) => setRecipeName(e.target.value)} placeholder='Tarifin adı' />
                        <textarea
                            onChange={(e) => setPrepare(e.target.value)}
                            className={`textare-one ${prepare.length > 250 ? 'error' : ''}`}
                            placeholder='Hazırlanışı'
                        />
                        {prepare.length > 250 && (
                            <p className="error-message">Hazırlanışı alanına en fazla 250 karakter girebilirsiniz.</p>
                        )}
                        <textarea onChange={(e) => setIngredientsRecipe(e.target.value)} className='textare-two' placeholder='Malzemeler' />
                    </div>
                    <div className='select'>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value='Kategori Seçiniz' disabled>Kategori</option>
                            <option value='Kahvaltı'>Kahvaltı</option>
                            <option value='Ana Yemek'>Ana Yemek</option>
                            <option value='Tatlı'>Tatlı</option>
                            <option value='Salata'>Salata</option>
                        </select>
                        <label htmlFor='file-input' className='file-input' >
                            <input
                                id='file-input'
                                type='file'
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e)}
                            />
                            Add Photo
                        </label>
                    </div>
                    <div className='container-addRecipe__box__down'>
                        <Button onClick={handleReturnMainPage}>Ana Menüye dön</Button>
                        <Button onClick={handleAddRecipe}>Tarifi ekle</Button>
                    </div>
                </div>
            </div>
            {isHamburger && <HamburgerMenu />}
        </>
    );
}

export default AddRecipe;
