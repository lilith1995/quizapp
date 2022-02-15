import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import "../../App.scss";

const SignIn = () => {
    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user.email, user.password])


    const onSubmit = async e => {
        e.preventDefault();
        {
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
                localStorage.setItem("isAuthenticated", res.data.token);
                history.push('/');
            } catch (err) {
                console.error(err.response.data);
                if (!email && !password) {
                    setErrMsg("Please check all the fields")
                } else if (password) {
                    setErrMsg("Invalid password")
                } else if (email) {
                    setErrMsg("Unothorized");
                }
            }
        }
    }

    return (
        <div className="form-comp cfb" >
            <h1>What's up!</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form className="sign-up-form cfb">
                <label>
                    Email:
                    <br />
                    <input type="email" name="email" value={email} ref={userRef}
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