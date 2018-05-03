import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';

import App from './components/App';

ReactDOM.render(
	<App hello={'hello'} />,
	document.getElementById('root')
);