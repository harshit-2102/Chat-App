import React, { useRef, useState } from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            nav("/home")
        } catch {
            setError("Failed to Login in")
        }
        setLoading(false);
        
    }

    return (
        <>
            <Container className='d-flex align-item-center justify-content-center'>
                <div className='w-100 mt-5' style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Login</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit} action="/dashboard">
                                <Form.Group className="mb-3" controlId="formBasicEmail" id='email'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword" id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit" className='w-100'>
                                    Submit
                                </Button>
                            </Form>
                            <div className='w-100 text-center mt-3'>
                                <Link to="/forgot-password">
                                    Forgot Password
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

            </Container>
            <div className='w-100 text-center mt-2'>
                Need an account ? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login