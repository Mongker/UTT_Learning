import React from 'react';
import HeaderUNICAView from '../components/Header/UNICA/HeaderUNICAView';
import Footer from '../components/Footer/Footer';
import Password from '../components/Content/AccountHome/Password';
// import PropTypes from 'prop-types';

function newPassword() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderUNICAView />
            <Password />
            <Footer />
        </div>
    );
}

newPassword.propTypes = {};

newPassword.defaultProps = {};

export default newPassword;
