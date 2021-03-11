import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';
import Header from './components/header/Header';
import Homepage from './components/homepage/Homepage';
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import UserContextProvider from './contexts/UserContext';
import Signout from './components/login/Signout';
import Main from './components/todolist/Main';
import ErrorsContextProvider from './contexts/ErrorsContext';

const App = () => (
  <ErrorsContextProvider>
    <BreakpointProvider>
      <Router>
        <UserContextProvider>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Homepage />
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
  </ErrorsContextProvider>
);

export default App;
