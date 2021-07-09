import './App.css';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Homepage from './pages/homepage/Homepage';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Homepage></Homepage>
      <Footer></Footer>
    </div>
  );
}

export default App;
