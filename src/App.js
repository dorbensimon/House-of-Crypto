import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Hader';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';

function App() {
  return (
    <Router>
      <div className="maindiv">
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact/>
      </div>
      </Router>
  );
}

export default App;
