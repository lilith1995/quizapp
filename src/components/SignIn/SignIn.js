import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { AuthContext } from "../../helpers/AuthContext";
import "../../App.scss";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EML_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignIn = () => {
    const history = useHistory();

    const { setAuthState } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validEml, setValidEml] = useState(false);
    const [emlFocus, setEmlFocus] = useState(false);


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
        setValidEml(EML_REGEX.test(user.email));
    }, [user.email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(user.password));
    }, [user.password])

    useEffect(() => {
        setErrMsg('');
    }, [user.email, user.password
    ])

    const onSubmit = async e => {
        e.preventDefault();

        const v1 = EML_REGEX.test(user.email);
        const v2 = PWD_REGEX.test(user.password);
        if (!v1 || !v2) {
            setErrMsg("Please fill in all the fields");
            return;
        } else {
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
                const res = await axios.post('/api/auth', body, config)
                console.log(res.data);
                localStorage.setItem("accessToken", res.data);
                setAuthState(true);
                history.push('/');
            } catch (err) {
                console.error(err.response.data);
                if (!email && !password) {
                    setErrMsg("Please fill in all the fields")
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
                    <FontAwesomeIcon icon={faCheck} className={validEml ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEml || !user.email ? "hide" : "invalid"} />
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        ref={userRef}

                        aria-invalid={validEml ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmlFocus(true)}
                        onBlur={() => setEmlFocus(false)}

                        onChange={e => onChange(e)
                        }
                        required />
                    <p id="uidnote" className={emlFocus && email && !validEml ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Uppercase and lowercase letters in English (A-Z, a-z)<br />
                        Digits from 0 to 9<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </label>
                <label>
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd && !user.password ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !user.password ? "hide" : "invalid"} />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={password}

                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}

                        onChange={e => onChange(e)
                        }
                        required />

                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </label>
                <button className="buttonauth" title="Sign in!" onClick={e => onSubmit(e)}>Submit</button>
            </form>
        </div>
    );
};

export default SignIn;