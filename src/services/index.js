import axios from 'axios';
import { NASA_URL, FIREBASE_DB } from '../constants';

const collectionService = {
	searchItem,
	getItems,
	createItem,
	editItem,
	deleteItem,
};

async function searchItem(searchInput) {
	return await axios.get(`${NASA_URL}${searchInput}`)
		.then(res => res.data.collection.items.map(el => ({
			data: el.data && el.data[0],
			links: el.links && el.links[0],
			href: el.href,
			isFavorite: false,
		})))
}

async function getItems() {
	return await axios.get(`${FIREBASE_DB}/collection.json`)
		.then(response => {
			let rs = [];
			for (const key in response.data) {
				rs.push({ id: key, ...response.data[key] });
			}

			return rs;
		});
}

async function createItem(newItem) {
	const data = { ...newItem, isFavorite: false, createdDate: (new Date()).toISOString() };
	return await axios.post(`${FIREBASE_DB}/collection.json`, data)
		.then(response => response.data);
}
async function editItem(newItem) {
	return await axios.put(`${FIREBASE_DB}/collection/${newItem.id}.json`, newItem)
		.then(response => response.data);
}

async function deleteItem(item) {
	return await axios.delete(`${FIREBASE_DB}/collection/${item.id}.json`)
		.then(response => response.data);
}

export default collectionService;
