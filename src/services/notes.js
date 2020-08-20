import axios from 'axios';

const baseUrl = 'api/notes';

const getAll = () => {
  return axios
  .get(baseUrl)
  .then(response => response.data);
};

const create = newObject => {
  return axios
  .post(baseUrl, newObject)
  .then(response => response.data);
};

const update = (id, newObject) => {
  return axios
  .put(`${baseUrl}/${id}`, newObject)
  .then(response => response.data);
};

const deleteNote = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};


export default { getAll, create, update, deleteNote };