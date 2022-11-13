import * as React from 'react';
import { useState, useEffect } from 'react';

import useInfiniteScroll from 'react-infinite-scroll-hook';

function SimpleInfiniteList() {
	//const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
	const loading = false;
	const hasNextPage = true;
	const error = false;
	const [items, setItems] = useState(Array.from({ length: 20 }));
	const fetchMoreData = () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		setTimeout(() => {
			setItems(items.concat(Array.from({ length: 20 })));
		}, 1500);
	};

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: fetchMoreData,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: !!error,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});

	return (
		<>
			{items.map((i, index) => (
				<div key={index}>{index}</div>
			))}
			{/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
			{hasNextPage && <div ref={infiniteRef}>Loading</div>}
		</>
	);
}

export default SimpleInfiniteList;
