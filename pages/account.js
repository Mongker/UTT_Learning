import React from 'react';
import dynamic from 'next/dynamic';
import HeaderUNICAView from '../components/Header/UNICA/HeaderUNICAView';
import Footer from '../components/Footer/Footer';
// import AccountHome from '../components/Content/AccountHome/AccountHome';
// import PropTypes from 'prop-types';s

const AccountHome = dynamic(() => import('../components/Content/AccountHome/AccountHome'));

function Account() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderUNICAView />
            <AccountHome />
            <Footer />
        </div>
    );
}

Account.propTypes = {};

Account.defaultProps = {};

export default Account;
