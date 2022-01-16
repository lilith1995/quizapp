import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ValidationChecker from "../../util/validation";
import "../../App.scss";

const SignIn = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [errorText, setError] = useState([]);


    const isValid = (type) => {
        switch (type) {
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


    const handleSubmit = async () => {
        const validUser = ValidationChecker(user, "signin");
        console.log(validUser.error)
        if (validUser.isValid) {
            await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (!data.userIsValid) {
                        setError("User does not exist")
                    } else if (!data.passwordIsCorrect) {
                        setError("Password is incorrect")
                    }
                    if (data.data.length !== 0) {
                        localStorage.setItem("token", data.token);
                    }
                });
        } else return;
    };

    return (
        <div className="form-comp cfb" >
            <h1>Sign In!</h1>
            <form className="sign-up-form cfb" onSubmit={isValid}>
                <label>
                    Email:
                    <br />
                    <input type="email"
                        onChange={(e) => {
                            setUser((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }));
                        }}
                        required />
                </label>
                <label>
                    Password:
                    <br />
                    <input type="password"
                        onChange={(e) => {
                            setUser((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }));
                        }}
                        required />
                </label>
                <button className="buttonauth" title="Sign in!" onClick={handleSubmit}>Submit</button>
                <p className="errortext">{errorText}</p>
            </form>
        </div>
    );
};

export default SignIn;