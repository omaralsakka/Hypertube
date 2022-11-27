import InfiniteScroll from 'react-infinite-scroll-component';
import * as React from 'react';
import { useState, useEffect } from 'react';

function Scroll2() {
	const [items, setItems] = useState(Array.from({ length: 20 }));

	const fetchMoreData = () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		setTimeout(() => {
			setItems(items.concat(Array.from({ length: 20 })));
		}, 1500);
	};
	const style = {
		height: 30,
		border: '1px solid green',
		margin: 6,
		padding: 8,
	};

	return (
		<InfiniteScroll
			dataLength={items.length} //This is important field to render the next data
			next={fetchMoreData}
			hasMore={true}
			loader={<h4>Loading...</h4>}
			endMessage={
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			}
			// below props only if you need pull down functionality
			// 	refreshFunction={this.refresh}
			// 	pullDownToRefresh
			// 	pullDownToRefreshThreshold={50}
			// 	pullDownToRefreshContent={
			// 		<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
			// 	}
			// 	releaseToRefreshContent={
			// 		<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
			// 	}
		>
			{items.map((i, index) => (
				<div style={style} key={index}>
					div - #{index}
				</div>
			))}
		</InfiniteScroll>
	);
}

export default Scroll2;
