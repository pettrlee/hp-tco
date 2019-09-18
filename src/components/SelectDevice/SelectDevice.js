import React, { PureComponent } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./SelectDevice.scss";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import FormControl from "./FormControl"
import FormCheck from "./FormCheck"

// IMAGES
import HPlogo from "./images/logo.png";

export default class SelectDevice extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            HP: props.hpData,
            Competitive: props.competitiveData,
            Cpp: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000]
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // analytics data layer push
        window.dataLayer.push({
            event: "e_pageView",
            pageNameL5: "A3 PageWide TCO Tool",
            pageNameL6: "Select Device",
            pageNameL7: "",
            pageNameL8: "",
            loginStatus: true,
            pageBusinessUnit: ""
        });
    }

    render() {
        const props = this.props
        return (
            <div>
                <Header
                    pageName={props.pageName}
                    handleDataLayerPush={props.handleDataLayerPush}
                    isValidForm={props.isValidForm}
                    handleBack={props.handleBack}
                />
                <Form id="tcoTool">
                    <Container className="pagewide">
                        <Row className="title">
                            <h2>
                                <img
                                    width={50}
                                    height={50}
                                    src={HPlogo}
                                    alt="hp" />
                                See how HP PageWide delivers the lowest cost per color page
                            </h2>
                        </Row>
                        <Row className="sub-title">
                            <h3>HP PageWide</h3>
                        </Row>
                        <Form.Group as={Row}>
                            <FormControl
                                label="Model"
                                size={6}
                                inputChange={props.inputChange}
                                name="pagewideModel"
                                value={props.pagewideModel}
                                default="Select HP Pagewide"
                                dropdown={this.state.HP[0].printers.map((value, index) =>
                                    <option
                                        key={index}
                                        value={index}>
                                        {value.model} ({value.speed}ppm)
                                    </option>
                                )}
                            />
                            <FormControl
                                label={<>Print per <br />month</>}
                                size={2}
                                inputChange={props.inputChange}
                                name="printPerMonth"
                                value={props.printPerMonth}
                                dropdown={this.state.Cpp.map((value, index) =>
                                    <option
                                        key={index}
                                        value={index}>
                                        {value} pages
                                        </option>
                                )}
                            />
                        </Form.Group>
                        <Row className="sub-title">
                            <h3>Complimentary Features</h3>
                        </Row>
                        <Form.Group as={Row}>
                            <Col>
                                <h4>PROGRAM</h4>
                                <FormCheck
                                    label={<><b>Yes!</b> 120-Day “Love it or your Money Back”</>}
                                    name="pagewideMoneyback"
                                    pagewideMoneyback={props.pagewideMoneyback}
                                    handleCheckbox={props.handleCheckbox}
                                />
                                <FormCheck
                                    label={<><b>Yes!</b> Recycle my old printer/copier</>}
                                    name="pagewideRecycle"
                                    pagewideMoneyback={props.pagewideRecycle}
                                    handleCheckbox={props.handleCheckbox}
                                />
                            </Col>
                        </Form.Group>
                    </Container>
                    <Container className="competitive">
                        <Row className="title">
                            <h2>What am I likely paying for color pages?</h2>
                        </Row>
                        <Row className="sub-title">
                            <h3>Select Competitive Device</h3>
                        </Row>
                        <Form.Group as={Row}>
                            <FormControl
                                label="Brand"
                                size={2}
                                inputChange={props.inputChange}
                                name="competitiveBrand"
                                value={props.competitiveBrand}
                                default="Select"
                                dropdown={this.state.Competitive.map((value, index) =>
                                    <option
                                        key={index}
                                        value={index}>
                                        {value.brand}
                                    </option>
                                )}
                            />
                            <FormControl
                                label="Model"
                                size={4}
                                inputChange={props.inputChange}
                                name="competitiveModel"
                                value={props.competitiveModel}
                                default="Model"
                                dropdown={props.competitiveBrand !== "default" &&
                                    this.state.Competitive[props.competitiveBrand].printers.map((value, index) =>
                                        <option
                                            key={index}
                                            value={index}>
                                            {value.model} ({value.speed}ppm)
                                            </option>
                                    )
                                }
                            />
                            <FormControl
                                label={<>Print per <br />month</>}
                                size={2}
                                inputChange={props.inputChange}
                                disable={true}
                                name="printPerMonth"
                                value={props.printPerMonth}
                                dropdown={this.state.Cpp.map((value, index) =>
                                    <option
                                        key={index}
                                        value={index}>
                                        {value} pages
                                        </option>
                                )}
                            />
                        </Form.Group>
                    </Container>
                </Form>
                <Footer
                    pageName={props.pageName}
                    handleDataLayerPush={props.handleDataLayerPush}
                    isValidForm={props.isValidForm}
                />
            </div>
        );
    }
}