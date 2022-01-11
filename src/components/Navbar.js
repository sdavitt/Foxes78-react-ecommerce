import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {

    // the useEffect() hook runs its callback every time the component is rendered or rerendered (*by default*)
    useEffect(() => { console.log('Navbar component rendered or rerendered!') });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Foxes78 | React</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link btn btn-info" to={props.cart.size ? '/cart' : '/shop'}><i className="fa fa-shopping-cart"></i> | {props.cart.size ? `${props.cart.size} | $${props.cart.total}m` : 'Empty'}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;