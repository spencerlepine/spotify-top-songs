import React from "react"
import githubLogo from "./github.jpg"
import twitterLogo from "./twitter.jpg"

function Footer() {
    return (
        <footer>
            <div className="footerLinks">
                <a href="https://github.com/spencerlepine/spotify-top-five" target="_blank" rel="noreferrer" >
                    <img src={githubLogo} alt="GitHub Logo"></img>
                </a>
                <p>Created by <a target="_blank" href="https://twitter.com/SpencerLepine" rel="noreferrer" >@SpencerLepine</a>  </p>
                <a href="https://twitter.com/SpencerLepine" target="_blank" rel="noreferrer" >
                <img src={twitterLogo} alt="Twitter Logo"></img>
                </a>
            </div>
        </footer>
    )
}

export default Footer