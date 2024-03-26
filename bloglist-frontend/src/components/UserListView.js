import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../reducers/userListSlice';
import { Link } from 'react-router-dom';
import './UserListView.css'; // Import custom CSS

const UserListView = () => {
  const users = useSelector(selectUsers);

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Number of Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`} className="user-link">{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListView;
