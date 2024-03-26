import axios from 'axios';

const baseUrl = '/api/comments';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const configWithAuth = () => {
  return token ? { headers: { Authorization: token } } : undefined;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newComment => {
  const response = await axios.post(baseUrl, newComment, configWithAuth());
  return response.data;
};

const update = async (commentId, updatedComment) => {
  const response = await axios.put(`${baseUrl}/${commentId}`, updatedComment, configWithAuth());
  return response.data;
};

const remove = async commentId => {
  const response = await axios.delete(`${baseUrl}/${commentId}`, configWithAuth());
  return response.data;
};

export { getAll, create, setToken, update, remove };