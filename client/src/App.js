import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import UserContextProvider from './contexts/UserContext';
import Signout from './components/login/Signout';
import MainSheet from './components/sheet/MainSheet';

const App = () => (
  <Router>
    <div className='App'>
      <UserContextProvider>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route path='/my-list'>
              {' '}
              {/* ADD REDIRECT! */}
              <MainSheet />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/signin'>
              <Signin />
            </Route>
            <Route path='/signout'>
              <Signout />
            </Route>
          </Switch>
        </div>
      </UserContextProvider>
    </div>
  </Router>
);

export default App;
