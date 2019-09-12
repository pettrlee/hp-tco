import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
			selectActive: true,
			resultsActive: false,
			btnDisabled: true,
			pagewideModel: "default",
			pagewideMoneyback: false,
			pagewideRecycle: false,
			competitiveBrand: "default",
			competitiveModel: "default",
			printPerMonth: 0,
			moneybacKToggle: false,
			recycleToggle: false
		};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.ToggleView = this.ToggleView.bind(this);
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
				this.state.competitiveModel !== "default") {
				this.handleValidForm(false);
			} else {
				this.handleValidForm(true);
			}
		});
	}

	handleValidForm = (bool) => {
		this.setState({
			btnDisabled: bool
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

	GetPDF = (e) => {
		if (!this.state.btnDisabled) {
			const hpModel = HP.brands[0].printers[this.state.pagewideModel].model;
			const hpModelSpeed = HP.brands[0].printers[this.state.pagewideModel].speed;
			const hpModelPages = HP.brands[0].printers[this.state.pagewideModel].data[this.state.printPerMonth].pages;

			const competitiveBrand = Competitive.brands[this.state.competitiveBrand].brand;
			const competitiveModel = Competitive.brands[this.state.competitiveBrand].printers[this.state.competitiveModel].model;
			const competitiveModelSpeed = Competitive.brands[this.state.competitiveBrand].printers[this.state.competitiveModel].speed;
			const competitiveModelPages = Competitive.brands[this.state.competitiveBrand].printers[this.state.competitiveModel].data[this.state.printPerMonth].pages;

			let filename = `HP-${hpModel}(${hpModelSpeed}ppm)-${hpModelPages}-pages__${competitiveBrand}-${competitiveModel}(${competitiveModelSpeed}ppm)-${competitiveModelPages}-pages.pdf`;

			html2canvas(document.querySelector('#results'), {
				logging: true,
				allowTaint: false,
				backgroundColor: "#ffffff",
				scale: 1,
				x: 0,
				y: 0,
				scrollX: 0,
				scrollY: 0
			}).then(function (canvas) {
				let pdf = new jsPDF('', 'mm', [canvas.width, canvas.height]);
				pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
				pdf.save(filename);
			});
		}
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
					GetPDF={this.GetPDF}
				/>
			</div>
		);
	}
}

export default App;
