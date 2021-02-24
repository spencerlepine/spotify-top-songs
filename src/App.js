import './App.css';
import Header from "./components/Header"
import SpotifyDataContainer from "./components/SpotifyDataContainer"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Header />
      <SpotifyDataContainer />
      <Footer />
    </div>
  );
}

export default App;


/*
  Set language on request
  handle errors (error page?)
  abstract card function
  make playlist 
*/
