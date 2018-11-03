/**
 * Created by congnt on 7/18/18.
 */

"use strict";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Home from "./Home";


//Tạo ra các function cho this.pros
const mapDispatchToProps = (dispatch) => {
    let actions = bindActionCreators({
        changePage: () => push('/about')
    }, dispatch);
    return {...actions, dispatch}
};
export default connect(state => state, mapDispatchToProps)(Home);