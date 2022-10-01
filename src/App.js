import './App.css';
import Routes from './presentation/routes/routes';
import Navbar from './presentation/components/navbar/navbar';
import Footer from './presentation/components/footer/footer';
import Loader from './presentation/components/loader/loader';
import CircularLoader from './presentation/components/circularLoader/circularLoader';
import { useSelector } from 'react-redux';

//main entry point of the application.

function App() {
  const isLoading = useSelector((state) => state.userReducer.isLoading);

  return (
    <div className="App">
      {isLoading && <CircularLoader></CircularLoader>}

      <Navbar></Navbar>
      <Routes></Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
