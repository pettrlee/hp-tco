import React from 'react';
import { Form } from "react-bootstrap";

const FormCheck = (props) => {
    return (
        <Form.Check inline>
            <Form.Check.Label>
                <Form.Check.Input
                    type="checkbox"
                    name={props.name}
                    checked={props.pagewideMoneyback}
                    onChange={props.handleCheckbox} />
                <span className="checkbox"></span>
                {props.label}
            </Form.Check.Label>
        </Form.Check>
    );
}

export default FormCheck;