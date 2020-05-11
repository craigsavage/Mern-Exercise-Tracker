import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
    // Initialize object with a test user if no users exist
    const [newExercise, setNewExercise] = useState({
        username: 'Test User',
        description: "",
        duration: 0,
        date: new Date(),
        users: ['Test User']
    });

    useEffect(() => {
        // post exercises to backend to be added to database
        axios.get('http://localhost:5000/users')
            .then(res => {
                const usernames = res.data.map(user => user.username)
                console.log(usernames);
                
                if (usernames.length > 0) {
                    setNewExercise(prev => {
                        return {
                            ...prev,
                            users: [...usernames],
                            username: usernames[0]
                        }
                    });
                }
            });
    }, [/* prevents infinite loop */]);

    // Update the state of the specific item that was changed. 
    function onChange(event) {
        const { name, value } = event.target;

        setNewExercise(prev => {
            return {
                ...prev,
                [ name ]: value
            }
        })
    }

    // Update the state of the date field in the object. 
    function onChangeDate(date) {
        setNewExercise(prev => { 
            return {
                ...prev,
                date: date
            }
        });
    }

    function onSubmit(event) {
        event.preventDefault();
        setNewExercise(prev => {
            return {
                ...prev,
                username: prev.username,
                description: "",
                duration: 0,
            }
        })
        const exercise = {
            username: newExercise.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date
        }
        console.log(exercise);

        // post exercises to backend to be added to database
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        // window.location = '/';  // Return user back to homepage
    }

    return (
        <div>
            <h1>{JSON.stringify(newExercise)}</h1>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        name="username"
                        value={newExercise.username}
                        onChange={onChange}>
                        {
                            newExercise.users.map(user => {
                                return (
                                    <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        name="description"
                        value={newExercise.description}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={newExercise.duration}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={newExercise.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;