import React from "react"
import spotify from './spotify.svg'

function UserWelcome() {
    return (
        <>
            <img src={spotify} className="spotifyLogo" alt="Spotify Logo"></img>
            <h3>To begin, log in to your Spotify Account</h3>
        </>
    )
}

export default UserWelcome