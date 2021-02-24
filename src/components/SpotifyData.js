import React, {useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-js"
import LoginButton from "./LoginButton"
import DisplayData from "./DisplayData"
import UserPlaylist from "./UserPlaylist"

const spotifyWebApi = new SpotifyWebApi();

/*
    --Display current username
    --Fetch and display list of Categories
    --Save user category choice
    --Fetch category playlists
    --Get top artists from each
    --Save to list of artist
        *insert similar artist into list
    --Display list of artists
*/

function SpotifyData() {
    const [token, setToken] = useState(false) 
    const [currentUser, setCurrentUser] = useState()
    const [availableCategories, setAvailableCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [categoryPlaylists, setCategoryPlaylists] = useState([])
    const [featuredArtists, setFeaturedArtists] = useState([])
    const [fetchingArtists, setFetchingArtists] = useState(true)
    const [checkedArtists, setCheckedArtists] = useState([])
    const [finalPlaylist, setFinalPlaylist] = useState()
    
    function getMe() {
        spotifyWebApi.getMe()
            .then((response) => {
                if (response) {
                    setCurrentUser(response.display_name)
                } 
        });
    }

    function getCategories() {
        spotifyWebApi.getCategories()
            .then((response) => {
                if (response) {
                    setAvailableCategories(response.categories.items)
                } 
        });
    }
    
    function getCategory(id) {
        spotifyWebApi.getCategory(id)
            .then((response) => {
                setSelectedCategory(response.name);
                getCategoryPlaylists(response.id);
        });
    }

    function getCategoryPlaylists(id) {
        spotifyWebApi.getCategoryPlaylists(id)
            .then((response) => {
                setCategoryPlaylists(response.playlists.items);
        });
    }

    // Overwrite featuredArtist array with full artist info
    function getArtistImage(id, index) {
        spotifyWebApi.getArtist(id)
            .then((response) => {
                setFeaturedArtists((prevArray) => {
                    let updatedList = [...prevArray]
                    updatedList[index] = response

                    return updatedList
                })
        });
    }

    function getPlaylistTracks(id) {
        const lim = 5;

        spotifyWebApi.getPlaylistTracks(id, {limit: lim}) // Only get 5 songs
            .then((response) => {
                let startingTracks = response.items;

                for (let i = 0; i < lim; i++) {
                    let thisArtist = startingTracks[i].track.artists[0];

                    setFeaturedArtists((prevArray) => {
                        // Skip if this artist already was saved
                        for (let i = 0, l = prevArray.length; i < l; i++) {
                            if (`${prevArray[i].id}` === `${thisArtist.id}`) {
                                return prevArray
                            }
                        }
                       
                        // Make a boolean array of the same length
                        setCheckedArtists((prevArray) => [...prevArray, false])
                        let updatedList = [...prevArray, {id: thisArtist.id}]
                        return updatedList
                    })
                }
                setFetchingArtists(false)
        });
    }


    function saveToken(token) {
        spotifyWebApi.setAccessToken(token);
        setToken(token);
    }
    
    // Abstract the image fetching interations
    function fetchProfiles() {
        if (featuredArtists.length > 0) {
            for (let i = 0, l = featuredArtists.length; i < l; i++) {
                getArtistImage(featuredArtists[i].id, i)
            }
            setFetchingArtists(true)
        }
    }

    function clickCategoryCard(id) {
        getCategory(id)
    }
    
    // Toggle function for card elements
    function clickArtist(index) {
        setCheckedArtists((prevArray) => {
            let newArray = [...prevArray]
            newArray[index] = !prevArray[index]
            return newArray
        })
    }

    function submitSelectedArtist() {
        // Iterate through and select CHECKED artists
        const finalList = checkedArtists.map((artist, index) => {
            if (artist) {
                return featuredArtists[index].name
            }
        }).filter(artist => artist);

        //Reset the list
        setCheckedArtists([])
        setFeaturedArtists([])
        setAvailableCategories([])

        setFinalPlaylist(finalList);
    }

    // Go through the playlists of the selected category ONCE
    useEffect(() => {
        if (categoryPlaylists.length > 0) {
            for (let i = 0, l = categoryPlaylists.length; i < l; i++) {
                getPlaylistTracks(categoryPlaylists[i].id)
            }
            return
        }
    }, [categoryPlaylists])

    // Use fresh artist data to get their profile images
    useEffect(() => {
        if (!fetchingArtists) {
            fetchProfiles();
            return
        }
    }, [featuredArtists])

    // Start fetching data once the key is found ONCE
    useEffect(() => {
        if (token) {
            getMe()
            getCategories()
            return
        }
    }, [token])

    return (
        <>
            {!token && <LoginButton saveToken={saveToken} />}
            
            {token &&
            <DisplayData 
                clickArtist={clickArtist}
                submitSelectedArtist={submitSelectedArtist}
                clickCategoryCard={clickCategoryCard}
                currentUser={currentUser}
                availableCategories={availableCategories}
                selectedCategory={selectedCategory}
                categoryPlaylists={categoryPlaylists}
                featuredArtists={featuredArtists}
                checkedArtists={checkedArtists}
            />}

            {finalPlaylist && <UserPlaylist finalPlaylist={finalPlaylist} />}
        </>
    )
}

export default SpotifyData
