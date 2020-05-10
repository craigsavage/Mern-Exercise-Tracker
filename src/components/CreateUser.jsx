import React, { useState } from "react";

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
        setNewUser({ username: "" })
        console.log(newUser)
    }

    return (
        <div>
            <h3>{JSON.stringify(newUser)}}</h3>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
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