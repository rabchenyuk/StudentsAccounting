import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Auth from './reducers/Auth';
import * as Courses from './reducers/Courses';
import * as Profile from './reducers/Profile';

//function loggerMiddleware(store) {
//    return function (next) {
//        return function (action) {
//            const result = next(action);
//            console.log('Middleware', store.getState());
//            return result;
//        }
//    }
//}

// es6
//const loggerMiddleware = store => next => action => {
//    const result = next(action);
//    console.log('Middleware', store.getState());
//    return result;
//};

export default function configureStore (history, initialState) {
  const reducers = {
      auth: Auth.reducer,
      courses: Courses.reducer,
      profile: Profile.reducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history),
    //loggerMiddleware
  ];

  //// In development, use the browser's Redux dev tools extension if installed
  //const enhancers = [];
  //const isDevelopment = process.env.NODE_ENV === 'development';
  //if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  //  enhancers.push(window.devToolsExtension());
  //}

 const composeEnhancers =
     typeof window === 'object' &&
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
             // Specify extension�s options like name, actionsBlacklist, actionsCreators, serialize...
         }) : compose;

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

    return createStore(
        //initialState,
        rootReducer,
        //compose(applyMiddleware(...middleware), ...enhancers)
        composeEnhancers(applyMiddleware(...middleware)),
  );
}
