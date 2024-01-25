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

    const textareRef = useRef();

    console.log('recipe', recipe);

    const handleStarHover = (hoveredStar) => {
        if (rating === 0) {
            setRating(hoveredStar);
        }
    };

    const handleStarClick = (clickedStar) => {
        console.log('deneme', clickedStar)
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

    useEffect(() => {
        if (isCommenting === true) {

        }
    }, [isCommenting])


    const handleCommentClick = () => {
        if (textareRef.current) {
            textareRef.current.blur();
        }
    };

    return (
        <>
            <div className='container-content'>
                <div className='leftContent' >
                    <div className='topContent__filter'>
                        <input />
                        <Dropdown  >
                            <Dropdown.Toggle className='topContent__filter__dropdown'>
                                Kategori
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='topContent__filter_-dropdownMenu' >
                                <Dropdown.Item className='topContent__filter_-dropdownMenu__hover' href="#/action-1">Tatlılar</Dropdown.Item>
                                <Dropdown.Item className='topContent__filter_-dropdownMenu__hover' href="#/action-2">Çorbalar</Dropdown.Item>
                                <Dropdown.Item className='topContent__filter_-dropdownMenu__hover' href="#/action-3">Ana Yemekler</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className='altContent' >
                    <div className='container-content__recipe'>
                        <h2>Yemek adı</h2>
                        <div className='container-content__recipe__altBox'>
                            <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />

                            <div className='container-content__recipe__altBox__icons'>
                                <FaRegComment onClick={handleCommentClick} className='icon' />
                                <CiEdit onClick={handleEditClick} className='icon' />
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
                        </div>
                        <p>{recipe}</p>
                    </div>
                    <div className='container-content__recipe'>
                        <h2>Yemek adı</h2>
                        <div className='container-content__recipe__altBox'>
                            <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />
                            <div className='container-content__recipe__altBox__icons'>
                                <FaRegComment className='icon' />
                                <CiEdit className='icon' />
                                <MdOutlineAdd className='icon' />
                                <div className='point'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`icon ${star <= rating ? 'ratingYellow' : 'ratingWhite'}`}
                                            onMouseEnter={() => handleStarHover(star)}
                                            onMouseLeave={handleStarLeave}
                                            onClick={() => handleStarClick(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <textarea />
                        </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                        </p>
                    </div>
                    <div className='container-content__recipe'>
                        <h2>Yemek adı</h2>
                        <div className='container-content__recipe__altBox'>
                            <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />
                            <div className='container-content__recipe__altBox__icons'>
                                <FaRegComment className='icon' />
                                <CiEdit className='icon' />
                                <MdOutlineAdd className='icon' />
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
                            <textarea />
                        </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                        </p>
                    </div>
                    <div className='container-content__recipe'>
                        <h2>Yemek adı</h2>
                        <div className='container-content__recipe__altBox'>
                            <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />
                            <div className='container-content__recipe__altBox__icons'>
                                <FaRegComment className='icon' />
                                <CiEdit className='icon' />
                                <MdOutlineAdd className='icon' />
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
                            <textarea />
                        </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum veniam deserunt sapiente nesciunt sunt minus autem excepturi sint iusto, ut officiis eveniet laborum repellendus maxime illum animi error amet eum?
                        </p>
                    </div>
                </div>
            </div>
            {recipePopup &&
                <Modal className='products-popup-container' show={true} onHide={() => setRecipePopup(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='products-popup-container__box' >
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
