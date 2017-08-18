import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
//import routes from './routes';
import App from './components/App';
import rootReducer from './reducers/rootReducer';



const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <div className="app-router">
            <Router history={createBrowserHistory()}>
                <App/>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
