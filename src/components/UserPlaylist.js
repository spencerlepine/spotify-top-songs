import React, { useState, useEffect } from "react"

function UserPlaylist(props) {
    const [artistList, setArtistList] = useState(
        props.finalPlaylist.map((artist, i) => {
        return (<p key={i}>{artist.name}...</p>)
    }))

    useEffect(() => {
        if (typeof props.playlistLink == 'string') {
            setArtistList()
        }
    }, [props.playlistLink])

    return (
        <>
            {<h3>Adding songs from:</h3> && artistList}
            {!artistList && props.playlistLink && <p className="playlistLink"><a href={props.playlistLink} target="_blank" rel="noreferrer">Playlist link🔗</a></p>}
            {!artistList && <p className="homeLink"><a href={window.location.toString().split('/c')[0]}>🏠 HOME</a></p>}
        </>
    )
}

export default UserPlaylist