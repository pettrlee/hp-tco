import React, { PureComponent } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./SelectForm.scss";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

// IMAGES
import HPlogo from "./logo.png";

export default class SelectForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            HP: props.hpData,
            Competitive: props.competitiveData,
            Cpp: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000]
        };
    }

    componentDidMount() {
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

    componentWillUnmount() {
        window.scrollTo(0, 0)
    }

    render() {
        const props = this.props
        return (
            <div>
                <Header
                    showResults={props.showResults}
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
                            <Form.Label>Model</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    as="select"
                                    name="pagewideModel"
                                    value={props.pagewideModel}
                                    onChange={props.inputChange} >
                                    <option value="default">Select HP Pagewide</option>
                                    {this.state.HP.map((value) =>
                                        value.printers.map((value, index) =>
                                            <option
                                                key={index}
                                                value={index}>
                                                {value.model} ({value.speed}ppm)
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Col>
                            <Form.Label>Print per <br />month</Form.Label>
                            <Col md={2}>
                                <Form.Control
                                    as="select"
                                    name="printPerMonth"
                                    value={props.printPerMonth}
                                    onChange={props.inputChange} >
                                    {this.state.Cpp.map((value, index) =>
                                        <option
                                            key={index}
                                            value={index}>
                                            {value} pages
                                        </option>
                                    )}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Row className="sub-title">
                            <h3>Complimentary Features</h3>
                        </Row>
                        <Form.Group as={Row}>
                            <Col>
                                <h4>PROGRAM</h4>
                                <Form.Check inline>
                                    <Form.Check.Label>
                                        <Form.Check.Input
                                            type="checkbox"
                                            name="pagewideMoneyback"
                                            checked={props.pagewideMoneyback}
                                            onChange={props.handleCheckbox} />
                                        <span className="checkbox"></span>
                                        <b>Yes!</b> 120-Day “Love it or your Money Back”
                            </Form.Check.Label>
                                </Form.Check>
                                <Form.Check inline>
                                    <Form.Check.Label>
                                        <Form.Check.Input
                                            type="checkbox"
                                            name="pagewideRecycle"
                                            checked={props.pagewideRecycle}
                                            onChange={props.handleCheckbox} />
                                        <span className="checkbox"></span>
                                        <b>Yes!</b> Recycle my old printer/copier
                            </Form.Check.Label>
                                </Form.Check>
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
                            <Form.Label>Brand</Form.Label>
                            <Col md={2}>
                                <Form.Control
                                    as="select"
                                    name="competitiveBrand"
                                    value={props.competitiveBrand}
                                    onChange={props.inputChange} >
                                    <option value="default" >Select</option>
                                    {this.state.Competitive.map((value, index) =>
                                        <option
                                            key={index}
                                            value={index}>
                                            {value.brand}
                                        </option>
                                    )}
                                </Form.Control>
                            </Col>
                            <Form.Label>Model</Form.Label>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    name="competitiveModel"
                                    value={props.competitiveModel}
                                    onChange={props.inputChange} >
                                    <option value="default" >Model</option>
                                    {props.competitiveBrand !== "default" &&
                                        this.state.Competitive[props.competitiveBrand].printers.map((value, index) =>
                                            <option
                                                key={index}
                                                value={index}>
                                                {value.model} ({value.speed}ppm)
                                            </option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                            <Form.Label>Print per <br />month</Form.Label>
                            <Col md={2}>
                                <Form.Control
                                    as="select"
                                    name="printPerMonth"
                                    value={props.printPerMonth}
                                    onChange={props.inputChange}
                                    disabled={true} >
                                    {this.state.Cpp.map((value, index) =>
                                        <option
                                            key={index}
                                            value={index}>
                                            {value} pages
                                        </option>
                                    )}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Container>
                </Form>
                <Footer
                    showResults={props.showResults}
                    isValidForm={props.isValidForm}
                    ToggleView={props.ToggleView}
                />
            </div>
        );
    }
}