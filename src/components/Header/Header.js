import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Header.scss';

// IMAGES
import printerLogo from './printer.png';
import resultLogo from './result.png';

const Header = () => {
    return (
        <header>
            <Container>
                <Row>
                    <Col xs={12} sm={6} className="brand">
                        <h1>A3 PageWide TCO Tool</h1>
                    </Col>
                    <Col xs={6} sm={3} className="nav-item active">
                        <img
                            width={40}
                            height={32}
                            src={printerLogo}
                            alt="Select Device"
                        />
                        Select Device
                    </Col>
                    <Col xs={6} sm={3} className="nav-item">
                        <img
                            width={40}
                            height={37}
                            src={resultLogo}
                            alt="Results"
                        />
                        Results
                    </Col>

                </Row>
            </Container>
        </header>
    );
}

export default Header;