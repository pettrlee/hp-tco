import React, { PureComponent } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Results.scss'
import Header from '../Header/Header';
import Footer from './../Footer/Footer';

// image
import { ReactComponent as Star } from './star.svg';
import { ReactComponent as Printer } from './printer.svg';
import pagewideImage from './pagewide.png'
import Canon from './Canon.png';
import Xerox from './Xerox.png';
import Ricoh from './Ricoh.png';
import Konica from './Konica.png';
import Toshiba from './Toshiba.png';
import Sharp from './Sharp.png';
import Kyocera from './Kyocera.png';

export default class Results extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hpModel: props.hpData[0].printers[props.pagewideModel].model,
            hpModelSpeed: props.hpData[0].printers[props.pagewideModel].speed,
            hpModelPages: props.hpData[0].printers[props.pagewideModel].data[props.printPerMonth].pages,

            competitiveBrand: props.competitiveData[props.competitiveBrand].brand,
            competitiveModel: props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].model,
            competitiveModelSpeed: props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].speed,
            competitiveModelPages: props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.printPerMonth].pages,

            moneybacKToggle: false,
            recycleToggle: false
        };
    }

    collapseToggle = (e) => {
        const name = e.target.name;
        const value = this.state[name] === "collapsed" ? "" : "collapsed";

        if (this.state[name]) {
            window.dataLayer.push({
                'event': 'e_linkClick',
                'linkPlacement': value,
                'linkID': "Expanded"
            });
        }
        this.setState({
            [name]: value
        })
    }

    GetPDF = (e) => {
        const linkplacement = this.props.showResults ? "Results" : "Select Device";
        const linkID = e.target.name;

        window.dataLayer.push({
            'event': 'e_linkClick',
            'linkPlacement': linkplacement,
            'linkID': linkID
        });

        const filename = `HP-${this.state.hpModel}(${this.state.hpModelSpeed}ppm)-${this.state.hpModelPages}-pages__${this.state.competitiveBrand}-${this.state.competitiveModel}(${this.state.competitiveModelSpeed}ppm)-${this.state.competitiveModelPages}-pages.pdf`;

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
            pdf.addImage(canvas.toDataURL('image/'), 'PNG', 0, 0);
            pdf.save(filename);
        });
    }

    componentDidMount() {
        // analytics data layer push
        window.dataLayer.push({
            event: 'e_pageView',
            pageNameL5: 'A3 PageWide TCO Tool',
            pageNameL6: 'Results',
            pageNameL7: `Features: ${this.props.pagewideMoneyback && "120-Day “Love it or your Money Back”"} | ${this.props.pagewideRecycle && "Recycle my old printer/copier"}`,
            pageNameL8: '',
            loginStatus: true,
            pageBusinessUnit: ''
        });

        window.dataLayer.push({
            event: 'e_compareModels',
            concatProductIDs: `HP ${this.state.hpModel}(${this.state.hpModelSpeed}ppm) ${this.state.hpModelPages} pages | ${this.state.competitiveBrand} ${this.state.competitiveModel}(${this.state.competitiveModelSpeed}ppm) ${this.state.competitiveModelPages} pages`
        });

    }

    componentWillUnmount() {
        window.scrollTo(0, 0)
    }

    render() {
        const props = this.props

        const hpModel = this.state.hpModel;
        const hpModelSpeed = this.state.hpModelSpeed;
        const hpModelPages = this.state.hpModelPages;
        const hpModelTco = Math.trunc(props.hpData[0].printers[props.pagewideModel].data[props.printPerMonth].tco);
        const hpModelTcoAnnual = hpModelTco / 5;
        const hpModelCpp = props.hpData[0].printers[props.pagewideModel].data[props.printPerMonth].cpp;

        const competitiveBrand = this.state.competitiveBrand;
        const competitiveModel = this.state.competitiveModel;
        const competitiveModelSpeed = this.state.competitiveModelSpeed;
        const competitiveModelPages = this.state.competitiveModelPages;
        const competitiveModelTco = Math.trunc(props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.printPerMonth].tco);
        const competitiveModelTcoAnnual = competitiveModelTco / 5;
        const competitiveModelCpp = props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.printPerMonth].cpp;

        const fiveYearSaving = competitiveModelTco - hpModelTco;
        const annualSaving = fiveYearSaving / 5;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 3
        })

        const Logo = () => {
            if (competitiveBrand === "Canon") {
                return Canon;
            } else if (competitiveBrand === "Xerox") {
                return Xerox;
            } else if (competitiveBrand === "Ricoh") {
                return Ricoh;
            } else if (competitiveBrand === "Konica Minolta") {
                return Konica;
            } else if (competitiveBrand === "Toshiba") {
                return Toshiba;
            } else if (competitiveBrand === "Sharp") {
                return Sharp;
            } else if (competitiveBrand === "Kyocera") {
                return Kyocera;
            }
        }

        return (
            <div>
                <Header
                    showResults={props.showResults}
                />
                <div id="results">
                    <div id="my_mm" style={{height: "100mm", display: "none"}}></div>
                    <Container className="apc">
                        <Row>
                            <h2>Annual Printing Cost</h2>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Row className="flex">
                                    <Col lg={6} className="infograph">
                                        <div className="hp">
                                            <span>{formatter.format(hpModelTcoAnnual)}</span>
                                            <div className={"graph" + (hpModelTcoAnnual > competitiveModelTcoAnnual ? " high" : " low")}></div>
                                            <p>HP PageWide</p>
                                        </div>
                                        <div className="competitive">
                                            <span>{formatter.format(competitiveModelTcoAnnual)}</span>
                                            <div className={"graph" + (competitiveModelTcoAnnual > hpModelTcoAnnual ? " high" : " low")}></div>
                                            <p>{competitiveBrand}</p>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="info">
                                        <div className="content">
                                            <p>{formatter.format(annualSaving)}</p>
                                            <span>Annual Estimated Savings</span>
                                        </div>
                                        <div className="content">
                                            <p>{formatter.format(fiveYearSaving)}</p>
                                            <span>5 Year Estimated Savings</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="estimate">
                                    <Col sm={12} className="head">
                                        <h3>Estimate Printing Cost Over 5 Years</h3>
                                    </Col>
                                    <Col sm={12} className="product">
                                        <p>HP {hpModel} ({hpModelSpeed}ppm)</p>
                                        <span>{formatter.format(hpModelTco)}</span>
                                    </Col>
                                    <Col sm={12} className="product">
                                        <p>{competitiveBrand} {competitiveModel} ({competitiveModelSpeed}ppm)</p>
                                        <span>{formatter.format(competitiveModelTco)}</span>
                                    </Col>
                                    <Col sm={12} className="saving">
                                        <p>Estimated Savings with HP Pagewide</p>
                                        <span>{formatter.format(fiveYearSaving)}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="compare-title">
                        <Row>
                            <Col>
                                <h2>Comparision</h2>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="compare">
                        <Row className="compare-head">
                            <Col />
                            <Col>
                                <Image
                                    fluid
                                    width={217}
                                    height={266}
                                    src={pagewideImage}
                                    alt={`HP ${hpModel} (${hpModelSpeed}ppm)`} />
                                <h3>HP {hpModel} <small>({hpModelSpeed}ppm)</small></h3>
                            </Col>
                            <Col>
                                <Image
                                    fluid
                                    width={300}
                                    height={200}
                                    src={Logo()}
                                    alt={`${competitiveBrand} ${competitiveModel} (${competitiveModelSpeed}ppm)`} />
                                <h3>{competitiveBrand} {competitiveModel} <small>({competitiveModelSpeed}ppm)</small></h3>
                            </Col>
                        </Row>
                        <Row className="compare-body">
                            <Col>
                                <h4>Specification <small>(based model)</small></h4>
                            </Col>
                        </Row>
                        <Row className="compare-body">
                            <Col>
                                <p>Print Speed</p>
                            </Col>
                            <Col>
                                <p>{hpModelSpeed} ppm</p>
                            </Col>
                            <Col>
                                <p>{competitiveModelSpeed} ppm</p>
                            </Col>
                        </Row>
                        <Row className="compare-body">
                            <Col>
                                <p>Prints per month<sup>1</sup></p>
                            </Col>
                            <Col>
                                <p>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(hpModelPages)} pages</p>
                            </Col>
                            <Col>
                                <p>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(competitiveModelPages)} pages</p>
                            </Col>
                        </Row>
                        <Row className="compare-body">
                            <Col>
                                <p>Cost per Page<sup>2</sup></p>
                            </Col>
                            <Col>
                                <p>${hpModelCpp}</p>
                            </Col>
                            <Col>
                                <p>${competitiveModelCpp}</p>
                            </Col>
                        </Row>
                        <Row className="compare-body" data-html2canvas-ignore>
                            <Col>
                                <h4>Complimentary Features</h4>
                            </Col>
                        </Row>
                        <Row className="compare-body" data-html2canvas-ignore>
                            <Col>
                                <p>Program</p>
                            </Col>
                            <Col>
                                {props.pagewideMoneyback &&
                                    <div>
                                        <div className="program" >
                                            <div className="cta">
                                                <Star />
                                                <p>120-Day “Love it or your Money Back”</p>
                                                <Button
                                                    variant="trigger"
                                                    className={this.state.moneybacKToggle}
                                                    name="moneybacKToggle"
                                                    value="120-Day “Love it or your Money Back”"
                                                    onClick={this.collapseToggle} >
                                                    <span></span><span></span>
                                                </Button>
                                            </div>
                                            <div className={`content ${this.state.moneybacKToggle}`}>
                                                <p>Simply buy any qualifying HP PageWide Family printer and test it within your business. If you're not 100% convinced of the benefits, return the product to HP - within one hundred and twenty (120) days - for a full refund.* </p>
                                                <h5>How it works</h5>
                                                <p className="indentedList"><b>1. Purchase</b> a qualifying HP PageWide Family printer between November 01, 2018 and October 31, 2019.</p>
                                                <p className="indentedList"><b>2. Register</b> your HP PageWide Family printer. Registration of the new HP PageWide Family printer is required in order to participate and must be done within twenty-one (21) days of the purchase. Purchases and invoices dated prior to, or after this timeframe will not be eligible for this promotion.</p>
                                                <p className="indentedList"><b>3. Return</b> if you are not completely satisfied. Refer to your registration email and click on the link inside for a no hassle return. Apply to return the product within one hundred and twenty (120) calendar days after purchase date (not after registration date). You must ship the product back in the original packaging.</p>
                                                <Button
                                                    variant="detail">
                                                    FULL DETAILS
                                                </Button>
                                            </div>
                                        </div>

                                        <Button
                                            variant="program">
                                            <div
                                                className="cta" >
                                                <Star />
                                                <p>120-Day “Love it or your Money Back”</p>
                                            </div>
                                        </Button>
                                    </div>
                                }

                                {props.pagewideRecycle &&
                                    <div className="program">
                                        <div className="cta">
                                            <Printer />
                                            <p>Recycle my old printer/copier</p>
                                            <Button
                                                variant="trigger"
                                                className={this.state.recycleToggle}
                                                name="recycleToggle"
                                                value="Recycle my old printer/copier"
                                                onClick={this.collapseToggle} >
                                                <span></span><span></span>
                                            </Button>
                                        </div>
                                        <div className={`content ${this.state.recycleToggle}`}>
                                            <p>Simply buy any qualifying HP PageWide Family printer and test it within your business. If you're not 100% convinced of the benefits, return the product to HP - within one hundred and twenty (120) days - for a full refund.* </p>
                                            <h5>How it works</h5>
                                            <p className="indentedList"><b>1. Purchase</b> a qualifying HP PageWide Family printer between November 01, 2018 and October 31, 2019.</p>
                                            <p className="indentedList"><b>2. Register</b> your HP PageWide Family printer. Registration of the new HP PageWide Family printer is required in order to participate and must be done within twenty-one (21) days of the purchase. Purchases and invoices dated prior to, or after this timeframe will not be eligible for this promotion.</p>
                                            <p className="indentedList"><b>3. Return</b> if you are not completely satisfied. Refer to your registration email and click on the link inside for a no hassle return. Apply to return the product within one hundred and twenty (120) calendar days after purchase date (not after registration date). You must ship the product back in the original packaging.</p>
                                            <Button
                                                variant="detail">
                                                FULL DETAILS
                                        </Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col>
                                <p className="none">None</p>
                            </Col>
                        </Row>
                        <Row className="compare-body">
                            <Col />
                            <Col>
                                <div className="info">
                                    <span>Saving</span>
                                    <p>{formatter.format(fiveYearSaving)}</p>
                                </div>
                            </Col>
                            <Col />
                        </Row>
                    </Container>

                    <Container className="discalimer">
                        <Row>
                            <Col sm={10} className="copy">
                                <p>* Estimated retail prices. Actual prices will vary. The specifications and features shown are for product comparison purposes only. For a complete description of product features, specifications, and accompanying disclaimers, please click the "Learn more" link for each product.</p>
                                <p>1. Page attributes applied in this comparison the following industry standards:
                                    <span>1) Page mix is 80% color and 20% black and white.</span>
                                    <span>2) Color page area coverage is 20%, 5% each of cyan, magenta, yellow, and black.</span>
                                    <span>3) Black and white page coverage is 5%, and is true black, not process black.</span>
                                </p>
                                <p>2. This report is provided for comparison purposes only. The information contained is based on third-party research, manufacturers’ published specifications, and proprietary HP algorithms. Total Cost includes base equipment, break-fix service, supplies (ink or toner) and other consumables (developer, photo receptors, waste containers, etc.), and electrical power consumption.  Prices shown are estimated U.S. street prices, Actual prices may vary."</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer
                    showResults={props.showResults}
                    ToggleView={props.ToggleView}
                    GetPDF={this.GetPDF}
                />
            </div>
        );
    }
}