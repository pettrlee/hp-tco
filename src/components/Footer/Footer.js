import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import './Footer.scss'

// image
import Back from './back.png';

const Footer = (props) => {
    return (
        <footer className="fixed-bottom">
            <Container>
                {props.selectActive &&
                    <Row>
                        <Button
                            variant="next"
                            size="lg"
                            disabled={props.FormCheck}
                            onClick={props.ToggleView} >
                            Next
                        </Button>
                    </Row>
                }

                {props.resultsActive &&
                    <Row>
                        <Button
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
                            size="lg">
                            Get Your PDF
                        </Button>
                    </Row>
                }

            </Container>
        </footer>
    );
}

export default Footer;