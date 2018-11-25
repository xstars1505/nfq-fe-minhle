import React from 'react';
import ItemCard from '../../components/item-card';
import MyButton from '../../components/button';
import { convertDate } from '../../helpers'
import { VIDEO } from '../../constants'

const SearchResult = props => {
	const { data, searchKey, showDetails } = props;

	return (
		<div>
			<div className="col-12">
				<p>{ data.length } result for "{ searchKey }"</p>
			</div>

			<div className="col-12">
				<div className="row">
					{ data.map((el, index) => (
						<ItemCard
							key={index}
							title={el.data.title}
							description={el.data.description}
							mediaLink={el.data.media_type === VIDEO ? el.href : el.links.href}
							createdDate={convertDate(el.data.date_created)}
							mediaType={el.data.media_type}
						>
							<MyButton
								onClick={() => showDetails(el)}
								title="Add to collection"
							/>
						</ItemCard>
					))}
				</div>
			</div>
		</div>
	);
};

SearchResult.propTypes = {

};

export default SearchResult;
