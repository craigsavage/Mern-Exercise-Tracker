import React, { useState } from "react";
import axios from 'axios';

function CreateUser() {
    const [newUser, setNewUser] = useState({
        username: ""
    });

    function onChangeUsername(event) {
        const { value } = event.target;
        setNewUser({ username: value })
    }

    function onSubmit(event) {
        event.preventDefault();
        setNewUser({ username: "" });
        document.querySelector(".usernameInput").focus();

        console.log(newUser);

        // post username to backend to be added to database
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control usernameInput"
                        value={newUser.username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;