import './App.css';
import Header from "./components/Header"
import SpotifyDataComponent from "./components/SpotifyDataComponent"
import Footer from "./components/Footer"
import {SpotifyContextProvider} from "./SpotifyContext"
import {BrowserRouter as Router} from "react-router-dom"

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <SpotifyContextProvider>
                    <SpotifyDataComponent />
                </SpotifyContextProvider>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
