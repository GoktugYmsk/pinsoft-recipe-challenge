import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineAdd } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import './index.scss';

function Content() {
    const [rating, setRating] = useState(0);

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

    return (
        <div className='container-content'>
            <div className='leftContent' >
                <div className='topContent__filter'>
                    <input />
                </div>
            </div>
            <div className='altContent' >
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
    );
}

export default Content;
