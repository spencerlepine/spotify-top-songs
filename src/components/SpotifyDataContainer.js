import React, {useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-js"
import LoginButton from "./LoginButton"
import SpotifyDataComponent from "./SpotifyDataComponent"
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
    const [playlistLink, setPlaylistLink] = useState({href: '', id: null})

    function getMe() {
        spotifyWebApi.getMe()
            .then((response) => {
                if (response) {
                    setCurrentUser(response)
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

    function getPlaylistLink() {
        // Use final list

        spotifyWebApi.createPlaylist(currentUser.id, {
            "name": "Top Songs",
            "description": "Top songs from your favorite artists. Created with a Spotify React app made by @SpencerLepine",
            "public": false
        })
        .then((response) => {
            setPlaylistLink({href: `https://open.spotify.com/playlist/${response.id}`, id: response.id}) // response.href
            //playlistId = 
        })
    }

    function submitSelectedArtist() {
        // Iterate through and select CHECKED artists
        const finalList = checkedArtists.map((artist, index) => {
            if (artist) {
                return featuredArtists[index]
            }
        }).filter(artist => artist);

        //Reset the list
        setCheckedArtists([])
        setFeaturedArtists([])
        setAvailableCategories([])

        getPlaylistLink()

        setFinalPlaylist(finalList);
    }

    // Once the playlist is created, go through an write the songs to it
    useEffect(() => {
        if (typeof playlistLink.id === 'string') {
            for (let i = 0, l = finalPlaylist.length; i < l; i++) {
                spotifyWebApi.getArtistTopTracks(finalPlaylist[i].id, "US")
                    .then((response) => {
                        let tracks = response.tracks.map((track) => track.uri)
                        if (tracks.length > 0) {
                            spotifyWebApi.addTracksToPlaylist(playlistLink.id, tracks)
                            .catch(reject => console.log(`${finalPlaylist[i].name} - ${reject.JSON} - ${i}`))
                        } else {
                            console.log(`Artist: ${finalPlaylist[i].id} did not cooperate`)
                        }
                    })
                setTimeout(100) // Don't call the API so quickly
            }

            console.log(`Up to ${finalPlaylist.length*10} songs were added to your playlist`)
            return
        }
    }, [playlistLink])

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
            <SpotifyDataComponent 
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

            {finalPlaylist && <UserPlaylist finalPlaylist={finalPlaylist} playlistLink={playlistLink.href} />}
        </>
    )
}

export default SpotifyData