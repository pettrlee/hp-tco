import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.scss";

// IMAGES
import Printer from "./Printer.png";

const Home = () => {
    return (
        <div id="banner">
            <Container>
                <Row>
                    <Col
                        className="copy"
                        sm={6}
                        lg={{ span: 5, offset: 1 }} >
                        <h1>What am I likely paying for color pages?</h1>
                        <p>See how HP Pagewide delivers the lowest cost per color page.</p>
                        <Button
                            as={Link}
                            variant="calculate"
                            to="/select-device" >
                            Calculate Your PageWide Savings
                        </Button>
                    </Col>
                    <Col
                        xs={{ span: 8, offset: 2 }}
                        sm={{ span: 6, offset: 0 }} >
                        <Image
                            fluid
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