import React, { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import { MdOutlineAdd } from 'react-icons/md';
import './index.scss';
import api from '../../interceptor';
import { useNavigate } from 'react-router-dom';
import DeletePopup from './deletePopup';
import { useDispatch, useSelector } from 'react-redux';
import { setIsToastActive, setToastMessage } from '../configure';
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
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [recipeId, setRecipeId] = useState();
    const [photo, setPhoto] = useState('');
    const [ingredientsRecipe, setIngredientsRecipe] = useState([]);
    const [selectedCategoryUpdate, setSelectedCategoryUpdate] = useState('');

    const toastMessage = useSelector((state) => state.recipeStringControl.toastMessage);
    const isToastACtive = useSelector((state) => state.recipeBooleanControl.isToastACtive);

    const getUserId = parseInt(sessionStorage.getItem('userId'), 10);



    console.log('ingredientsRecipe', ingredientsRecipe);



    useEffect(() => {
        console.log('photo', photo)
    }, [photo]);

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
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.category.name.toLowerCase().includes(selectedCategory.toLowerCase())
            );
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


    const handleSaveChanges = async () => {
        try {
            if (!recipeId || !editRecipeName || !editRecipeContent || !selectedCategoryUpdate || !photo || !ingredientsRecipe || !getUserId) {
                alert('Tüm alanların dolu ve seçili olduğundan emin olun !');
                return;
            }
            else {
                const editRecipe = {
                    id: recipeId,
                    name: editRecipeName,
                    explanation: editRecipeContent,
                    categoryId: selectedCategoryUpdate,
                    base64img: photo,
                    ingredients: ingredientsRecipe,
                    userId: getUserId
                };

                const sendNewCategory = await api.put(`/recipe/${recipeId}`, editRecipe);
                if (sendNewCategory.status === 200) {
                    setRecipePopup(false);
                    dispatch(setToastMessage('Tarif Güncellendi'));
                    setTimeout(() => {
                        dispatch(setIsToastActive(true));
                        setInterval(() => {
                            window.location.reload();
                        }, 3000);
                    }, 3000);
                }
            }
        } catch (error) {
            console.error('Veriler gönderilirken hata oluştu', error);
        }
    };


    const handleEditClick = (recipe, index) => {
        if (isLogin === true) {
            setEditRecipeName(recipe.name);
            setEditRecipeContent(recipe.explanation);
            setEditRecipeCategory(recipe.category.name);
            setIngredientsRecipe(index)
            setRecipePopup(true);
            setRecipeId(recipe.id);
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


    //HAMBURGERE ADMİN KULLANICI PASİF YAP EKLE
    // filtrelemede seçilenleri temizle özelliği ekle



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
                                    onClick={() => setSelectedCategory('')}
                                >
                                    Tüm Kategoriler
                                </Dropdown.Item>
                                {categoryInfo.map((item, key) => (
                                    <Dropdown.Item
                                        key={key}
                                        className='topContent__filter_-dropdownMenu__hover'
                                        onClick={() => setSelectedCategory(item.name)}
                                    >
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
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
                setSelectedCategoryUpdate={setSelectedCategoryUpdate}
                handleSaveChanges={handleSaveChanges}
                editRecipeName={editRecipeName}
                editRecipeContent={editRecipeContent}
                editRecipeCategory={editRecipeCategory}
                handleFileChange={handleFileChange}
                setIngredientsRecipe={setIngredientsRecipe}
                ingredientsRecipe={ingredientsRecipe}
                setPhoto={setPhoto}
                photo={photo}
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
