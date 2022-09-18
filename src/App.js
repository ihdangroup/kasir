
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Sukses, Keranjang} from './pages'
import NavbarComp from './components/NavbarComp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComp/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sukses" element={<Sukses/>} />
          <Route path="/keranjang" element={<Keranjang/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

