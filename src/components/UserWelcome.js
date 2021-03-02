import React from "react"
import spotify from './spotify.svg'
import tutorial from './tutorial.jpg'

function UserWelcome() {
    return (
        <>
            <p>Generate a Spotify playlist based on the top rated songs of your favorite artists.</p>
            <img src={tutorial} className="tutorialImg" alt="Spotify Screenshot"></img>
            <h3>To begin, log in to your Spotify Account</h3>
            <img src={spotify} className="spotifyLogo" alt="Spotify Logo"></img>
        </>
    )
}

export default UserWelcome