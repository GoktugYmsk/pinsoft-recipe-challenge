import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Dropdown from 'react-bootstrap/Dropdown';
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
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    console.log('categoryInfo', categoryInfo);

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);
    const userName = sessionStorage.getItem('userName');
    console.log('selectedCategory', selectedCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('isHamburger', isHamburger);
    }, [isHamburger]);

    const handleReturnMainPage = () => {
        navigate('/');
    };


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

    const handleAddRecipe = async () => {
        if (prepare.length > 250) {
            setErrorMessage('Hazırlanışı alanına en fazla 250 karakter girebilirsiniz.');
            return;
        }

        try {

            const ingredientsArray = ingredientsRecipe.split(',').map(item => item.trim());
            const newRecipe = {
                name: recipeName,
                explanation: prepare,
                categoryId: selectedCategory,
                base64img: photo,
                createdBy: userName,
                ingredients: ingredientsArray,
            };

            const sendRecipe = await api.post('/recipe', newRecipe);

            if (sendRecipe.status === 200) {
                dispatch(setToastMessage('Tarif Başarıyla Eklendi !'));
                dispatch(setIsToastActive(true));
                navigate('/');
            }
            console.log('Tarif başarıyla eklendi:', sendRecipe);
        } catch (error) {
            console.error('Veri gönderilemedi:', error);
        }
    };

    useEffect(() => {
        console.log('photo', photo);
    }, [photo]);



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
                        <Dropdown>
                            <Dropdown.Toggle className='addContent-dropdown'>
                                Kategori
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='addContent-dropdownMenu'>
                                <Dropdown.Item
                                    className='addContent-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('')}
                                >
                                    Tüm Kategoriler
                                </Dropdown.Item>
                                {categoryInfo.map((item, key) => (
                                    <Dropdown.Item
                                        key={key}
                                        className='addContent-dropdownMenu__hover'
                                        onClick={() => setSelectedCategory(item.id)}
                                    >
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
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
