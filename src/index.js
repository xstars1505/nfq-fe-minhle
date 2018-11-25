import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Nav from './pages/common/Nav';
import Routes from './routes';
import { history, store } from './store';
import '../public/css/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.scss';
import '../public/css/index.scss';

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<div className="app-container">
				<Nav/>
				<main>
					<div className="container py-3">
						<Routes/>
					</div>
				</main>
			</div>
		</Router>
	</Provider>
), document.getElementById('app'));

