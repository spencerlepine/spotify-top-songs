import React from "react"
import error from "./error.png"

function ArtistSelection(props) {
    let cardList = props.list.map((artist, index) => {
        let profilePic = error
        
        if (artist.images) {
            profilePic = artist.images[0].url
        }

        return (<div key={index}
                    onClick={() => props.handleClick(index)}
                    className={props.checkedArtists[index] ? "checked card" : "card"}>
                    <div>
                        <img src={profilePic} alt="Artist profile"></img>
                    </div>
                    <p>{artist.name}</p>
                </div>)
    })

    return (
        <div className="cardGrid">
            {cardList}
        </div>
    )
}

export default ArtistSelection;