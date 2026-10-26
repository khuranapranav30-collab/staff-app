import Input from "./Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
    signinWithgoogle,
    creataUserdocfromauth,
    signinuser
} from "./utils/firebase";

function Login() {
    const navigate = useNavigate();

    const [contact, setcontact] = useState({
        email: "",
        password: ""
    });

    const { email, password } = contact;

    function handleContact(event) {
        const { name, value } = event.target;

        setcontact((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }

    async function handlelogin() {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            await signinuser(email, password);

            alert("Login successful");
            setcontact({
                email: "",
                password: ""
            });

            navigate("/");
        } catch (error) {
            console.log(error.code, error.message);

            if (
                error.code === "auth/invalid-credential"
            ) {
                alert("Incorrect email or password. Please try again.");
            } else if (
                error.code === "auth/user-not-found"
            ) {
                alert("Account not found. Please sign up.");
            } else if (
                error.code === "auth/wrong-password"
            ) {
                alert("Incorrect password. Please try again.");
            } else {
                alert(error.message);
            }
        }
    }

    async function handleuser() {
        try {
            const { user } = await signinWithgoogle();

            await creataUserdocfromauth(user);

            alert("Google login successful");
            navigate("/");
        } catch (error) {
            console.log(error.code, error.message);
            alert(error.message);
        }
    }

    return (
        <div className="head">
            <div className="login-style">
                <br />

                <Input
                    name="email"
                    type="email"
                    placeholder="enter email"
                    value={email}
                    onChange={handleContact}
                />

                <br />

                <Input
                    name="password"
                    type="password"
                    placeholder="enter Password"
                    value={password}
                    onChange={handleContact}
                />

                <br />

                <button onClick={handlelogin}>
                    Login
                </button>

                <br />

                <button onClick={handleuser}>
                    Continue with Google
                </button>

                <Link to="/signup">
                    Instead Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;