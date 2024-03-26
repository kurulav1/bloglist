import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  }

  const getSingle = async (id) => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, getAll, getSingle }
