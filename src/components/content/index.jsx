import React, { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import { MdOutlineAdd } from 'react-icons/md';
import './index.scss';
import api from '../../interceptor';
import { useNavigate } from 'react-router-dom';
import DeletePopup from './deletePopup';
import { useDispatch, useSelector } from 'react-redux';
import { setIsToastActive } from '../configure';
import UpdatePopup from './updatePopup';
import RecipePart from './recipePart';

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
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteRecipeId, setDeleteRecipeId] = useState();

    const toastMessage = useSelector((state) => state.recipeStringControl.toastMessage);
    const isToastACtive = useSelector((state) => state.recipeBooleanControl.isToastACtive);

    /*
    
    
    UPDATE İŞLEMLERİNE BAK
    
    
    */

    const navigate = useNavigate();
    const textareRef = useRef();
    const dispatch = useDispatch();

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('userName');

    const filterRecipes = () => {
        let filteredRecipes = [...recipe];

        if (searchText) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        if (selectedCategory) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category.name === selectedCategory);
        }

        return filteredRecipes;
    };


    const handleStarHover = (hoveredStar) => {
        if (rating === 0) {
            setRating(hoveredStar);
        }
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
                    sessionStorage.setItem('userId', userRole.id);
                    console.log('DENEMEE', userRole);
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

    useEffect(() => {

        const fecthData = async () => {
            try {
                const getAllRecipe = await api.get('/recipe');
                if (getAllRecipe.status === 200) {
                    setRecipe(getAllRecipe.data);
                };
            }
            catch (error) {
                console.log(error)
            }
        };

        fecthData();
    }, []);

    useEffect(() => {
        filterRecipes();
    }, [selectedCategory]);

    useEffect(() => {
        if (token) {
            setIslogin(true);
        }
    }, [token])

    const handleDeleteClick = async (recipeId) => {
        console.log('recipeId', recipeId);
        setDeleteRecipeId(recipeId)
        setDeletePopup(true);
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
                                    onClick={() => setSelectedCategory('Kahvaltı')}
                                >
                                    Kahvaltı
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Ana Yemek')}
                                >
                                    Ana Yemek
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Tatlı')}
                                >
                                    Tatlı
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className='topContent__filter_-dropdownMenu__hover'
                                    onClick={() => setSelectedCategory('Salata')}
                                >
                                    Salata
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='altContent'>
                    <RecipePart filterRecipes={filterRecipes}
                        decodeBase64Image={decodeBase64Image}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleStarHover={handleStarHover}
                        handleStarLeave={handleStarLeave}
                        setRating={setRating}
                        isAdmin={isAdmin}
                        rating={rating}
                        isLogin={isLogin} />

                </div>
            </div>
            {recipePopup && <UpdatePopup setRecipePopup={setRecipePopup}
                setEditRecipeName={setEditRecipeName}
                setEditRecipeContent={setEditRecipeContent}
                setEditRecipeCategory={setEditRecipeCategory}
                handleSaveChanges={handleSaveChanges}
                editRecipeName={editRecipeName}
                editRecipeContent={editRecipeContent}
                editRecipeCategory={editRecipeCategory}
            />}
            {isToastACtive && (
                <div className="toast-container">
                    <Toast onClose={() => dispatch(setIsToastActive(false))} show={isToastACtive} autohide>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </div>
            )}
            {deletePopup &&
                <DeletePopup deleteRecipeId={deleteRecipeId} setDeletePopup={setDeletePopup} />
            }
        </>
    );
}

export default Content;
