import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './SelectForm.scss';

// IMAGES
import HPlogo from './logo.png';
// import ArrowDown from './arrowDown.png';

const SelectForm = (props) => {
    const HP = props.hpData;
    const Competitive = props.competitiveData;
    const Cpp = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000];

    return (
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
                    <Col sm="6">
                        <Form.Control
                            as="select"
                            name="pagewideModel"
                            value={props.pagewideModel}
                            onChange={props.inputChange} >
                            <option value="default">Select HP Pagewide</option>
                            {HP.map((value) =>
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
                    <Col sm="2">
                        <Form.Control
                            as="select"
                            name="printPerMonth"
                            value={props.printPerMonth}
                            onChange={props.inputChange} >
                            <option value="default" >0 pages</option>
                            {Cpp.map((value, index) =>
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
                                    onChange={props.checkboxChange} />
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
                                    onChange={props.checkboxChange} />
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
                    <Col sm="2">
                        <Form.Control
                            as="select"
                            name="competitiveBrand"
                            value={props.competitiveBrand}
                            onChange={props.inputChange} >
                            <option value="default" >Select</option>
                            {Competitive.map((value, index) =>
                                <option
                                    key={index}
                                    value={index}>
                                    {value.brand}
                                </option>
                            )}
                        </Form.Control>
                    </Col>
                    <Form.Label>Model</Form.Label>
                    <Col sm="3">
                        <Form.Control
                            as="select"
                            name="competitiveModel"
                            value={props.competitiveModel}
                            onChange={props.inputChange} >
                            <option value="default" >Model</option>
                            {props.competitiveBrand !== "default" &&
                                Competitive[props.competitiveBrand].printers.map((value, index) =>
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
                    <Col sm="2">
                        <Form.Control
                            as="select"
                            name="printPerMonth"
                            value={props.printPerMonth}
                            onChange={props.inputChange} >
                            <option value="default">0 pages</option>
                            {Cpp.map((value, index) =>
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
    );
}

export default SelectForm;