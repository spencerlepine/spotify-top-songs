import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"
import error from "./error.png"

function ArtistList() {
    const {featuredArtists, selectedCategory, clickArtist, checkedArtists} = useContext(SpotifyContext)

    const artistList = featuredArtists.map((artist, index) => {
        let profilePic = artist.images ? artist.images[2].url : error
        
        return (<div key={index}
                    onClick={() => clickArtist(index)}
                    className={checkedArtists[index] ? "checked card" : "card"}>
                    <div style={{opacity: profilePic === error ? "0" : "1"}}>   
                        <img src={profilePic} alt="Artist profile"></img>
                    </div>
                    <p>{artist.name}</p>
                </div>
    )});

    return (
        <div className="cardGrid">
            <p className="stepInstructions">{selectedCategory.name} Artists:</p>
            {artistList}
        </div>
    )
}

export default ArtistList