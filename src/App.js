import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Posts from "./components/Posts/Posts";
import Comments from "./components/Comments/Comments";
import * as reducers from "./reducers";
/**
 * Setup store, using combine reducers to handle posts and comments reducers
 */
const reducer = combineReducers(reducers);
const createStoreThunkMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreThunkMiddleware(reducer);

/**
 * React router dom to handle navigation
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/comments/:id" component={Comments} />
          <Route path="/posts" component={Posts} />
          <Route path="/">
            <Redirect to="/posts" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
