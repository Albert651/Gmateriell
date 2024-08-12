import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contenue from './Components/Contenue/Contenue';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ListeBase from './Components/ListeBase'
import ListeLane from './Components/ListeLane';
import ListeDepotA from './Components/ListeDepotA';
import ListeOutils from './Components/ListeOutils';
import ListeDepotB from './Components/ListeDepotB';

function Home() {
  return (
    <>
      <Navbar />
      <Contenue />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/ListeBase' element={<ListeBase />}/>
          <Route path='/ListeLane' element={<ListeLane />}/>
          <Route path='/ListeOutil' element={<ListeOutils />}/>
          <Route path='/ListeDepotA' element={<ListeDepotA />}/>
          <Route path='/ListeDepotB' element={<ListeDepotB />}/>
          <Route path='/ListeBase/:idB' element={<ListeBase/>}/>
          <Route path='/ListeLane/:idL' element={<ListeLane/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

