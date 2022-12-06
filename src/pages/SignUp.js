import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from '@firebase/firestore';

const SignUp = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const { signup } = useAuth();
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const passwordConfirm = e.target[3].value;
        const file = e.target[4].files[0];

        const imageRef = ref(storage, `${email}/${email}`);

        if (password !== passwordConfirm) {
            return setError('Password do not match');
        }

        try {
            setError('');
            setLoading(true);
            signup(email, password);
            await uploadBytes(imageRef, file)

            let photoUrl;

            await getDownloadURL(imageRef).then((url) => {
                photoUrl = url;
            })

            await setDoc(doc(db, "user-profile", `${email}`), {
                displayName: name, email: email, photoURL: photoUrl
            })

            await setDoc(doc(db, "user-chats", `${email}`), {})

            nav("/")

        } catch {
            setError("Failed to create account");
        }

        setLoading(false);
    }

    return (
        <>
            <Container className='d-flex align-item-center justify-content-center'>
                <div className='w-100 mt-5' style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName" id='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter display name" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail" id='email'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword" id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPasswordenter" id='password-confirm'>
                                    <Form.Label>Re-enter Password</Form.Label>
                                    <Form.Control type="password" placeholder="Re-enter Password" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFile" id='file'>
                                    <Form.Label>Profile photo</Form.Label>
                                    <Form.Control type="file" required />
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit" className='w-100'>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            <div className='w-100 text-center mt-2'>
                Already have an account ? <Link to="/">Login</Link>
            </div>
        </>
    )
}

export default SignUp