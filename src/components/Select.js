import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Select extends Component {
    render() {
        return (
            <div>
                <h2>Select</h2>
                <h2><NavLink to="/">Home</NavLink></h2>
                <p>Mauris sem velit, vehicula eget sodales vitae, rhoncus eget sapien:</p>
                <ol>
                    <li>Nulla pulvinar diam</li>
                    <li>Facilisis bibendum</li>
                    <li>Vestibulum vulputate</li>
                    <li>Eget erat</li>
                    <li>Id porttitor</li>
                </ol>
            </div>
        );
    }
}

export default Select;