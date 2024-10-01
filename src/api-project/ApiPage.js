import React, { useEffect, useState } from 'react';
import ApiList from './ApiList';

const ApiPage = ({ apiEndpoint, title, type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Failed to fetch ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <ApiList items={items} type={type} />
    </div>
  );
};

export default ApiPage;


// import { Link } from 'react-router-dom';

// const ApiPage = () => {
//   return (
//     <div>
//         <h1>API</h1>
//         <p>Čia yra API projektų puslapis</p>
//         <ol>
//             <li><Link to='/api/start'>Start</Link></li>
//             <li><Link to='/api/project'>Project</Link></li>
//         </ol>
//     </div>
//   );
// };

// export default ApiPage;