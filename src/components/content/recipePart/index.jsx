import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { FaRegComment, FaStar } from 'react-icons/fa';
import { MdOutlinePhotoLibrary } from 'react-icons/md';

import api from '../../../interceptor';

function RecipePart({
    filterRecipes,
    decodeBase64Image,
    handleEditClick,
    handleDeleteClick,
    isAdmin,
    rating,
    isLogin,
    recipe
}) {
    const [inputStates, setInputStates] = useState(filterRecipes().map(() => false));
    const inputRefs = useRef(filterRecipes().map(() => React.createRef()));

    const [commentMessage, setCommentMessage] = useState('');
    const [photo, setPhoto] = useState('');
    const [openFile, setOpenFile] = useState(false);
    const [starRating, setStarRating] = useState(rating || 0);
    const [hoverRecipe, setHoverRecipe] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [reciperating, setReciperating] = useState([]);
    const [isCommentActive, setIsCommentActive] = useState(false);
    const [getRating, setGetRating] = useState([]);
    const [recipeRatings, setRecipeRatings] = useState({});
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [recipeAverageRatings, setRecipeAverageRatings] = useState({});


    const getUserId = sessionStorage.getItem('userId');


    const navigate = useNavigate();

    const handleCommentClick = (index) => {
        if (isLogin === true) {
            const newInputStates = [...inputStates];
            newInputStates[index] = true;
            setInputStates(newInputStates);

            if (inputRefs.current[index].current) {
                inputRefs.current[index].current.focus();
            }
        } else if (isLogin === false) {
            navigate('/login');
        }
    };

    const handleInputBlur = (index) => {
        const newInputStates = [...inputStates];
        newInputStates[index] = false;
        setInputStates(newInputStates);
    };

    const handleStarClick = (clickedStar, recipeId) => {
        setStarRating((prevRatings) => ({
            ...prevRatings,
            [recipeId]: clickedStar,
        }));
        setRecipeRatings((prevRatings) => ({
            ...prevRatings,
            [recipeId]: clickedStar,
        }));
    };

    const handleSendCommentClick = (getRecipeId) => {
        const fetchData = async () => {
            try {
                const newRecipe = {
                    comment: commentMessage,
                    base64img: photo,
                    rating: rating,
                    userId: getUserId,
                    recipeId: getRecipeId
                };

                const sendRecipe = await api.post('/reciperating', newRecipe);
                if (sendRecipe.status === 200) {
                    console.log('veriler Gönderildi');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error sending recipe:', error);
            }
        };
        fetchData();
    };

    useEffect(() => {
        if (openFile === true) {
            handleFileChange();
        }
    }, [openFile]);

    const handleFileChange = (e) => {
        const file = e?.target?.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Image = reader.result;
                setPhoto(base64Image);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleGetComment = async (recipeId) => {

        if (isLogin) {
            try {
                const response = await api.get(`/reciperating/${recipeId}`);
                setReciperating(response.data);
                setIsCommentActive(true);
                setSelectedRecipeId(recipeId);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }

        }
        else {
            navigate('/login');
        }
    };

    const handleRecipeHover = (recipeId) => {
        setHoverRecipe(recipeId);
        setGetRating([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sendNewCategory = await api.get('/ingredients');
                if (sendNewCategory.status === 200) {
                    setIngredients(sendNewCategory.data);
                }
            } catch (error) {
                console.log('Veriler gönderilirken hata oluştu');
            }
        };
        fetchData();
    }, []);

    const getRecipeID = recipe.map((item) => {
        return item.id;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hoverRecipe) {
                    const sendNewCategory = await api.get(`/ratings/${hoverRecipe}`);
                    if (sendNewCategory.status === 200) {
                        setGetRating(sendNewCategory.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };
        fetchData();
    }, [hoverRecipe]);

    const dataFromApi = getRating;

    function calculateAverage(numbers) {
        if (numbers.length === 0) {
            return 0;
        }

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const average = sum / numbers.length;

        return average;
    }

    const allRecipeRating = reciperating.map((item) => {
        return item;
    })


    useEffect(() => {
        filterRecipes().forEach(async (filteredRecipe) => {
            try {
                if (allRecipeRating.length > 0) {
                    const recipeRating = allRecipeRating.find(item => item.recipe.id === filteredRecipe.id);
                    if (recipeRating) {
                        const recipeRatingValue = recipeRating.rating;
                        const recipeRatingsForRecipe = allRecipeRating.filter(item => item.recipe.id === filteredRecipe.id);
                        const averageRatingForRecipe = calculateAverage(recipeRatingsForRecipe.map(item => item.rating));

                        setRecipeAverageRatings((prevRatings) => ({
                            ...prevRatings,
                            [filteredRecipe.id]: averageRatingForRecipe,
                        }));
                    }
                }
            } catch (error) {
                console.error('Error calculating average rating:', error);
            }
        });
    }, [allRecipeRating, filterRecipes]);

    return (
        <>
            {filterRecipes().map((filteredRecipe, index) => (
                <div key={index} className='container-content__recipe' >
                    <h2>{filteredRecipe.name}</h2>
                    <div className='container-content__recipe__altBox'>
                        <img src={decodeBase64Image(filteredRecipe.base64img)} alt={filteredRecipe.name} />
                        <div className='container-content__recipe__altBox__icons'>
                            <FaRegComment onClick={() => handleCommentClick(index)} className='icon' />
                            <CiEdit onClick={() => handleEditClick(filteredRecipe, index)} className='icon' />
                            {isAdmin && <MdDelete onClick={() => handleDeleteClick(filteredRecipe.id)} className='deleteIcon' />}
                            <div className='point'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`icon ${star <= (recipeRatings[filteredRecipe.id] || starRating) ? 'ratingYellow' : 'ratingGrey'}`}
                                        onClick={() => handleStarClick(star, filteredRecipe.id)}
                                    />
                                ))}
                            </div>
                            <p className='averageRating'>{recipeAverageRatings[filteredRecipe.id]}</p>
                        </div>
                        <div className='container-content__recipe__altBox__comment-area'>
                            <input
                                type='text'
                                placeholder='Yorum yap'
                                ref={inputRefs.current[index]}
                                onBlur={() => handleInputBlur(index)}
                                onChange={(e) => setCommentMessage(e.target.value)}
                                className={inputStates[index] ? 'activeInput' : ''}
                            />
                            <IoMdSend onClick={() => handleSendCommentClick(filteredRecipe.id)} className='sendCommentIcon' />
                            <label htmlFor='file-input' style={{ display: 'flex' }}>
                                <input
                                    id='file-input'
                                    type='file'
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <MdOutlinePhotoLibrary onClick={() => setOpenFile(true)} className='recipeCommentPhotoIcon' />
                            </label>
                        </div>
                        <h5 onClick={() => handleGetComment(filteredRecipe.id)}>Yorumları Göster</h5>
                        {isCommentActive && selectedRecipeId === filteredRecipe.id && (
                            <div className='userCommentArea'>
                                {reciperating
                                    .filter((filteredComment) => filteredComment.recipe.id === filteredRecipe.id)
                                    .map((filteredComment, index) => (
                                        <div className='recipe-comments' key={index}>
                                            <div className='recipe-comments__box'>
                                                <>
                                                    <h6>{filteredComment.createdBy}</h6>
                                                    <p>{filteredComment.comment}</p>
                                                </>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        <p>{filteredRecipe.explanation}</p>
                        <div className='container-content__recipe__altBox__ingredients' >
                            <h4>Malzeme Listesi</h4>
                            <ul>
                                {ingredients[index]
                                    ? ingredients[index].split('\n').map((ingredient, i) => (
                                        <li key={i}>{ingredient}</li>
                                    ))
                                    : <li>Loading...</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default RecipePart;
