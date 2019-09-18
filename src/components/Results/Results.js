import React, { PureComponent } from "react";
import { Container, Row, Col, Image} from "react-bootstrap";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import BtnCollapse from "./BtnCollapse";
import "./Results.scss";

// image
import { ReactComponent as Star } from "./images/star.svg";
import { ReactComponent as Printer } from "./images/printer.svg";
import pagewideImage from "./images/pagewide.png"
import Canon from "./images/Canon.png";
import Xerox from "./images/Xerox.png";
import Ricoh from "./images/Ricoh.png";
import Konica from "./images/Konica.png";
import Toshiba from "./images/Toshiba.png";
import Sharp from "./images/Sharp.png";
import Kyocera from "./images/Kyocera.png";

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
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        const pagewide = `HP ${this.state.hpModel}(${this.state.hpModelSpeed}ppm) ${this.state.hpModelPages} pages`;
        const competitive = `${this.state.competitiveBrand} ${this.state.competitiveModel}(${this.state.competitiveModelSpeed}ppm) ${this.state.competitiveModelPages} pages`;

        const moneyback = this.props.pagewideMoneyback ? "120-Day “Love it or your Money Back”" : "";
        const recycle = this.props.pagewideRecycle ? "Recycle my old printer/copier" : "";

        // analytics data layer push
        window.dataLayer.push({
            event: "e_compareModels",
            concatProductIDs: `${pagewide} | ${competitive}`
        });

        window.dataLayer.push({
            event: "e_pageView",
            pageNameL5: "A3 PageWide TCO Tool",
            pageNameL6: "Results",
            pageNameL7: `Features: ${moneyback}${(moneyback && recycle) ? " | " : "" }${recycle}`,
            pageNameL8: "",
            loginStatus: true,
            pageBusinessUnit: ""
        });
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

        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 3
        })

        const Logo = () => {
            switch (competitiveBrand) {
                case "Canon":
                    return Canon;
                case "Xerox":
                    return Xerox;
                case "Ricoh":
                    return Ricoh;
                case "Konica Minolta":
                    return Konica;
                case "Toshiba":
                    return Toshiba;
                case "Sharp":
                    return Sharp;
                case "Kyocera":
                    return Kyocera;
                default:
                    return Canon;
            }
        }

        return (
            <div>
                <Header
                    pageName={props.pageName}
                    handleDataLayerPush={props.handleDataLayerPush}
                    handleBack={props.handleBack}
                />
                <div id="results">
                    <div id="my_mm" style={{ height: "100mm", display: "none" }}></div>
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
                                <p>{new Intl.NumberFormat("en-US", { currency: "USD" }).format(hpModelPages)} pages</p>
                            </Col>
                            <Col>
                                <p>{new Intl.NumberFormat("en-US", { currency: "USD" }).format(competitiveModelPages)} pages</p>
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
                                    <BtnCollapse
                                        pageName={props.pageName}
                                        handleDataLayerPush={props.handleDataLayerPush}
                                        icon={<Star />}
                                        value="moneybacKToggle"
                                        name="120-Day “Love it or your Money Back”"
                                        content={
                                            <>
                                                <p>Simply buy any qualifying HP PageWide Family printer and test it within your business. If you're not 100% convinced of the benefits, return the product to HP - within one hundred and twenty (120) days - for a full refund.* </p>
                                                <h5>How it works</h5>
                                                <p className="indentedList"><b>1. Purchase</b> a qualifying HP PageWide Family printer between November 01, 2018 and October 31, 2019.</p>
                                                <p className="indentedList"><b>2. Register</b> your HP PageWide Family printer. Registration of the new HP PageWide Family printer is required in order to participate and must be done within twenty-one (21) days of the purchase. Purchases and invoices dated prior to, or after this timeframe will not be eligible for this promotion.</p>
                                                <p className="indentedList"><b>3. Return</b> if you are not completely satisfied. Refer to your registration email and click on the link inside for a no hassle return. Apply to return the product within one hundred and twenty (120) calendar days after purchase date (not after registration date). You must ship the product back in the original packaging.</p>
                                            </>
                                        }
                                    />
                                }
                                {props.pagewideRecycle &&
                                    <BtnCollapse
                                        pageName={props.pageName}
                                        handleDataLayerPush={props.handleDataLayerPush}
                                        icon={<Printer />}
                                        value="recycleToggle"
                                        name="Recycle my old printer/copier"
                                        content={
                                            <>
                                                <p>Simply buy any qualifying HP PageWide Family printer and test it within your business. If you're not 100% convinced of the benefits, return the product to HP - within one hundred and twenty (120) days - for a full refund.* </p>
                                                <h5>How it works</h5>
                                                <p className="indentedList"><b>1. Purchase</b> a qualifying HP PageWide Family printer between November 01, 2018 and October 31, 2019.</p>
                                                <p className="indentedList"><b>2. Register</b> your HP PageWide Family printer. Registration of the new HP PageWide Family printer is required in order to participate and must be done within twenty-one (21) days of the purchase. Purchases and invoices dated prior to, or after this timeframe will not be eligible for this promotion.</p>
                                                <p className="indentedList"><b>3. Return</b> if you are not completely satisfied. Refer to your registration email and click on the link inside for a no hassle return. Apply to return the product within one hundred and twenty (120) calendar days after purchase date (not after registration date). You must ship the product back in the original packaging.</p>
                                            </>
                                        }
                                    />
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
                    pageName={props.pageName}
                    handleBack={props.handleBack}
                    handleDataLayerPush={props.handleDataLayerPush}
                    hpModel={hpModel}
                    hpModelSpeed={hpModelSpeed}
                    hpModelPages={hpModelPages}
                    competitiveBrand={competitiveBrand}
                    competitiveModel={competitiveModel}
                    competitiveModelSpeed={competitiveModelSpeed}
                    competitiveModelPages={competitiveModelPages}
                />
            </div>
        );
    }
}