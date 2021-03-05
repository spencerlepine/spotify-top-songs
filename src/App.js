import './App.css';
import Header from "./components/Header"
import SpotifyDataComponent from "./components/SpotifyDataComponent"
import Footer from "./components/Footer"
import {SpotifyContextProvider} from "./SpotifyContext"

function App() {
    return (
        <div className="App">
            <Header />
            <SpotifyContextProvider>
                <SpotifyDataComponent />
            </SpotifyContextProvider>
            <Footer />
        </div>
    );
}

export default App;
