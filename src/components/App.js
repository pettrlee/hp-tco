import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import HP from "./data/hp.json";
import Competitive from "./data/Competitive.json";
import Home from "./Home/Home";
import SelectDevice from "./SelectDevice/SelectDevice";
import Results from "./Results/Results";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidForm: false,
			pagewideModel: "default",
			competitiveBrand: "default",
			competitiveModel: "default",
			pagewideMoneyback: false,
			pagewideRecycle: false,
			printPerMonth: 0
		};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleCheckbox = (e) => {
		const name = e.target.name;

		this.setState({
			[name]: !this.state[name]
		})
	}

	handleInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		this.setState({
			[name]: value
		}, function () {
			if (this.state.pagewideModel !== "default" &&
				this.state.competitiveBrand !== "default" &&
				this.state.competitiveModel !== "default") {
				this.handleValidForm(true);
			} else {
				this.handleValidForm(false);
			}
		});
	}

	handleValidForm = (bool) => {
		this.setState({
			isValidForm: bool
		})
	}

	handleBack = () => {
		window.history.back();
	}

	handleDataLayerPush = (e) => {
		const linkid = e.currentTarget.dataset.linkid;
		const linkplacement = e.currentTarget.dataset.linkplacement;

		window.dataLayer.push({
			event: "e_linkClick",
			linkPlacement: linkplacement,
			linkID: linkid
		});
	}

	render() {
		return (
			<HashRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) =>
							<Home {...props}
								handleDataLayerPush={this.handleDataLayerPush}
							/>}
					 />
					<Route
						exact
						path="/select-device"
						render={(props) =>
							<SelectDevice {...props}
								pageName="Select Device"
								hpData={HP.brands}
								competitiveData={Competitive.brands}
								inputChange={this.handleInputChange}
								handleCheckbox={this.handleCheckbox}
								pagewideModel={this.state.pagewideModel}
								pagewideMoneyback={this.state.pagewideMoneyback}
								pagewideRecycle={this.state.pagewideRecycle}
								competitiveBrand={this.state.competitiveBrand}
								competitiveModel={this.state.competitiveModel}
								printPerMonth={this.state.printPerMonth}
								isValidForm={this.state.isValidForm}
								handleDataLayerPush={this.handleDataLayerPush}
							/>}
					/>
					<Route
						path="/results"
						render={(props) => (this.state.isValidForm ?
							<Results {...props}
								pageName="Results"
								hpData={HP.brands}
								competitiveData={Competitive.brands}
								pagewideModel={this.state.pagewideModel}
								pagewideMoneyback={this.state.pagewideMoneyback}
								pagewideRecycle={this.state.pagewideRecycle}
								competitiveBrand={this.state.competitiveBrand}
								competitiveModel={this.state.competitiveModel}
								printPerMonth={this.state.printPerMonth}
								handleBack={this.handleBack}
								handleDataLayerPush={this.handleDataLayerPush}
							/>
							:
							<Redirect to="/select-device" />
						)}
					/>
				</Switch>
			</HashRouter>
		);
	}
}