import React from "react"
import PropTypes from "prop-types"
import ArtistSelection from "./ArtistSelection"
import CategorySelection from "./CategorySelection"

function DisplayData(props) {
    return (
        <>
            {   
                props.currentUser 
                && 
                <p className="userWelcome">{String.fromCharCode(183)}{String.fromCharCode(183)}{String.fromCharCode(183)}{props.currentUser}{String.fromCharCode(183)}{String.fromCharCode(183)}{String.fromCharCode(183)}</p>
            }
            
            {!props.selectedCategory &&
                (<div className="cardGrid">
                    <p className="stepInstructions">Choose a category:</p>
                    <CategorySelection
                        handleClick={props.clickCategoryCard}
                        list={props.availableCategories} />
                </div>)
            }

            {props.checkedArtists.filter(i => i).length > 0 && <button onClick={props.submitSelectedArtist} className="generateBTN">Generate</button>}

            {props.featuredArtists.length > 0 &&
                <>
                    <p className="stepInstructions">{props.selectedCategory} Artists:</p>
                    <ArtistSelection
                        handleClick={props.clickArtist}
                        list={props.featuredArtists} 
                        checkedArtists={props.checkedArtists} />
                </>
            }

            {props.loadingPlaylist && <p>Loading playlist...</p>}
        </>
    )
}

DisplayData.propTypes = {
    currentUser: PropTypes.string,
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
