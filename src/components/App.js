import React, { Component } from 'react';
import Header from './Header/Header';
import HP from './data/hp.json';
import Competitive from './data/Competitive.json';
import SelectForm from './SelectForm/SelectForm';
import Results from './Results/Results';
import Footer from './Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectActive: false,
			resultsActive: true,
			btnDisabled: true,
			pagewideModel: "1",
			pagewideMoneyback: false,
			pagewideRecycle: false,
			competitiveBrand: "1",
			competitiveModel: "1",
			printPerMonth: "1",
			moneybacKToggle: false,
			recycleToggle: false
		};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.collapseToggle = this.collapseToggle.bind(this);
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
		})

		this.setState({
			[name]: value
		}, function () {
			if (this.state.pagewideModel !== "default" &&
				this.state.competitiveBrand !== "default" &&
				this.state.competitiveModel !== "default" &&
				this.state.printPerMonth !== "default") {
				this.handleValidForm();
			}
		});
	}

	handleValidForm = () => {
		this.setState({
			btnDisabled: false
		})
	}

	ToggleView = () => {
		const select = this.state.selectActive ? false : true;
		const results = this.state.resultsActive ? false : true;

		this.setState({
			...this.state,
			selectActive: select,
			resultsActive: results
		})
	}

	collapseToggle = (e) => {
		const name = e.target.name;
		const value = this.state[name] ? false : true;

		this.setState({
			[name]: value
		})
	}

	render() {

		return (
			<div>
				<Header
					selectActive={this.state.selectActive}
					resultsActive={this.state.resultsActive}
				/>

				{this.state.selectActive &&
					<SelectForm
						hpData={HP.brands}
						competitiveData={Competitive.brands}
						inputChange={this.handleInputChange}
						checkboxChange={this.handleCheckbox}
						pagewideModel={this.state.pagewideModel}
						pagewideMoneyback={this.statepagewideMoneyback}
						pagewideRecycle={this.state.pagewideRecycle}
						competitiveBrand={this.state.competitiveBrand}
						competitiveModel={this.state.competitiveModel}
						printPerMonth={this.state.printPerMonth}
					/>
				}

				{this.state.resultsActive &&
					<Results
						hpData={HP.brands}
						competitiveData={Competitive.brands}
						pagewideModel={this.state.pagewideModel}
						pagewideMoneyback={this.state.pagewideMoneyback}
						pagewideRecycle={this.state.pagewideRecycle}
						competitiveBrand={this.state.competitiveBrand}
						competitiveModel={this.state.competitiveModel}
						printPerMonth={this.state.printPerMonth}
						moneybacKToggle={this.state.moneybacKToggle}
						recycleToggle={this.state.recycleToggle}
						collapseToggle={this.collapseToggle}
					/>
				}

				<Footer
					selectActive={this.state.selectActive}
					resultsActive={this.state.resultsActive}
					FormCheck={this.state.btnDisabled}
					ToggleView={this.ToggleView}
				/>
			</div>
		);
	}
}

export default App;
