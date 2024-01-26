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
    const [editRecipeName, setEditRecipeName] = useState('');
    const [editRecipeContent, setEditRecipeContent] = useState('');
    const [editRecipeCategory, setEditRecipeCategory] = useState('');

    const textareRef = useRef();


    const deneme = JSON.parse(localStorage.getItem('RecipeDeneme'));

    console.log('deneme', deneme);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('RecipeDeneme'));
    }, []);


    const filterRecipes = () => {

        let filteredRecipes = deneme;

        console.log('filter içindeki', deneme);
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


    const updateRecipeInLocalStorage = () => {
        const updatedRecipes = deneme.map((recipe) => {
            if (recipe.name === editRecipeName) {
                return {
                    ...recipe,
                    content: editRecipeContent,
                    category: editRecipeCategory,
                };
            }
            return recipe;
        });

        localStorage.setItem('RecipeDeneme', JSON.stringify(updatedRecipes));
        setRecipe(updatedRecipes);
    };


    const handleSaveChanges = () => {
        updateRecipeInLocalStorage();
        setRecipePopup(false);
    };



    const handleEditClick = (recipe) => {
        setEditRecipeName(recipe.name);
        setEditRecipeContent(recipe.content);
        setEditRecipeCategory(recipe.category);
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
                                        onClick={() => handleEditClick(filteredRecipe)}
                                        className='icon'
                                    />
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
                                <input />
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
            }
        </>
    );
}

export default Content;
