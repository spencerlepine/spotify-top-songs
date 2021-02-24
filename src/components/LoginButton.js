import React, {useState, useEffect} from "react"
import parseCallBack from "./parseCallback"
import UserWelcome from "./UserWelcome"

function LoginButton(props) {
    const [promptLogin, setPromptLogin] = useState(true);

    useEffect(() => {
        const validToken = parseCallBack(window.location.href);

        if (validToken) {
            props.saveToken(validToken)
            window.location.hash = '' // App will rerender with just .location
        } else {
            setPromptLogin(true);
        }
    }, [])

    function connectSpotify() {
        //var stateKey = 'spotify_auth_state';

        const client_id = '0d539539a02d47a8842d93141f6b6984'; 
        const redirect_uri = window.location + 'callback'; 

        //var state = generateRandomString(16);
        //localStorage.setItem(stateKey, state);

        // https://developer.spotify.com/documentation/general/guides/scopes/
        var scope = 'user-read-private user-read-email user-read-playback-state playlist-modify-public playlist-modify-private';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        //url += '&state=' + encodeURIComponent(state);

        window.location = url;
    }

    return (
        <div className="accountStatus">
            {promptLogin && (<>
                <UserWelcome />
                <button onClick={connectSpotify}>Connect Account</button>
            </>)}
        </div>
    )
}

export default LoginButton