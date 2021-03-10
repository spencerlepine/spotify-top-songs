import React, {useState, useEffect, createContext} from "react"
import SpotifyWebApi from "spotify-web-api-js"
import {Redirect, useHistory} from "react-router-dom"

const spotifyWebApi = new SpotifyWebApi();
const SpotifyContext = createContext()

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

function SpotifyContextProvider(props) {
    const [token, setToken] = useState(false)
    const [user, setUser] = useState(null)
    const [availableCategories, setAvailableCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [featuredArtists, setFeaturedArtists] = useState([])
    const [checkedArtists, setCheckedArtists] = useState([])
    const [categoryPlaylists, setCategoryPlaylists] = useState([])
    const [fetchingArtists, setFetchingArtists] = useState(true)
    const [playlistLink, setPlaylistLink] = useState({href: '', id: null})
    const [finalPlaylist, setFinalPlaylist] = useState([]);

    const history = useHistory();

    // Once we have a token, start getting spotify data
    useEffect(() => {
        if (token) {
            spotifyWebApi.setAccessToken(token);

            spotifyWebApi.getMe()
                .then((response) => setUser(response))

            spotifyWebApi.getCategories()
                .then((response) => {setAvailableCategories(response.categories.items)})
            return
        }
    }, [token])

    // After the category is found, use the ID
    useEffect(() => {
        if (selectedCategory) {
            spotifyWebApi.getCategoryPlaylists(selectedCategory.id)
                .then((response) => setCategoryPlaylists(response.playlists.items))
            return
        }
    }, [selectedCategory])

    // Go through the playlists of the selected category ONCE
    useEffect(() => {
        if (categoryPlaylists.length > 0) {
            for (let i = 0, l = categoryPlaylists.length; i < l; i++) {
                getPlaylistTracks(categoryPlaylists[i].id)
            }
            return
        }
    }, [categoryPlaylists])

    function getPlaylistTracks(id) {
        const lim = 5;

        spotifyWebApi.getPlaylistTracks(id, {limit: lim}) // Only get 5 songs
            .then((response) => {
                let startingTracks = response.items;

                for (let i = 0; i < lim; i++) {
                    let thisArtist = startingTracks[i].track.artists[0];

                    setFeaturedArtists((prevArray) => {
                        // Make a boolean array of the same length
                        setCheckedArtists((prevArray) => [...prevArray, false])

                        // Skip if this artist already was saved
                        for (let i = 0, l = prevArray.length; i < l; i++) {
                            if (`${prevArray[i].id}` === `${thisArtist.id}`) {
                                return prevArray
                            }
                        }

                        let updatedList = [...prevArray, {id: thisArtist.id}]
                        return updatedList
                    })
                }
                setFetchingArtists(false)
        });
    }

    // Use fresh artist data to get their profile images
    useEffect(() => {
        if (!fetchingArtists) {
            fetchProfiles();
            return
        }
    }, [featuredArtists])

    // Abstract the image fetching interations
    function fetchProfiles() {
        setFetchingArtists(true)
        if (featuredArtists.length > 0) {
            for (let i = 0, l = featuredArtists.length; i < l; i++) {
                getArtistImage(featuredArtists[i].id, i)
            }
        }
    }

    // Overwrite featuredArtist array with full artist info
    function getArtistImage(id, index) {
        spotifyWebApi.getArtist(id)
            .then((response) => {
                setFeaturedArtists((prevArray) => {
                    if (response.popularity < 10) {
                        return prevArray
                    }

                    let updatedList = [...prevArray]
                    updatedList[index] = response

                    return updatedList
                })
        });
    }

    function clickCategoryCard(id) {
        spotifyWebApi.getCategory(id)
            .then((response) => {
                setSelectedCategory(response)
                history.push('/artists')
            })
    }
    
    function clickArtist(index) {
        setCheckedArtists((prevArray) => {
            let newArray = [...prevArray]
            newArray[index] = !prevArray[index]
            return newArray
        })
    }

    function submitSelectedArtists() {
        history.push("/generate");
        getPlaylistLink();
    }

    function getPlaylistLink() {
        // Use final list
        spotifyWebApi.createPlaylist(user.id, {
            "name": "Top Songs",
            "description": "Top songs from your favorite artists. Created with a Spotify React app made by @SpencerLepine",
            "public": false
        })
        .then((response) => {
            setPlaylistLink({href: `https://open.spotify.com/playlist/${response.id}`, id: response.id})
        })
    }

    function redirectHome() {
        setPlaylistLink({href: '', id: null})
        setFinalPlaylist([]);
        history.push("/")
    }

    useEffect(() => {
        if (typeof playlistLink.id === 'string') {
            // Iterate through and select CHECKED artists
            const finalList = checkedArtists.map((artist, index) => {
                if (artist) {
                    return featuredArtists[index]
                }
            }).filter(artist => artist);

            setFinalPlaylist(finalList)

            for (let i = 0, l = finalList.length; i < l; i++) {
                spotifyWebApi.getArtistTopTracks(finalList[i].id, "US")
                    .then((response) => {
                        let tracks = response.tracks.map((track) => track.uri)
                        if (tracks.length > 0) {
                            spotifyWebApi.addTracksToPlaylist(playlistLink.id, tracks)
                            .catch(reject => {
                                console.log(finalList[i])
                                console.log(`Artist: ${finalList[i].name} did not cooperate`)
                            })
                        }
                    })
                setTimeout(200) // Don't call the API so quickly in case they block this
            }
    
            console.log(`Up to ${finalList.length*10} songs were added to your playlist`)
            setSelectedCategory("") 
            setCheckedArtists([])
            setCategoryPlaylists([])
            setFetchingArtists(true)
            return
        }
    }, [playlistLink])

    return (
        <SpotifyContext.Provider value={{
            user,
            token,
            setToken,
            availableCategories,
            clickCategoryCard,
            selectedCategory,
            clickArtist, 
            featuredArtists,
            checkedArtists,
            playlistLink,
            finalPlaylist,
            submitSelectedArtists,
            redirectHome,
            setPlaylistLink
        }}>
            {props.children}
        </SpotifyContext.Provider>
    )
}

export {SpotifyContextProvider, SpotifyContext}