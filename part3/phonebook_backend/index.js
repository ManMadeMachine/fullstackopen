const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const PORT = 3001;

let persons = [
    {
        "name": "Arto hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "asdfasdf",
        "number": "asdfdsf",
        "id": 4
    },
    {
        "name": "Jsadfa",
        "number": "2354",
        "id": 5
    }
];

app.use(bodyParser.json());

morgan.token('post-data', (req, res) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    if (!person){
        res.status(404).end();
    } else {
        res.json(person);
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number was not given'
        });
    }

    const existing = persons.find(p => p.name === body.name);

    //Duplicate name
    if(existing){
        return res.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: Math.floor(Math.random() * 2000),
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);

    res.json(person);
});

app.get('/info', (req, res) => {
    const info = {
        'message': `The phonebook has info for ${persons.length} people`,
        'timestamp': new Date()
    };

    res.send(`<p>${info.message}</p><p>${info.timestamp}</p>`);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

