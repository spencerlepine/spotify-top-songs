import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"
import UserConnected from "./UserConnected"
import LoginButton from "./LoginButton"
import CategoryList from "./CategoryList"
import ArtistList from "./ArtistList"
import UserPlaylist from "./UserPlaylist"

import {Switch, Route} from "react-router-dom"

function SpotifyDataComponent() {
    const {selectedCategory, checkedArtists, submitSelectedArtists, playlistLink} = useContext(SpotifyContext);

    return (
        <>
            <Switch>
                <Route path="/categories">
                    <UserConnected />
                    {!selectedCategory && <CategoryList />}
                </Route>

                <Route path="/artists">
                    <UserConnected />
                    {selectedCategory && <ArtistList />}
                    {
                        checkedArtists.filter(i => i).length > 0
                            &&
                        playlistLink.href === ''
                            && 
                        <button onClick={submitSelectedArtists} className="generateBTN">Generate</button>
                    }
                </Route>

                <Route path="/generate">
                    <UserConnected />
                    {<UserPlaylist />}
                </Route>
                
                <Route path="/">
                    <LoginButton />
                </Route>
            </Switch>
    
        </>
    )
}

export default SpotifyDataComponent
