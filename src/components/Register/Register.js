import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

    const [errorText, setError] = useState([]);

    const validerrors = (type) => {
        switch (type) {
            case "name":
                setError("Invalid username");
                break;
            case "email":
                setError("Invalid Email");
                break;
            case "password":
                setError("Invalid password");
                break;
            default:
                setError("Please fill in all the fields");
                break
        }
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setError('Passwords do not match')
        } else {
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
                console.log(res.data)
            } catch (err) {
                console.error(err.response.data);
            }
        };
    }
    return (
        <div className="form-comp cfb">
            <h1>Create an Account!</h1>
            <form className="sign-up-form cfb" onSubmit={validerrors}>
                <label>
                    Your name:
                    <br />
                    <input type="text" name="name" value={name}
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
                <p className="errortext">{errorText}</p>
            </form>
        </div >
    );
};

export default Register;