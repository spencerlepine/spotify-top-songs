import React from "react"

function CategorySelection(props) {
    let cardList = props.list.map((cat, index) => {
        return (<div key={index} 
                    onClick={() => props.handleClick(cat.id)}
                    className="card category">
                    <p>{cat.name}</p>
                </div>)
    })

    return (
        <div className="cardGrid">
            {cardList}
        </div>
    )
}

export default CategorySelection;