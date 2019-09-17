import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Footer.scss"

// image
import Back from "./back.png";

const Footer = (props) => {

    const GetPDF = (e) => {
        window.dataLayer.push({
            event: "e_linkClick",
            linkPlacement: "Results",
            linkID: "Get Your PDF"
        });

        const filename = `HP-${props.hpModel}(${props.hpModelSpeed}ppm)-${props.hpModelPages}-pages__${props.competitiveBrand}-${props.competitiveModel}(${props.competitiveModelSpeed}ppm)-${props.competitiveModelPages}-pages.pdf`;

        html2canvas(document.querySelector("#results"), {
            logging: true,
            allowTaint: false,
            backgroundColor: "#ffffff",
            scale: 1,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0
        }).then(function (canvas) {
            let pdf = new jsPDF("", "mm", [canvas.width, canvas.height]);
            pdf.addImage(canvas.toDataURL("image/"), "PNG", 0, 0);
            pdf.save(filename);
        });
    }

    return (
        <footer>
            <div className="brdr"></div>
            <Container>
                <Route
                    path="/select-device"
                    children={({ match }) => (
                        <>
                            {match &&
                                <Row>
                                    {props.isValidForm ?
                                        <Button
                                            as={Link}
                                            variant="next"
                                            name="Next"
                                            to="/results" >
                                            Next
                                        </Button>
                                        :
                                        <Button
                                            variant="next"
                                            disabled={true}>
                                            Next
                                        </Button>
                                    }
                                </Row>
                            }
                        </>
                    )}
                />

                <Route
                    path="/results"
                    children={({ match }) => (
                        <>
                            {match &&
                                <Row>
                                    <Button
                                        name="Previous"
                                        variant="prev"
                                        onClick={props.handleBack} >
                                        <img
                                            width={8}
                                            height={14}
                                            src={Back}
                                            alt="Previous" />
                                        Previous
                                    </Button>
                                    <Button
                                        variant="pdf"
                                        onClick={GetPDF.bind(this)} >
                                        Get Your PDF
                                    </Button>
                                </Row>
                            }
                        </>
                    )}
                />
            </Container>
        </footer>
    );
}

export default Footer;