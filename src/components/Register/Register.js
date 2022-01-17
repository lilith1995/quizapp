import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import ValidationChecker from "../../util/validation";

import "../../App.scss";

const Register = () => {
    const history = useHistory();

    const [regUser, setRegUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = regUser;

    const onChange = e => setRegUser({ ...regUser, [e.target.name]: e.target.value });

    const [submitted, setSubmitted] = useState(false);
    const [errorText, setError] = useState([]);

    const validErrors = (type) => {
        switch (type) {
            case "name":
                setError("Invalid Name");
                break;
            case "email":
                setError("Email is invalid");
                break;
            case "password":
                setError("Password must be at least 6 characters");
                break;
            default:
                setError("Please fill in all the fields");
                break
        }
    }
    const onSubmit = async e => {
        e.preventDefault();
        const validReg = ValidationChecker(regUser, "register");
        console.log(validReg.error)
        validReg.error.forEach(type => {
            validErrors(type);
        })
        if (validReg.isValid) {
            const newUser = {
                name,
                email,
                password,
                password2

            }

            try {

                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser)
                const res = await axios.post('/api/users/register', body, config)
                console.log(res.data);
                setError(false);
                setSubmitted(true);
            } catch (err) {
                console.error(err.response.data);
                if (password !== password2) {
                    setError("Passwords do not match");
                } else if (email) {
                    setError("Email is already in use")

                }
                setSubmitted(false);
            }
        };
    }
    const successMessage = () => {
        return (
            <div
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <p>User {name} successfully registered!!</p>
            </div>
        );
    };
    return (
        <div className="form-comp cfb">
            <h2>Join the Fandom!</h2>
            <form className="sign-up-form cfb" onSubmit={validErrors}>
                <div className="messages">
                    {errorText}
                    {successMessage()}
                </div>
                <label>
                    Your name:
                    <br />
                    <input type="text" name="name" value={name}
                        minle
                        onChange={e =>
                            onChange(e)
                        }
                        required />
                </label>
                <label>
                    Email:
                    <br />
                    <input type="email" name="email" value={email}
                        onChange={e => onChange(e)
                        }
                        required />
                </label>
                <label>
                    Password:
                    <br />
                    <input type="password" name="password" value={password} onChange={e => onChange(e)
                    } />
                </label>
                <label>
                    Confirm Password:
                    <br />
                    <input type="password" name="password2" value={password2} onChange={e => onChange(e)
                    } />
                </label>
                <button className="buttonauth" title="Sign in!" onClick={e => onSubmit(e)} >Submit</button>
            </form>
        </div >
    );
};

export default Register;