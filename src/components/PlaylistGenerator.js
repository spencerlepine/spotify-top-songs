import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"

import UserPlaylist from "./UserPlaylist"

function PlaylistGenerator() {
    const {playlistLink, finalPlaylist} = useContext(SpotifyContext)
 
    return (
        <>
            {finalPlaylist && <UserPlaylist finalPlaylist={finalPlaylist} playlistLink={playlistLink.href} />}
        </>
    )
}

export default PlaylistGenerator
