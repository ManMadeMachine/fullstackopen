import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
    const [selected, setSelected] = useState(0);
    // Initialize an empty points array with zeroes, same length as anecdotes array.
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const selectRandom = () => {
        const rand = Math.floor(Math.random() * props.anecdotes.length);
        setSelected(rand);
    }

    const vote = () => {
        const newPoints = [...points];
        newPoints[selected] += 1;
        setPoints(newPoints);
    }

    return (
        <div>
            <h3><b>{props.anecdotes[selected]}</b></h3>
            <h3>Has {points[selected]} votes</h3>

            <button onClick={vote}>
                Vote
            </button>

            <button onClick={selectRandom}>
                Pick random!
            </button>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
