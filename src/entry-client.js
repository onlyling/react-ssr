import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import App from './routes';

ReactDOM.render(
    <Router>
        <div>
            <Link to="/home">home</Link>
            &emsp;
            <Link to="/list/index">list</Link>
            &emsp;
            <Link to="/error">404</Link>
            &emsp;
            <Link to="/admin/home">admin-home</Link>
            <App />
        </div>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
