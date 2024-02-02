import React, { useEffect, useRef, useState } from 'react';
import { FaRegComment, FaStar } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import api from '../../../interceptor';

function RecipePart({
    filterRecipes,
    decodeBase64Image,
    handleEditClick,
    handleDeleteClick,
    handleStarHover,
    handleStarLeave,
    setRating,
    isAdmin,
    rating,
    isLogin,
}) {
    const [inputStates, setInputStates] = useState(filterRecipes().map(() => false));
    const inputRefs = useRef(filterRecipes().map(() => React.createRef()));

    const [commentMessage, setCommentMessage] = useState('');
    const [photo, setPhoto] = useState('');
    const [openFile, setOpenFile] = useState(false);
    const [recipeRaiting, setRecipeRating] = useState();
    const [starRating, setStarRating] = useState();
    const [hoverRecipe, setHoverRecipe] = useState();

    const getUserId = sessionStorage.getItem('userId');


    console.log('GETUSERID', getUserId);

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

    const handleStarClick = (clickedStar) => {
        console.log('clickedStar', clickedStar);
        setRating(clickedStar);
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


    const handleRecipeHover = (recipeId) => {
        setHoverRecipe(recipeId);
    };

    useEffect(() => {
        console.log('hoverRecipe', hoverRecipe);
        const fetchData = async () => {
            try {
                const response = await api.get(`/reciperating/${hoverRecipe}`);
                setRecipeRating(response.data.rating);
                const writeRecipeStar = response.data.map((item) => {
                    return item.rating;
                });
                setStarRating(writeRecipeStar);
                console.log('responsesetRecipeRatingsetRecipeRating', response);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, [hoverRecipe]);

    useEffect(() => {
        console.log('starRating', starRating);
    }, [starRating]);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.get(`/reciperating/${recipeId}`);
    //             setRecipeRating(response.data);
    //             console.log('responsesetRecipeRatingsetRecipeRating', response);
    //         } catch (error) {
    //             console.error('Veri alınamadı:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    // Yıldızlara bakınacak


    return (
        <>
            {filterRecipes().map((filteredRecipe, index) => (
                <div key={index} className='container-content__recipe'
                    onMouseEnter={() => handleRecipeHover(filteredRecipe.id)}
                >
                    <h2>{filteredRecipe.name}</h2>
                    <div className='container-content__recipe__altBox'>
                        <img src={decodeBase64Image(filteredRecipe.base64img)} alt={filteredRecipe.name} />
                        <div className='container-content__recipe__altBox__icons'>
                            <FaRegComment onClick={() => handleCommentClick(index)} className='icon' />
                            <CiEdit onClick={() => handleEditClick(filteredRecipe)} className='icon' />
                            {isAdmin && <MdDelete onClick={() => handleDeleteClick(filteredRecipe.id)} className='deleteIcon' />}
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
                        <p>{filteredRecipe.explanation}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default RecipePart;
