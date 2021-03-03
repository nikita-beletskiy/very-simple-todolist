import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';
import Header from './components/header/Header';
import Landing from './components/Landing';
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import UserContextProvider from './contexts/UserContext';
import Signout from './components/login/Signout';
import Main from './components/todolist/Main';

const App = () => (
  <BreakpointProvider>
    <Router>
      <UserContextProvider>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path='/my-list'>
            {/* ADD REDIRECT! */}
            <Main />
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
      </UserContextProvider>
    </Router>
  </BreakpointProvider>
);

export default App;
