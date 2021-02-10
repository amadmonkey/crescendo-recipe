import React from 'react';
import { Redirect, BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import _ROUTES from "./routes.js";
import './reset.css';
import './App.scss';

function App() {
	return (
		<div className="App">
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Header />
				<div id="CONTENT" className="content">
					<Switch>
						{Object.keys(_ROUTES).map((key, i) => {
							return <Route key={i} path={_ROUTES[key].path} component={_ROUTES[key].component} exact={_ROUTES[key].exact} />
						})}
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
