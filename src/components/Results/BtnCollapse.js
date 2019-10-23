import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

const BtnCollapse = (props) => {
    const [open, setOpen] = useState(false);

    const handleCollapse = (e) => {
        if (!open) {
            props.handleDataLayerPush(e);
        }

        setOpen(!open)
    }

    return (
        <div className="program" >
            <Button
                data-linkid="Full Details"
                data-linkplacement={props.name}
                variant="trigger"
                className="mobile"
                onClick={props.handleDataLayerPush.bind(this)}
                href={props.link}
                target="_blank" >
                {props.icon}
                <p>{props.name}</p>
            </Button>
            <Button
                data-linkid="Expanded"
                data-linkplacement={props.name}
                variant="trigger"
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
                        data-linkid="Full Details"
                        data-linkplacement={props.name}
                        variant="detail"
                        onClick={props.handleDataLayerPush.bind(this)}
                        href={props.link}
                        target="_blank" >
                        FULL DETAILS
                    </Button>
                </div>
            </Collapse>
        </div>
    );
}

export default BtnCollapse;