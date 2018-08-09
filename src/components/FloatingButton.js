import React from 'react';
import { Link } from 'react-router-dom';

import './FloatingButton.scss';

const FloatingButton = (props) => {
    return (
        <div className="floating-button">
            <Link to={props.linkTo}>
                <span>{props.content}</span>
            </Link>
        </div>
    );
}

export default FloatingButton;