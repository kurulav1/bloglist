import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const update = async (blogId, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getSingle = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`);
  return response.data;
}


const remove = async blogId => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const like = async blogId => {
  const blog = await axios.get(`${baseUrl}/${blogId}`);
  const updatedBlog = { ...blog.data, likes: blog.data.likes + 1 };
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove, getSingle, like}