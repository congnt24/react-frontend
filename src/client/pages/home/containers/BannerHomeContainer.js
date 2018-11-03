/**
 * Created by congnt on 6/17/18.
 */


"use strict";
import {connect} from 'react-redux';
import Loadable from "react-loadable";
import Loading from "../../../components/loading/Loading";

const mapStateToProps = (state) => {
    let banners = [];
    if (state.homeReducer.banners) {
        banners = state.homeReducer.banners;
    }
    return {
        banners
    }
};

const BannerHome = Loadable({
    loader: () => import('../components/BannerHome'),
    loading: Loading
});
export default connect(mapStateToProps, null)(BannerHome);