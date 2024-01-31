import React from 'react'

function RecipePart() {
    return (
        <>
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
                                <MdDelete onClick={() => handleDeleteClick(filteredRecipe.id)} className='deleteIcon' />
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
        </>
    )
}

export default RecipePart
