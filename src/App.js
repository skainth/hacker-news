import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Header from './components/Header';
import NewsContainer from './containers/NewsContainer/index';

class App extends Component{
	render(){
		return (
			<Router>
				<>
					<Header/>
					<Switch>
						<Route path='/top' exact component={NewsContainer} />
						<Route path='/new' exact component={NewsContainer} />

						<Redirect from='/' to='/top' />
					</Switch>
				</>
			</Router>
		);
	}
}

export default App;
