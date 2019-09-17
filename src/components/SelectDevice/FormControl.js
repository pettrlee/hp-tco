import React from 'react';
import { Col, Form } from "react-bootstrap";

const FormControl = (props) => {
    return (
        <>
            <Form.Label>{props.label}</Form.Label>
            <Col md={props.size}>
                <Form.Control
                    as="select"
                    name={props.name}
                    value={props.value}
                    onChange={props.inputChange}
                    disabled={props.disable ? true : false}
                >
                    {props.default &&
                        <option value="default">{props.default}</option>
                    }
                    {props.dropdown}
                </Form.Control>
            </Col>
        </>
    );
}

export default FormControl;