import React from 'react';
import style from './style.module.scss';
import { BookOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import useUserBase from '../../hooks/LogicData/useUserBase';
import HistoryTransaction from './Table/HistoryTransaction';
import InfoMyUser from './Table/InfoMyUser';
import MyVideo from './Table/MyVideo';
import withPageRouter from '../../HOC/withPageRouter';
// import PropTypes from 'prop-types';
const { TabPane } = Tabs;

const TYPE_TAB = {
    KHOA_HOC: 'KHOA_HOC',
    INFO: 'INFO',
    HISTORY: 'HISTORY',
};

function AccountHome(props) {
    const { router } = props;
    const { query } = router;
    const [keyActive, setKeyActive] = React.useState(TYPE_TAB.KHOA_HOC);
    const { myUser } = useUserBase();

    // handle func
    const callback = (key) => {
        setKeyActive(key);
    };

    // vòng đời
    React.useEffect(() => {
        switch (query.show) {
            case '3':
                setKeyActive(TYPE_TAB.HISTORY);
                break;
            case '2':
                setKeyActive(TYPE_TAB.INFO);
                break;
            default:
                setKeyActive(TYPE_TAB.KHOA_HOC);
                break;
        }
    }, [query]);

    return (
        <div className={style.form_account}>
            <div className={style.u_dashboard_top}>
                <div className={style.container}>
                    <div className={style.row}>
                        <div className={style.row_content}>
                            <p>Học viên: {myUser && myUser.name} </p>
                            <div className={style.navbar_collapse}>
                                <Tabs activeKey={keyActive} onChange={callback}>
                                    <TabPane
                                        tab={
                                            <span className={style.tab}>
                                                <BookOutlined />
                                                Khóa học
                                            </span>
                                        }
                                        key={TYPE_TAB.KHOA_HOC}
                                    >
                                        <MyVideo />
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span className={style.tab}>
                                                <UserOutlined />
                                                Hồ sơ cá nhân
                                            </span>
                                        }
                                        key={TYPE_TAB.INFO}
                                    >
                                        <InfoMyUser />
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span className={style.tab}>
                                                <HistoryOutlined />
                                                Lịch sử đặt hàng
                                            </span>
                                        }
                                        key={TYPE_TAB.HISTORY}
                                    >
                                        <HistoryTransaction />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AccountHome.propTypes = {};

AccountHome.defaultProps = {};

export default withPageRouter(AccountHome);
