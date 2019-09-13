import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./Footer.scss"

// image
import Back from "./back.png";

const Footer = (props) => {
    return (
        <footer>
            <div className="brdr"></div>
            <Container>
                {!props.showResults ?
                    <Row>
                        <Button
                            name="Next"
                            variant="next"
                            size="lg"
                            disabled={props.isValidForm ? false : true}
                            onClick={props.ToggleView} >
                            Next
                        </Button>
                    </Row>
                    :
                    <Row>
                        <Button
                            name="Previous"
                            variant="prev"
                            size="lg"
                            onClick={props.ToggleView} >
                            <img
                                width={8}
                                height={14}
                                src={Back}
                                alt="Previous" />
                            Previous
                        </Button>
                        <Button
                            variant="pdf"
                            size="lg"
                            onClick={props.GetPDF} >
                            Get Your PDF
                        </Button>
                    </Row>
                }
            </Container>
        </footer>
    );
}

export default Footer;