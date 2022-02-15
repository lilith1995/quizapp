import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../App.scss";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EML_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {
    const history = useHistory();

    const userRef = useRef();
    const errRef = useRef();

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validPwd2, setValidPwd2] = useState(false);
    const [pwdFocus2, setPwdFocus2] = useState(false);

    const [validEml, setValidEml] = useState(false);
    const [emlFocus, setEmlFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [regUser, setRegUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = regUser;

    const onChange = e => setRegUser({ ...regUser, [e.target.name]: e.target.value });

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(regUser.name));
    }, [regUser.name])

    useEffect(() => {
        setValidEml(EML_REGEX.test(regUser.email));
    }, [regUser.email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(regUser.password));
        setValidPwd2(regUser.password === regUser.password2);
    }, [regUser.password, regUser.password2])

    useEffect(() => {
        setErrMsg('');
    }, [regUser.name, regUser.password, regUser.password2])



    const onSubmit = async e => {
        e.preventDefault();

        const v1 = USER_REGEX.test(regUser.name);
        const v2 = PWD_REGEX.test(regUser.password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
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
                console.log(res.data);
                setSuccess(true);
            } catch (err) {
                console.error(err.response.data);
                if (email) {
                    setErrMsg("Email is already in use")
                }
                if (password !== password2) {
                    setErrMsg("Passwords do not match");
                }
                errRef.current.focus();
            }
        };
    }

    return (
        <>
            {success ? (
                <section className="successmessage">
                    <h1>Success!</h1>
                    <p>
                        User {name} successfully registered!!
                    </p>
                </section>
            ) : (
                <div className="form-comp cfb">
                    <h2>Join the Fandom!</h2>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className="sign-up-form cfb">
                        <label>
                            Your name:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !regUser.name ? "hide" : "invalid"} />
                            <br />
                            <input
                                type="text"
                                ref={userRef}
                                name="name"
                                value={name}
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                onChange={e =>
                                    onChange(e)
                                }
                                required />
                            <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </label>
                        <label>
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEml ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEml || !regUser.email ? "hide" : "invalid"} />
                            <br />
                            <input
                                type="email"
                                name="email"
                                ref={userRef}
                                value={email}
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
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !regUser.password ? "hide" : "invalid"} />
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
                                } required />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </label>
                        <label>
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !regUser.password2 ? "hide" : "invalid"} />
                            <br />
                            <input
                                type="password"
                                name="password2"
                                value={password2}
                                aria-invalid={validPwd2 ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus2(true)}
                                onBlur={() => setPwdFocus2(false)}
                                onChange={e => onChange(e)
                                } required />

                            <p id="pwdnote" className={pwdFocus2 && !validPwd2 ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </label>
                        <button className="buttonauth" title="Sign in!" onClick={e => onSubmit(e)} >Submit</button>
                    </form>
                </div >
            )}
        </>
    );
};


export default Register;