import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => <h1>{text}</h1>;

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

const Statistic = ({label, count}) => <p>{label} {count}</p>;

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <Header text="give feedback" />
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />

            <Header text="statistics" />
            <Statistic label="good" count={good} />
            <Statistic label="neutral" count={neutral} />
            <Statistic label="bad" count={bad} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

