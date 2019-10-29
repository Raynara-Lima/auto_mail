import React, {Component} from 'react';
import TelaPrincipal from './TelaPrincipal.js'
import VisualizarSensores from './VisualizarSensores.js'

import {Link, Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'

class App extends Component {



	render() {
	return (
		<BrowserRouter>
			<Switch>

		<Route path="/sensores"   component={VisualizarSensores} />
		<Route path="/"  exact={true}  component={TelaPrincipal} />
		</Switch>


		</BrowserRouter>

	);
  }
}


export default App;
