import React, { Component } from 'react';
import HP from './data/hp.json';
import Competitive from './data/Competitive.json';
import SelectForm from './SelectForm/SelectForm';
import Results from './Results/Results';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showResults: false,
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
		this.ToggleView = this.ToggleView.bind(this);
	}

	handleCheckbox = (e) => {
		const value = e.target.checked ? true : false;
		const name = e.target.name;

		this.setState({
			[name]: value
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

	ToggleView = (e) => {
		const results = this.state.showResults ? false : true;
		const linkplacement = this.state.showResults ? "Results" : "Select Device";
		const linkID = e.target.name;

		window.dataLayer.push({
			'event': 'e_linkClick',
			'linkPlacement': linkplacement,
			'linkID': linkID
		});

		this.setState({
			...this.state,
			showResults: results
		})
	}

	render() {

		return (
			<div>
				{!this.state.showResults ?
					<SelectForm
						showResults={this.state.showResults}
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
						ToggleView={this.ToggleView}
					/>
					:
					<Results
						showResults={this.state.showResults}
						hpData={HP.brands}
						competitiveData={Competitive.brands}
						pagewideModel={this.state.pagewideModel}
						pagewideMoneyback={this.state.pagewideMoneyback}
						pagewideRecycle={this.state.pagewideRecycle}
						competitiveBrand={this.state.competitiveBrand}
						competitiveModel={this.state.competitiveModel}
						printPerMonth={this.state.printPerMonth}
						ToggleView={this.ToggleView}
					/>
				}
			</div>
		);
	}
}

export default App;
