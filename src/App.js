import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {Route, Switch, HashRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Repository from './Components/repository/Repository.jsx';
import repositoryReducer from './Components/store/reducers.store.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  RepositoryReducer : repositoryReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route exact activeClassName="active" path="/" component={Repository}/>
                </Switch>
            </HashRouter>
          </div>
      </Provider>
  );
}

export default App;
