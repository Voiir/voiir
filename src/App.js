import './App.css';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Onboard from './pages/login/Onboard';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar>
      <Homepage></Homepage>
      <Footer></Footer> */}
      <Login></Login>
      {/* <Onboard></Onboard> */}
    </div>
  );
}

export default App;
