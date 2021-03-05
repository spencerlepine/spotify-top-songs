import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"
import UserConnected from "./UserConnected"
import LoginButton from "./LoginButton"
import CategoryList from "./CategoryList"
import ArtistList from "./ArtistList"
import PlaylistGenerator from "./PlaylistGenerator"

function SpotifyDataComponent() {
    const {selectedCategory, checkedArtists, submitSelectedArtists, playlistLink} = useContext(SpotifyContext);

    return (
        <>
            <LoginButton />

            <UserConnected />

            {!selectedCategory && <CategoryList />}

            {selectedCategory && <ArtistList />}

            {
                checkedArtists.filter(i => i).length > 0
                    &&
                playlistLink.href === ''
                    && 
                <button onClick={submitSelectedArtists} className="generateBTN">Generate</button>
            }

            {<PlaylistGenerator />}
        </>
    )
}

export default SpotifyDataComponent
