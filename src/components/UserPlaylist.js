import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"

function UserPlaylist() {
    const {playlistLink, finalPlaylist, redirectHome} = useContext(SpotifyContext)

    return (
        <>
            {finalPlaylist.length > 0 &&
            <>
                {playlistLink && <p className="playlistLink"><a href={playlistLink} target="_blank" rel="noreferrer">Playlist link🔗</a></p>}
                {<p className="homeLink" onClick={redirectHome}>🏠 HOME</p>}
            </>
            }
        </>
    )
}

export default UserPlaylist