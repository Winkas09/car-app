import { Link } from 'react-router-dom';

const ApiItem = ({ item, type }) => {
  switch (type) {
    case 'user':
      return (
        <div className='api-item'>
        <h2>{item.name}</h2>
        <p>Email: {item.email}</p>
        <p>Phone: {item.phone}</p>
        <p>Username: {item.username}</p>
        <p>Website: {item.website}</p>
        <h3>Address</h3>
        <p>{item.address.street}, {item.address.suite}</p>
        <p>{item.address.city}, {item.address.zipcode}</p>
        <h3>Company</h3>
        <p>{item.company.name}</p>
        <p>{item.company.catchPhrase}</p>
        <p>{item.company.bs}</p>
        <Link to={`/user/${item.id}`}>View Details</Link>
      </div>
      );
    case 'album':
      return (
        <div className='api-item'>
          <h2>{item.title}</h2>
            <Link to={`/album/${item.id}`}>View Photos</Link>
        </div>
      );
    case 'post':
      return (
        <div className='api-item'>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
            <Link to={`/post/${item.id}`}>View Details</Link>   
        </div>
      );
    default:
      return null;
  }
};

export default ApiItem;