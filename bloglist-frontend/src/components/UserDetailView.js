import React, { useEffect, useState } from 'react';
import userService from '../services/users';
import { useParams } from 'react-router-dom';

const UserDetailView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getSingle(id); // Assuming this function fetches a single user
      setUser(fetchedUser);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading user data...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailView;
