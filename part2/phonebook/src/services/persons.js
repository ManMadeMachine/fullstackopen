import axios from 'axios';

const port = 3001;
const baseURL = `http://localhost:${port}/persons`;

const getAll = () => {
    return axios.get(baseURL)
                .then(response => response.data);
};

const create = (newObject) => {
    return axios.post(baseURL, newObject)
                .then(response => response.data);
};

// No need to return response.data, since in this case it's an empty object.
const deleteById = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

export default {
    getAll,
    create,
    deleteById
};

