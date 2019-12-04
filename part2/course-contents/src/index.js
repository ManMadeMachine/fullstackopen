import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    );
};

const Content = (props) => {
    const {parts} = props;
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
}

const Total = (props) => {
    const {parts} = props;

    const totalExercises = () => {
        return parts.reduce((acc, curr) => acc + curr.exercises, 0)
    }
    return (
        <p><b>total of {totalExercises()} exercises</b></p>
    );
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
        },
        {
            name: 'State of a component',
            exercises: 14,
            id: 3
        },
        {
            name: 'Redux',
            exercises: 11,
            id: 4
        }]
    };
    return (
        <div>
            <Course course={course} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

