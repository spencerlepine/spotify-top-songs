import './App.css';
import Header from "./components/Header"
import SpotifyData from "./components/SpotifyData"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Header />
      <SpotifyData />
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
