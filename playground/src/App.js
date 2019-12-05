import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    const hook = () => {
        console.log("effect");        
        axios
        .get('http://localhost:3001/notes')
        .then(res => {
            setNotes(res.data);
        });
    };

    useEffect(hook, []);

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true);

    const toggleImportanceOf = id => {
        console.log(`toggle importance of ${id}`)
        const url = `http://localhost:3001/notes/${id}`;
        const note = notes.find(n => n.id === id);
        const changedNote = {...note, important: !note.important};

        axios.put(url, changedNote).then(response => {
            setNotes(notes.map(note => note.id !== id ? note : response.data));
        });
    };

    const rows = () => notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString,
            important: Math.random() > 0.5
        };

        axios
            .post('http://localhost:3001/notes', noteObject)
            .then(response => {
                console.log(response);
                setNotes(notes.concat(response.data));
                setNewNote('');
            });

    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Add note</button>
            </form>
        </div>
    );
};

export default App;