import axios from 'axios';

const port = 3001;
const baseURL = `http://localhost:${port}/persons`;

const getAll = () => {
    return axios.get(baseURL)
                .then(response => response.data);
};

const create = (newPerson) => {
    return axios.post(baseURL, newPerson)
                .then(response => response.data);
};

const updateNumber = (id, updatedPerson) => {
    return axios.put(`${baseURL}/${id}`, updatedPerson)
                .then(response => response.data);
}

// No need to return response.data, since in this case it's an empty object.
const deleteById = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

export default {
    getAll,
    create,
    updateNumber,
    deleteById
};

