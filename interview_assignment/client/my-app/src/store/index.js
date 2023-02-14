/*import {createStore} from 'redux';

const dummyReducer = ()=> {	
		return 100;
}
const store = createStore(dummyReducer);
export default store;
*/



import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/index';
const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
? a => a
: window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  
  )(createStore)(rootReducer);
  sagaMiddleware.run(rootSaga);
export default store;


