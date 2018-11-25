import React from 'react';
import ItemCard from '../../components/item-card';
import { convertDate } from '../../helpers'
function ListItems(props) {
	const { items, deleteItem, editItem, toggleFavorite } = props;

	return (
		items.map((el, index) => (
			<ItemCard
				key={index}
				title={el.title}
				description={el.description}
				createdDate={convertDate(el.createdDate)}
				mediaType={el.mediaType}
				mediaLink={el.thumbnailSrc}
			>
				<div className="btn-group">
					<button
						className="btn btn-outline-primary btn-lg"
						onClick={() => toggleFavorite(el)}
					>
						<i className={`fa ${ el.isFavorite ? "fa-heart red" : "fa-heart-o"}`}/>
					</button>

					<button
						className="btn btn-outline-primary btn-lg"
						onClick={() => deleteItem(el)}
					>
						<i className="fa fa-trash-o"/>
					</button>

					<button
						onClick={() => editItem(el)}
						className="btn btn-outline-primary btn-lg"
					>
						<i className="fa fa-pencil-square-o"/>
					</button>
				</div>
			</ItemCard>

		))
	)
}

export default ListItems;
