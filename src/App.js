import "./App.css";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./Firebase.init";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const auth = getAuth(app);

function App() {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState();
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailField = (e) => {
        setEmail(e.target.value);
    };
    const handlePassField = (e) => {
        setPassword(e.target.value);
    };
    const handleRegChange = (e) => {
        setRegistered(e.target.checked);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError("Password Should contain at least one special character");
            return;
        }
        setValidated(true);
        setError("");
        if (registered) {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user;
                    console.log(user);
                    setEmail("");
                    setPassword("");
                })
                .catch((err) => {
                    console.log("Error", err);
                    setError(err.message);
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user;
                    console.log(user);
                    setEmail("");
                    setPassword("");
                })
                .catch((err) => {
                    console.log("Error", err);
                    setError(err.message);
                });
        }
    };
    return (
        <div className="w-50 mx-auto mt-3">
            <div className="container">
                <h2 className="text-primary mb-3">
                    Please {registered ? "Login" : "Register"}!!
                </h2>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleFormSubmit}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            onBlur={handleEmailField}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            onBlur={handlePassField}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            onChange={handleRegChange}
                            type="checkbox"
                            label="Already Registered"
                        />
                    </Form.Group>
                    <p className="text-danger">{error}</p>
                    <Button variant="primary" type="submit">
                        {registered ? "Login" : "Register"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default App;
