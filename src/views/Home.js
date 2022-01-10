import React, { useEffect } from "react";

const Home = props => {
    // data, properties (props), state -> all things that we can use/control over the course of our component's lifecycle
    // component lifecycle: loaded? rendered (shown on screen)? changed state? re-render?

    // props.setStudents(['Different Students']); # bad -> causes infinite rerenders outside of an event/function

    // ok, we can't just use setStudents whereever -> let's put it in a function tied to some event
    let addStudent = () => {
        // addStudent is a function made to mutate the student state -> it will make some modification to our students state array
        // then it will use setStudents to mutate that state
        // out of place modify the state, then use setState to update and rerender
        let newStudents = [...props.students]; // spread operator ... to make a copy of props.students
        newStudents.push('Sam Davitt');
        props.setStudents(newStudents); // update the state and cause a rerender
    }

    // useEffect() hook causes its callback function to run every time the component renders
    useEffect(() => {
        console.log(`Rendered or rerendered Home! Number of students: ${props.students.length}.`);
    });

    return (
        <div className='home'>
            <h1>This will be the homepage.</h1>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Students</th>
                                </tr>
                                <tr>
                                    <th><button className="btn btn-sm btn-info" onClick={addStudent}>Add a Student</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.students.map((student, index) => {
                                        return <tr key={index}><td>{student}</td></tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;