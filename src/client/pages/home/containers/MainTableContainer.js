import {connect} from "react-redux";
import Loading from "../../../components/loading/Loading";
import Loadable from "react-loadable";
import { bindActionCreators } from 'redux'
import {fetchListItemAction} from "../duck/actions";

const mapStateToProps = (state) => {
    return {
        items: state.homeReducer.items || []
    }
};

let mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    getItems: fetchListItemAction
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Loadable({
    loader: () => import('../components/MainTable'),
    loading: Loading
}));