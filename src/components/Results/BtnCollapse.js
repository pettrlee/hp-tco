import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

const BtnCollapse = (props) => {
    const [open, setOpen] = useState(false);

    const handleCollapse = (e) => {
        const value = e.currentTarget.value;
        if (!open) {
            window.dataLayer.push({
                event: "e_linkClick",
                linkPlacement: value,
                linkID: "Expanded"
            });
        }

        setOpen(!open)
    }

    const handleClick = (e) => {
        const value = e.currentTarget.value;
        window.dataLayer.push({
            event: "e_linkClick",
            linkPlacement: value,
            linkID: "Full Details"
        });
    }

    return (
        <div className="program" >
            <Button
                variant="trigger"
                className="mobile"
                value={props.name}
                onClick={handleClick.bind(this)} >
                {props.icon}
                <p>{props.name}</p>
            </Button>
            <Button
                variant="trigger"
                value={props.name}
                aria-controls={props.value}
                aria-expanded={open}
                onClick={handleCollapse.bind(this)} >
                {props.icon}
                <p>{props.name}</p>
                <div className="icon">
                    <span></span><span></span>
                </div>
            </Button>
            <Collapse className="content" in={open}>
                <div id={props.value}>
                    {props.content}
                    <Button
                        variant="detail"
                        value={props.name}
                        onClick={handleClick.bind(this)} >
                        FULL DETAILS
                </Button>
                </div>
            </Collapse>
        </div>
    );
}

export default BtnCollapse;