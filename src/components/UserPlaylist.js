import React, { useEffect } from "react"

function UserPlaylist(props) {
    const artistList = props.finalPlaylist.map((artist) => {
        return (<p>{artist}...</p>)
    })

    useEffect(() => {
        setTimeout(() => {
            alert('Your Playist is complete!')
        }, 10000)
    }, [])

    return (
        <>
            <div className="progressBar"></div>
            <h3>Adding songs from:</h3>
            {artistList}
        </>
    )
}

export default UserPlaylist