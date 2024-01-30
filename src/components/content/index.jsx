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
import api from '../../interceptor';
import { useNavigate } from 'react-router-dom';

function Content() {
    const [rating, setRating] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [recipe, setRecipe] = useState([]);
    const [recipePopup, setRecipePopup] = useState(false);
    const [userData, setUserData] = useState();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editRecipeName, setEditRecipeName] = useState('');
    const [editRecipeContent, setEditRecipeContent] = useState('');
    const [editRecipeCategory, setEditRecipeCategory] = useState('');
    const [isLogin, setIslogin] = useState(false);

    const navigate = useNavigate();
    const textareRef = useRef();

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIslogin(true);
        }
    }, [token])

    useEffect(() => {
        console.log('recipe', recipe)
    }, [recipe]);


    const filterRecipes = () => {
        let filteredRecipes = [...recipe]; // Copy the original recipe array

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
        const updatedRecipes = recipe.map((recipe) => {
            if (recipe.name === editRecipeName) {
                return {
                    ...recipe,
                    content: editRecipeContent,
                    category: editRecipeCategory,
                };
            }
            return recipe;
        });
        setRecipe(updatedRecipes);
    };


    const handleSaveChanges = () => {
        updateRecipeInLocalStorage();
        setRecipePopup(false);
    };

    const handleEditClick = (recipe) => {
        if (isLogin === true) {
            setEditRecipeName(recipe.name);
            setEditRecipeContent(recipe.content);
            setEditRecipeCategory(recipe.category);
            setRecipePopup(true);
        }
        else if (isLogin === false) {
            navigate('/login');
        };
    };

    const handleCommentClick = () => {
        if (isLogin === true) {
            if (textareRef.current) {
                textareRef.current.blur();
            }
        }
        else if (isLogin === false) {
            navigate('/login');
        };

    };


    const username = (sessionStorage.getItem('userName'));


    useEffect(() => {

        const fecthData = async () => {
            try {
                const getAllRecipe = await api.get('/recipe');
                if (getAllRecipe.status === 200) {
                    console.log('getAllRecipe', getAllRecipe);
                    setRecipe(getAllRecipe.data);
                };
            }
            catch (error) {
                console.log(error)
            }
        };

        fecthData();
    }, []);


    const decodeBase64Image = (base64) => {
        try {
            const base64ImageData = base64.split(",")[1];
            const binaryString = atob(base64ImageData);

            const byteNumbers = new Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                byteNumbers[i] = binaryString.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);

            return dataUrl;
        } catch (error) {
            console.error('Base64 decoding error:', error);
            return '';
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user_account');
                setUserData(response.data);

                if (response.status === 200 && username) {
                    const userRole = response.data.find((item) => item.username === username);
                    if (userRole.role.name === "admin") {
                        setIsAdmin(true);
                    }
                }
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, [username]);

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
                                <img src={decodeBase64Image(filteredRecipe.base64img)} alt={filteredRecipe.name} />
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
                                <input placeholder='Yorum yap' />
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
