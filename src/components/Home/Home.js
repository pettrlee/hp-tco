import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";

// IMAGES
import Printer from "./Printer.png";

const Home = () => {
    return (
        <div id="banner">
            <Container>
                <Row>
                    <Col>
                        <h1>PETER WAS HERE</h1>
                    </Col>
                    <Col>
                        <img
                            width={486}
                            height={559}
                            src={Printer}
                            alt="Printer" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;