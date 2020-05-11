import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExerciseList() {
    const [exerciseList, setExerciseList] = useState([]);

    // Populate the exerciseList state with entries from the database.
    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(exercises => setExerciseList(prev => [...prev, ...exercises.data]));
    }, [/* prevents infinite loop */]);

    // Deletes selected exercise item from database and state 
    function deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res));

        setExerciseList(prev => prev.filter(exercise => exercise._id !== id));
    }

    return (
        <div>
            <h1>Exercise List</h1>
            <ul>
                {exerciseList.map(exercise => {
                    return (
                        <div key={exercise._id}>
                            <li>
                                {exercise.username}: {exercise.description}
                                <button className="btn btn-danger btn-sm" onClick={() => deleteExercise(exercise._id)}>Delete</button>
                            </li>

                        </div>
                    )
                }
                )}
            </ul>
            
        </div>
    )
}

export default ExerciseList;