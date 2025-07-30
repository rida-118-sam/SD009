import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchRecommendations } from './api';

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMore = async () => {
    const newItems = await fetchRecommendations('user123', page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item, idx) => (
        <div key={idx}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
