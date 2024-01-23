import React, { useState } from 'react';
import './index.scss';
import { FaRegComment } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineAdd } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';

function Content() {
    const [rating, setRating] = useState(0); // State tanımı, başlangıçta hiçbir yıldız sarı değil

    const handleStarHover = (hoveredStar) => {
        setRating(hoveredStar);
    };

    const handleStarClick = (clickedStar) => {
        setRating(clickedStar);
    };

    return (
        <div className='container-content'>
            <div className='container-content__filter'>
                <input />
            </div>
            <div className='container-content__recipe'>
                <h2>tarif adı</h2>
                <div className='container-content__recipe__altBox'>
                    <img src='https://cdn.yemek.com/mnresize/940/940/uploads/2023/10/saray-koftesi-yemekcom.jpg' />
                    <textarea />
                    <div className='container-content__recipe__altBox__icons'>
                        <FaRegComment className='icon' />
                        <CiEdit className='icon' />
                        <MdOutlineAdd className='icon' />
                        <div className='point'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaRegStar
                                    key={star}
                                    className={`icon ${star <= rating ? 'ratingYellow' : 'raitingGrey'}`}
                                    onMouseEnter={() => handleStarHover(star)}
                                    onMouseLeave={() => handleStarHover(0)}
                                    onClick={() => handleStarClick(star)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <p>TARİF</p>
            </div>
        </div>
    );
}

export default Content;
