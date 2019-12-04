import React from 'react';

const Header = ({course}) => {
    return (
        <h2>{course.name}</h2>
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

export default Course;