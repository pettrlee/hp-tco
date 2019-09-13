import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Home from "./Home/Home";

class App extends Component {
	render() {
		return (
			<HashRouter>
				<Route exact path="/" component={Home} />
			</HashRouter>
		);
	}
}

export default App;