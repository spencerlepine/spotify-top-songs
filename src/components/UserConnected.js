import React from "react"

function UserConnected(props) {
    return (
        <>
            {props.currentUser && 
            <p className="userWelcome">
                {String.fromCharCode(183)}{String.fromCharCode(183)}{String.fromCharCode(183)}{props.currentUser}{String.fromCharCode(183)}{String.fromCharCode(183)}{String.fromCharCode(183)}
            </p>
            }
        </>
    )
}

export default UserConnected