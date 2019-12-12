const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3001;

const persons = [
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

