import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../header'
import HamburgerMenu from '../hamburgerMenu';
import Button from 'react-bootstrap/Button';
import './index.scss'

function AddRecipe() {
    const [category, setCategory] = useState('Tatlı');
    const navigate = useNavigate();

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    useEffect(() => {
        console.log('isHamburger', isHamburger)
    }, [isHamburger]);


    const handleReturnMainPage = () => {
        navigate('/')
    };

    return (
        <>
            <Header />
            <div className='container-addRecipe' >
                <div className='container-addRecipe__box' >
                    <h1>Tarif Ekle</h1>
                    <div className='container-addRecipe__box__top' >
                        <input placeholder='Tarifin adı' />
                        <textarea className='textare-one' placeholder='Hazırlanışı' />
                        <textarea className='textare-two' placeholder='Malzemeler' />
                    </div>
                    <div className='select' >
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value='' disabled>Kategori</option>
                            <option value='Eletronik'>Tatlı</option>
                            <option value='Giyim'>Çorba</option>
                            <option value='Kitap'>Ana Yemek</option>
                        </select>
                    </div>
                    <div className='container-addRecipe__box__down' >
                        <Button onClick={handleReturnMainPage} >Ana Menüye dön</Button>
                        <Button>Tarifi ekle</Button>
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
