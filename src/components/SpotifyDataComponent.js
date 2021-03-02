import React from "react"
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
                    <p className="stepInstructions">{props.selectedCategory.name} Artists:</p>
                    <CardList list={props.featuredArtists.map((artist, index) => {
                        let profilePic = artist.images ? artist.images[2].url : error
                        
                        return (<div key={index}
                                    onClick={() => props.clickArtist(index)}
                                    className={props.checkedArtists[index] ? "checked card" : "card"}>
                                    <div style={{opacity: profilePic === error ? "0" : "1"}}>   
                                        <img src={profilePic} alt="Artist profile"></img>
                                    </div>
                                    <p>{artist.name}</p>
                                </div>
                        )})}
                    />
                </>
            }
        </>
    )
}

export default DisplayData
