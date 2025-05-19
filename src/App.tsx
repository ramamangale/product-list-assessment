import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LandingPage, NotFound, ProductList } from './screens';
import { AppLayout } from './components';
function App(props: any) {
  return (
    <>
      <Router>
        <AppLayout {...props}>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/products">
              <ProductList />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </AppLayout>
      </Router>
    </>
  );
}

export default App;
