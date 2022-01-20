import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ValidationChecker from "../../util/validation";
import "../../App.scss";

const SignIn = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const [errorText, setError] = useState([]);

    const validErrors = (type) => {
        switch (type) {
            case "email":
                setError("Email is invalid");
                break
            case "password":
                setError("Password is invalid");
                break
            default:
                setError(["Please fill in all the fields"]);
        }
    }
    const onSubmit = async e => {
        e.preventDefault();
        const validReg = ValidationChecker(user, "signin");
        console.log(validReg.error)
        validReg.error.forEach(type => {
            validErrors(type);
        })
        if (validReg.isValid) {
            const newUser = {
                email,
                password
            }

            try {

                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser)
                const res = await axios.post('/api/users/login', body, config)
                console.log(res.data);
                localStorage.setItem("isAuthenticated", "true");
                history.push('/');
            } catch (err) {
                console.error(err.response.data);
                if (email) {
                    setError("User does not exists");
                }
            }
        }
    }

    return (
        <div className="form-comp cfb" >
            <h1>What's up!</h1>
            <form className="sign-up-form cfb" onSubmit={validErrors}>
                <div className="messages">
                    {errorText}
                </div>
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
                    <input type="password" name="password" value={password}
                        onChange={e => onChange(e)
                        }
                        required />
                </label>
                <button className="buttonauth" title="Sign in!" onClick={e => onSubmit(e)}>Submit</button>
            </form>
        </div>
    );
};

export default SignIn;