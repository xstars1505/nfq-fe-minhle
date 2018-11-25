import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../pages/home';
import { loadItems, editItem, deleteItem, resetItem } from '../actions/item';

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		loadItems,
		editItem,
		deleteItem,
		resetItem
	}, dispatch);
};
const mapStateToProps = state => {
	return {
		...state.items,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);
