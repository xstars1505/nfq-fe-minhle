import { ITEM_TYPES } from '../types';
import collectionService from '../services/index';

export function loadItems() {
	return dispatch => {
		dispatch(request());
		return collectionService.getItems()
			.then(items => {
				dispatch(loadItemsSuccess(items));
			}).catch(error => {
				dispatch(loadItemsError(error));
			});
	};

	function request() {
		return { type: ITEM_TYPES.LOAD_ITEMS }
	}

	function loadItemsSuccess(items) {
		return {
			type: ITEM_TYPES.LOAD_ITEMS_SUCCESS,
			payload: items
		};
	}

	function loadItemsError(error) {
		return {
			type: ITEM_TYPES.LOAD_ITEMS_ERROR,
			payload: error
		};
	}

}

export function editItem(item) {
	return (dispatch) => {
		return collectionService.editItem(item)
			.then(() => {
				dispatch(editItemSuccess());
			}).catch(error => {
				dispatch(editItemError(error));
			});
	};

	function editItemSuccess() {
		return {
			type: ITEM_TYPES.EDIT_ITEM_SUCCESS,
		};
	}

	function editItemError(error) {
		return {
			type: ITEM_TYPES.EDIT_ITEM_ERROR,
			payload: error
		};
	}
}

export function deleteItem(item) {
	return (dispatch) => {
		return collectionService.deleteItem(item)
			.then(() => {
				dispatch(deleteItemSuccess());
			}).catch(error => {
				dispatch(deleteItemError(error));
			});
	};

	function deleteItemSuccess() {
		return {
			type: ITEM_TYPES.DELETE_ITEM_SUCCESS,
		};
	}

	function deleteItemError(error) {
		return {
			type: ITEM_TYPES.DELETE_ITEM_ERROR,
			payload: error
		};
	}
}

export function resetItem() {
	return {
		type: ITEM_TYPES.RESET_ITEM,
	}
}
