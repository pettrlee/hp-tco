import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './Results.scss'

// image
// import { ReactComponent as Plus } from './plus.svg';
// import { ReactComponent as Min } from './min.svg';
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

const Results = (props) => {

    const hpModel = props.hpData[0].printers[props.pagewideModel].model;
    const hpModelSpeed = props.hpData[0].printers[props.pagewideModel].speed;
    const hpModelPages = props.hpData[0].printers[props.pagewideModel].data[props.pagewidePrint].pages;
    const hpModelTco = Math.trunc(props.hpData[0].printers[props.pagewideModel].data[props.pagewidePrint].tco);
    const hpModelCpp = props.hpData[0].printers[props.pagewideModel].data[props.pagewidePrint].cpp;

    const competitiveBrand = props.competitiveData[props.competitiveBrand].brand;
    const competitiveModel = props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].model;
    const competitiveModelSpeed = props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].speed;
    const competitiveModelPages = props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.competitivePrint].pages;
    const competitiveModelTco = Math.trunc(props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.competitivePrint].tco);
    const competitiveModelCpp = props.competitiveData[props.competitiveBrand].printers[props.competitiveModel].data[props.competitivePrint].cpp;

    const fiveYearSaving = competitiveModelTco - hpModelTco;
    const annualSaving = fiveYearSaving / 5;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 3
    })

    const Logo = (props) => {
        if (competitiveBrand === "Canon") {
            return <img width={300} height={200} src={Canon} alt={props.alt} />;
        } else if (competitiveBrand === "Xerox") {
            return <img width={300} height={200} src={Xerox} alt={props.alt} />;
        } else if (competitiveBrand === "Ricoh") {
            return <img width={300} height={200} src={Ricoh} alt={props.alt} />;
        } else if (competitiveBrand === "Konica Minolta") {
            return <img width={300} height={200} src={Konica} alt={props.alt} />;
        } else if (competitiveBrand === "") {
            return <img width={300} height={200} src={Toshiba} alt={props.alt} />;
        } else if (competitiveBrand === "Sharp") {
            return <img width={300} height={200} src={Sharp} alt={props.alt} />;
        } else if (competitiveBrand === "Kyocera") {
            return <img width={300} height={200} src={Kyocera} alt={props.alt} />;
        }
    }

    return (
        <div>
            <Container className="apc">
                <Row>
                    <h2>Annual Printing Cost</h2>
                </Row>
                <Row>
                    <Col sm="6">
                        <Row className="flex">
                            <Col sm="6" className="infograph">
                                <div className="hp">
                                    <span>{formatter.format(hpModelTco)}</span>
                                    <div className="graph"></div>
                                    <p>HP PageWide</p>
                                </div>
                                <div className="competitive">
                                    <span>{formatter.format(competitiveModelTco)}</span>
                                    <div className="graph"></div>
                                    <p>{competitiveBrand}</p>
                                </div>
                            </Col>
                            <Col sm="6" className="info">
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
                    <Col sm="6">
                        <Row className="estimate">
                            <Col sm="12" className="head">
                                <h3>Estimate Printing Cost Over 5 Years</h3>
                            </Col>
                            <Col sm="12" className="product">
                                <p>HP {hpModel} ({hpModelSpeed}ppm)</p>
                                <span>{formatter.format(competitiveModelTco)}</span>
                            </Col>
                            <Col sm="12" className="product">
                                <p>{competitiveBrand} {competitiveModel} ({competitiveModelSpeed}ppm)</p>
                                <span>{formatter.format(competitiveModelTco)}</span>
                            </Col>
                            <Col sm="12" className="saving">
                                <p>Estimated Savings with HP Pagewide</p>
                                <span>{formatter.format(fiveYearSaving)}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container className="compare">
                <Row>
                    <h2>Comparision</h2>
                </Row>
                <Row>
                    <Table bordered responsive="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th align="center">
                                    <img
                                        width={217}
                                        height={266}
                                        src={pagewideImage}
                                        alt={"HP " + hpModel + " (" + hpModelSpeed + "ppm)"} />
                                    <h3>HP {hpModel} <small>({hpModelSpeed}ppm)</small></h3>
                                </th>
                                <th>
                                    <Logo
                                        alt={competitiveBrand + " " + competitiveModel + " (" + competitiveModelSpeed + "ppm)"}
                                    />
                                    <h3>{competitiveBrand} {competitiveModel} <small>({competitiveModelSpeed}ppm)</small></h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3"><h4>Specification <small>(based model)</small></h4></td>
                            </tr>
                            <tr>
                                <td><p>Print Speed</p></td>
                                <td><p>{hpModelSpeed} ppm</p></td>
                                <td><p>{competitiveModelSpeed} ppm</p></td>
                            </tr>
                            <tr>
                                <td><p>Prints per month<sup>1</sup></p></td>
                                <td><p>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(hpModelPages)} pages</p></td>
                                <td><p>{new Intl.NumberFormat('en-US', { currency: 'USD' }).format(competitiveModelPages)} pages</p></td>
                            </tr>
                            <tr>
                                <td><p>Cost per Page<sup>2</sup></p></td>
                                <td><p>${hpModelCpp}</p></td>
                                <td><p>${competitiveModelCpp}</p></td>
                            </tr>
                            <tr>
                                <td colSpan="3"><h4>Complimentary Features</h4></td>
                            </tr>
                            <tr>
                                <td><p>Program</p></td>
                                <td>
                                    {props.pagewideMoneyback &&
                                        <div className="program">
                                            <div className="cta">
                                                <Star />
                                                <p>120-Day “Love it or your Money Back”</p>
                                                <Button
                                                    variant="trigger"
                                                    className={props.moneybacKToggle ? "collapsed" : ""}
                                                    name="moneybacKToggle"
                                                    value={props.moneybacKToggle}
                                                    onClick={props.collapseToggle}>
                                                    <span></span><span></span>
                                                </Button>
                                        </div>
                                        <div className={"content" + (props.moneybacKToggle ? " collapsed" : "")}>
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

                                    {props.pagewideRecycle &&
                                        <div className="program">
                                            <div className="cta">
                                                <Printer />
                                                <p>Recycle my old printer/copier</p>
                                                <Button
                                                    variant="trigger"
                                                    className={props.recycleToggle ? "collapsed" : ""}
                                                    name="recycleToggle"
                                                    value={props.recycleToggle}
                                                    onClick={props.collapseToggle} >
                                                    <span></span><span></span>
                                                </Button>
                                            </div>
                                        <div className={"content" + (props.recycleToggle ? " collapsed" : "")}>
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
                                </td>
                                <td><p className="none">None</p></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div className="info">
                                        <span>Saving</span>
                                        <p>{formatter.format(fiveYearSaving)}</p>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
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
    );
}

export default Results;