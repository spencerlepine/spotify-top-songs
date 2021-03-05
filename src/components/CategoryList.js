import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"

function CategoryList() {
    const {availableCategories, clickCategoryCard} = useContext(SpotifyContext)

    console.log(availableCategories)

    const categoryList = availableCategories.map((cat, index) =>
        (<div key={index} 
            onClick={() => clickCategoryCard(cat.id)}
            className="card category">
            <p>{cat.name}</p>
        </div>)
    );

    return (
        <div className="cardGrid">
            <p className="stepInstructions">Choose a category:</p>
            {categoryList}
        </div>
    )
}

export default CategoryList