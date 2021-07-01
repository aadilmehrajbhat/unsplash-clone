import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Search from '@pages/Search';

function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/s/photos/:query">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Routes;
