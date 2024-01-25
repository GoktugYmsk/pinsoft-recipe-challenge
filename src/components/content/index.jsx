import React, { useEffect, useRef, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineAdd } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './index.scss';

function Content() {
    const [rating, setRating] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [recipe, setRecipe] = useState('');
    const [recipePopup, setRecipePopup] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const textareRef = useRef();

    const recipes = [
        { name: 'Yemek adı 1', category: 'Tatlılar', content: 'Lorem ipsum dolor sit amet...' },
        { name: 'Yemek adı 2', category: 'Çorbalar', content: 'Lorem ipsum dolor sit amet...' },
        // Diğer yemekler
    ];

    const filterRecipes = () => {
        // Filtreleme işlemleri burada yapılır
        let filteredRecipes = recipes;

        if (searchText) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        if (selectedCategory) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
        }

        return filteredRecipes;
    };

    const handleStarHover = (hoveredStar) => {
        if (rating === 0) {
            setRating(hoveredStar);
        }
    };

    const handleStarClick = (clickedStar) => {
        setRating(clickedStar);
    };

    const handleStarLeave = () => {
        if (rating === 0) {
            setRating(0);
        }
    };

    const handleEditClick = () => {
        setRecipePopup(true);
    };

    const handleCommentClick = () => {
        if (textareRef.current) {
            textareRef.current.blur();
        }
    };

    return (
        <>
            <div className='container-content'>
                <div className='leftContent'>
                    <div className='topContent__filter'>
                        <input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                        <Dropdown>
                            <Dropdown.Toggle className='topContent__filter__dropdown'>
                                Kategori
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='topContent__filter_-dropdownMenu'>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Tatlılar')}
                                >
                                    Tatlılar
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Çorbalar')}
                                >
                                    Çorbalar
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Ana Yemekler')}
                                >
                                    Ana Yemekler
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='altContent'>
                    {filterRecipes().map((filteredRecipe, index) => (
                        <div key={index} className='container-content__recipe'>
                            <h2>{filteredRecipe.name}</h2>
                            <div className='container-content__recipe__altBox'>
                                <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />

                                <div className='container-content__recipe__altBox__icons'>
                                    <FaRegComment
                                        onClick={handleCommentClick}
                                        className='icon'
                                    />
                                    <CiEdit
                                        onClick={handleEditClick}
                                        className='icon'
                                    />
                                    <MdOutlineAdd className='icon' />
                                    {isAdmin &&
                                        <MdDelete className='deleteIcon' />
                                    }
                                    <div className='point'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`icon ${star <= rating ? 'ratingYellow' : 'ratingGrey'}`}
                                                onMouseEnter={() => handleStarHover(star)}
                                                onMouseLeave={handleStarLeave}
                                                onClick={() => handleStarClick(star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <textarea ref={textareRef} />
                                <p>{filteredRecipe.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {recipePopup &&
                <Modal className='products-popup-container' show={true} onHide={() => setRecipePopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='products-popup-container__box'>
                        <textarea onChange={(e) => setRecipe(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setRecipePopup(false)}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}

export default Content;
