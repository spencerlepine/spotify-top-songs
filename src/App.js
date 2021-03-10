import './App.css';
import Header from "./components/Header"
import SpotifyDataComponent from "./components/SpotifyDataComponent"
import Footer from "./components/Footer"
import {SpotifyContextProvider} from "./SpotifyContext"
import {BrowserRouter as Router} from "react-router-dom"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <Router>
                    <Header />
                    <SpotifyContextProvider>
                        <SpotifyDataComponent />
                    </SpotifyContextProvider>
                    <Footer />
                </Router>
            </ErrorBoundary>
        </div>
    );
}

export default App;
