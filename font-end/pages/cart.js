import React from 'react';
import dynamic from 'next/dynamic';
// import PropTypes from 'prop-types';

// component
const HeaderUNICAView = dynamic(() => import('../components/Header/UNICA/HeaderUNICAView'));
const Footer = dynamic(() => import('../components/Footer/Footer'));
const CartProduct = dynamic(() => import('../components/Content/CartProduct'));
function cart() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderUNICAView />
            <CartProduct />
            <Footer />
        </div>
    );
}

cart.propTypes = {};

cart.defaultProps = {};

export default cart;
