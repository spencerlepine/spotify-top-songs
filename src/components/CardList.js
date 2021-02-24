import React from "react"

function CardList(props) {
    return (
        <div className="cardGrid">
            {props.list}
        </div>
    )
}

export default CardList;