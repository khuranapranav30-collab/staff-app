import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import "./Login.css";

import {
    creatinguserwithsignup,
    creataUserdocfromauth
} from "./utils/firebase";

function SignUp() {
    const navigate = useNavigate();

    const [contact, setcontact] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { displayName, email, password, confirmPassword } = contact;

    function handleContact(event) {
        const { name, value } = event.target;

        setcontact((preValue) => ({
            ...preValue,
            [name]: value
        }));
    }

    async function handleuser() {
        if (!displayName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password and confirm password should match");
            return;
        }

        try {
            const { user } = await creatinguserwithsignup(email, password);

            await creataUserdocfromauth(user, {
                displayName: displayName
            });

            alert("Account created successfully");

            setcontact({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            navigate("/");
        } catch (error) {
            console.log(error.code, error.message);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered. Please log in.");
            } else if (error.code === "auth/weak-password") {
                alert("Password should be at least 6 characters.");
            } else {
                alert(error.message);
            }
        }
    }

    return (
        <div className="head">
            <div className="login-style">
                <br />

                <Input
                    name="displayName"
                    type="text"
                    placeholder="Enter name"
                    value={displayName}
                    onChange={handleContact}
                />

                <br />

                <Input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleContact}
                />

                <br />

                <Input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleContact}
                />

                <br />

                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleContact}
                />

                <br />

                <button onClick={handleuser}>
                    Sign up
                </button>

                <br />

                <Link to="/login">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default SignUp;