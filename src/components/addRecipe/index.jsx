import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header'
import './index.scss'

function AddRecipe() {
    const [category, setCategory] = useState('Tatlı');
    const navigate = useNavigate();


    const handleReturnMainPage = () => {
        navigate('/')
    };

    return (
        <>
            <Header />
            <div className='container-addRecipe' >
                <div className='container-addRecipe__box' >
                    <input />
                    <textarea />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='' disabled>Kategori</option>
                        <option value='Eletronik'>Tatlı</option>
                        <option value='Giyim'>Çorba</option>
                        <option value='Kitap'>Ana Yemek</option>
                    </select>
                    <button>Tarifi ekle</button>
                    <button onClick={handleReturnMainPage} >Ana Menüye dön</button>
                </div>
            </div>
        </>
    )
}

export default AddRecipe
