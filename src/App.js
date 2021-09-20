import './App.css';
import Routes from './presentation/routes/routes';
import Navbar from './presentation/components/navbar/navbar';
import Footer from './presentation/components/footer/footer';
import Loader from './presentation/components/loader/loader';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes></Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
