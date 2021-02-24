import React from "react"
import PropTypes from "prop-types"
import UserConnected from "./UserConnected"
import CardList from "./CardList"
import error from "./error.png"

function DisplayData(props) {
    return (
        <>
            <UserConnected currentUser={props.currentUser ? props.currentUser.display_name : null} />

            {!props.selectedCategory &&
            <>
                <p className="stepInstructions">Choose a category:</p>
                <CardList list={props.availableCategories.map((cat, index) => {
                    return (<div key={index} 
                                onClick={() => props.clickCategoryCard(cat.id)}
                                className="card category">
                                <p>{cat.name}</p>
                            </div>
                    )
                })} />
            </>
            }

            {props.checkedArtists.filter(i => i).length > 0 && <button onClick={props.submitSelectedArtist} className="generateBTN">Generate</button>}

            {props.featuredArtists.length > 0 &&
            <>
                <p className="stepInstructions">{props.selectedCategory} Artists:</p>
                <CardList list={props.featuredArtists.map((artist, index) => {
                    let profilePic = error
                    if (artist.images) {
                        profilePic = artist.images[2].url
                    } else {
                        return null
                    }

                    return (<div key={index}
                                onClick={() => props.clickArtist(index)}
                                className={props.checkedArtists[index] ? "checked card" : "card"}>
                                <div>
                                    <img src={profilePic} alt="Artist profile"></img>
                                </div>
                                <p>{artist.name}</p>
                            </div>
                    )})}
                />
            </>}

            {props.loadingPlaylist && <p>Loading playlist...</p>}
        </>
    )
}

DisplayData.propTypes = {
    availableCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    categoryPlaylists: PropTypes.arrayOf(PropTypes.object).isRequired,
    featuredArtists: PropTypes.array.isRequired,
    checkedArtists: PropTypes.array.isRequired,
    clickArtist: PropTypes.func.isRequired,
    submitSelectedArtist: PropTypes.func.isRequired,
    clickCategoryCard: PropTypes.func.isRequired
}

export default DisplayData