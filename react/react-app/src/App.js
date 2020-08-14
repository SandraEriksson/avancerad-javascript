import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import BooksPage from './pages/booksPage'
import BookPage from "./pages/bookPage";
import CartPage from "./pages/cartPage";

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={BooksPage}/>
          <Route exact path="/cart" component={CartPage}/>
          <Route exact path="/books/:id" component={BookPage}/>
          <Redirect to="/" />
        </Switch>
      </Router>
  );
}

export default App