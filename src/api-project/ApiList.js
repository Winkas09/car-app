import React from 'react';
import ApiItem from './ApiItem';

const ApiList = ({ items, type }) => {
  return (
    <div>
      {items.map(item => (
        <ApiItem key={item.id} item={item} type={type} />
      ))}
    </div>
  );
};

export default ApiList;