import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../redux'
import rootSaga from '../sagas';

const initialState = {}
const sagaMiddleware = createSagaMiddleware();


const enchancers = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
].filter(e => e)

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(sagaMiddleware), ...enchancers)
)

sagaMiddleware.run(rootSaga);
