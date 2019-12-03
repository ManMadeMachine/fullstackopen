import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
    return (
        <h1><b>{text}</b></h1>
    );
};

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

    const highestRankingIndex = () => {
        // Get the index of the highest ranking element in the points array.
        // Copying the points array with ... so that we don't mess with the state.
        return points.indexOf(Math.max(...points));
    }

    return (
        <div>
            <Header text="Anecdote of the day" />
            <h4>{props.anecdotes[selected]}</h4>
            <p>Has {points[selected]} votes</p>

            <button onClick={vote}>
                Vote
            </button>

            <button onClick={selectRandom}>
                Pick random!
            </button>

            <Header text="Anecdote with most votes" />
            <p>{props.anecdotes[highestRankingIndex()]}</p>
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
