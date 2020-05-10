import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
    const [newExercise, setNewExercise] = useState({
        username: 'test user',
        description: "",
        duration: 0,
        date: new Date(),
        users: ['test user', 'bob']
    });

    function onChangeUsername(event) {
        const { value } = event.target
        setNewExercise(prev => { 
            return {
                ...prev,
                username: value
            }
        });
    }

    function onChangeDescription(event) {
        const { value } = event.target
        setNewExercise(prev => { 
            return {
                ...prev,
                description: value
            }
        });
    }

    function onChangeDuration(event) {
        const { value } = event.target
        setNewExercise(prev => { 
            return {
                ...prev,
                duration: value
            }
        });
    }

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

        const exercise = {
            username: newExercise.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date
        }
        console.log(exercise);
        window.location = '/';  // Return user back to homepage
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
                        value={newExercise.username}
                        onChange={onChangeUsername}>
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
                        value={newExercise.description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={newExercise.duration}
                        onChange={onChangeDuration}
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