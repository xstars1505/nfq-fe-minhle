import { ITEM_TYPES } from '../types';

export default function itemReducer(state = {}, action) {
	switch (action.type) {
		case ITEM_TYPES.LOAD_ITEMS:
			return { ...state, items: [], inProgress: true };
		case ITEM_TYPES.LOAD_ITEMS_SUCCESS:
			return { ...state, items: action.payload, inProgress: false };
		case ITEM_TYPES.LOAD_ITEMS_ERROR:
			return { ...state, errors: action.payload };

		case ITEM_TYPES.CREATE_ITEM_SUCCESS:
			return { ...state, item: action.payload };
		case ITEM_TYPES.CREATE_ITEMS_ERROR:
			return { ...state, item: action.payload };

		case ITEM_TYPES.GET_ITEM_SUCCESS:
			return { ...state, item: action.payload };
		case ITEM_TYPES.GET_ITEM_ERROR:
			return { ...state, error: action.payload };

		case ITEM_TYPES.EDIT_ITEM:
			return { ...state, item: null, inProgressEdit: true };
		case ITEM_TYPES.EDIT_ITEM_SUCCESS:
			return { ...state, item: true, inProgressEdit: false };
		case ITEM_TYPES.EDIT_ITEM_ERROR:
			return { ...state, error: [], inProgressEdit: false };

		case ITEM_TYPES.DELETE_ITEM:
			return { ...state, item: null, inProgressDelete: true };
		case ITEM_TYPES.DELETE_ITEM_SUCCESS:
			return { ...state, item: true, inProgressDelete: false };
		case ITEM_TYPES.DELETE_ITEM_ERROR:
			return { ...state, error: [], inProgressDelete: false };

		case ITEM_TYPES.RESET_ITEM:
			return { ...state, item: null, inProgressEdit: false };
		default:
			return state;
	}
}

