/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 28/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @phone: +84373668113
 * @slogan: "Mọi thứ đều bắt đầu từ việc nhỏ, những khát vọng phải lớn"
 */

// Redux
import { connect } from 'react-redux';

// components
import CategoryView from './CategoryView';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryView);

export default CategoryContainer;
