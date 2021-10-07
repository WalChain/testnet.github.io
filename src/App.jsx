import './App.scss';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage';
import Instructions from './pages/Instructions';
import { SubstrateProvider } from './services/substrate';

const App = () => {
  const [dropdown, setdropdown] = useState(false);

  const toggle = (e) =>
    e.target.closest('[data-dropdown]')
      ? setdropdown(!dropdown)
      : setdropdown(false);

  return (
    <SubstrateProvider>
      <Router>
        <div className='App' onClick={toggle}>
          <Navbar dropdown={dropdown} toggle={toggle} />
          <Switch>
            <Route exact path='/' component={() => <LandingPage />}></Route>
            <Route
              exact
              path='/instructions'
              component={() => <Instructions />}
            ></Route>
          </Switch>
        </div>
      </Router>
    </SubstrateProvider>
  );
};

export default App;
