import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../header'
import HamburgerMenu from '../hamburgerMenu';
import Button from 'react-bootstrap/Button';
import './index.scss'
import api from '../../interceptor';

function AddRecipe() {
    const [category, setCategory] = useState('Tatlı');
    const [recipeName, setRecipeName] = useState('');
    const [prepare, setPrepare] = useState('');
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    useEffect(() => {
        console.log('isHamburger', isHamburger)
    }, [isHamburger]);


    const handleReturnMainPage = () => {
        navigate('/')
    };

    const handleAddRecipe = () => {
        const fetchData = async () => {
            try {
                let categoryId;
                switch (category) {
                    case 'Tatlı':
                        categoryId = 1;
                        break;
                    case 'Çorba':
                        categoryId = 2;
                        break;
                    case 'Ana Yemek':
                        categoryId = 3;
                        break;
                }

                const newRecipe = {
                    name: recipeName,
                    explanation: prepare,
                    categoryId: categoryId,
                };

                const sendRecipe = await api.post('/recipe', newRecipe);
                console.log('Tarif başarıyla eklendi:', sendRecipe);
            } catch (error) {
                console.error('Veri gönderilemedi:', error);
            }
        };

        fetchData();
    };


    return (
        <>
            <Header />
            <div className='container-addRecipe' >
                <div className='container-addRecipe__box' >
                    <h1>Tarif Ekle</h1>
                    <div className='container-addRecipe__box__top' >
                        <input onChange={(e) => setRecipeName(e.target.value)} placeholder='Tarifin adı' />
                        <textarea onChange={(e) => setPrepare(e.target.value)} className='textare-one' placeholder='Hazırlanışı' />
                        <textarea onChange={(e) => setIngredients(e.target.value)} className='textare-two' placeholder='Malzemeler' />
                    </div>
                    <div className='select' >
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value='Kategori Seçiniz' disabled>Kategori</option>
                            <option value='Eletronik'>Tatlı</option>
                            <option value='Giyim'>Çorba</option>
                            <option value='Kitap'>Ana Yemek</option>
                        </select>
                    </div>
                    <div className='container-addRecipe__box__down' >
                        <Button onClick={handleReturnMainPage} >Ana Menüye dön</Button>
                        <Button onClick={handleAddRecipe} >Tarifi ekle</Button>
                    </div>
                </div>
            </div>
            {isHamburger &&
                <HamburgerMenu />
            }
        </>
    )
}

export default AddRecipe
