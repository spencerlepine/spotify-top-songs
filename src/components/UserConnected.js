import React, {useContext} from "react"
import {SpotifyContext} from "../SpotifyContext"

function UserConnected(props) {
    const {user} = useContext(SpotifyContext)

    return (
        <>
            {user && 
                <p className="userWelcome">
                    {String.fromCharCode(183)}
                    {String.fromCharCode(183)}
                    {String.fromCharCode(183)}
                    {user.display_name}
                    {String.fromCharCode(183)}
                    {String.fromCharCode(183)}
                    {String.fromCharCode(183)}
                </p>
            }
        </>
    )
}

export default UserConnected