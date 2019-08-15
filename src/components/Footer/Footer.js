import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="fixed-bottom">
            <Container>
                <Button
                    variant="prev"
                    size="lg"
                >
                    Previous
                </Button>
                <Button
                    variant="next"
                    size="lg"
                    disabled
                >
                    Next
                </Button>
                <Button
                    variant="pdf"
                    size="lg"
                >
                    Get Your PDF
                </Button>
            </Container>
        </footer>
    );
}

export default Footer;