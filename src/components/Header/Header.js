import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import "./Header.scss";

// IMAGES
import printerLogo from "./images/printer.png";
import resultLogo from "./images/result.png";

const Header = (props) => {
    return (
        <header>
            <Container>
                <Row>
                    <Col xs={12} md={6} className="brand">
                        <h1>
                            <Link to="/">A3 PageWide TCO Tool</Link>
                        </h1>
                    </Col>
                    <Col xs={6} sm={6} md={3} className="nav-item">
                        <Route
                            path="/select-device"
                            children={({ match }) => (
                                <>
                                    {match ?
                                        <span className="active">
                                            <img
                                                width={40}
                                                height={32}
                                                src={printerLogo}
                                                alt="Select Device" />
                                            Select Device
                                        </span>
                                        :
                                        <Button
                                            variant=""
                                            onClick={props.handleBack} >
                                            <img
                                                width={40}
                                                height={32}
                                                src={printerLogo}
                                                alt="Select Device" />
                                            Select Device
                                        </Button>
                                    }
                                </>
                            )}
                        />
                    </Col>
                    <Col xs={6} sm={6} md={3} className="nav-item">
                        <Route
                            path="/results"
                            children={({ match }) => (
                                <>
                                    {match ?
                                        <span className="active">
                                            <img
                                                width={40}
                                                height={37}
                                                src={resultLogo}
                                                alt="Results" />
                                            Results
                                        </span>
                                        :
                                        <>
                                            {props.isValidForm ?
                                                <Link to="/results">
                                                    <img
                                                        width={40}
                                                        height={37}
                                                        src={resultLogo}
                                                        alt="Results" />
                                                    Results
                                                </Link>
                                                :
                                                <span>
                                                    < img
                                                        width={40}
                                                        height={37}
                                                        src={resultLogo}
                                                        alt="Results" />
                                                    Results
                                                </span>
                                            }
                                        </>
                                    }
                                </>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;