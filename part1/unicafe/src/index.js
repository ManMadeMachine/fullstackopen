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

const Statistic = ({label, value, postFix}) => <p>{label} {value} {postFix}</p>;

const Statistics = (props) => {
    const {good, neutral, bad, total, average, positivePercentage} = props.stats;

    if (good === 0 && neutral === 0 && bad === 0){
        return(
            <p>No feedback given</p>
        );
    }

    return(
        <div>
            <Statistic label="good" value={good} />
            <Statistic label="neutral" value={neutral} />
            <Statistic label="bad" value={bad} />
            <Statistic label="all" value={total} />
            <Statistic label="average" value={average} />
            <Statistic label="positive" value={positivePercentage} postFix="%" />
        </div>
    );
};


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const total = () => good + neutral + bad;
    const average = () => {
        if (total() === 0){
            return 0;
        }
        return (good - bad) / total();
    };  

    const positivePercentage = () => {
        if (total() === 0){
            return 0;
        }

        return (good / total()) * 100;
    }

    const stats = {
        good,
        neutral,
        bad,
        total: total(),
        average: average(),
        positivePercentage: positivePercentage()
    }

    return (
        <div>
            <Header text="give feedback" />
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />

            <Header text="statistics" />
            <Statistics stats={stats}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

