import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Home from "./Home";
import Select from "./Select";

class App extends Component {
	render() {
		return (
			<HashRouter>
				<Route exact path="/" component={Home} />
				<Route path="/select" component={Select} />
			</HashRouter>
		);
	}
}

export default App;