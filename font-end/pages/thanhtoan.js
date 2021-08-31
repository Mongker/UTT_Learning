import React from 'react';
import HeaderUNICAView from '../components/Header/UNICA/HeaderUNICAView';
import Footer from '../components/Footer/Footer';
import ContentThanhToan from '../components/Content/ThanhToanDon';
// import PropTypes from 'prop-types';

function ThanhToan() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderUNICAView />
            <ContentThanhToan />
            <Footer />
        </div>
    );
}

ThanhToan.propTypes = {};

ThanhToan.defaultProps = {};

export default ThanhToan;
