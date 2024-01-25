'use client';

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

async function registerUser(data) {
    const URL = 'http://localhost:3000/api/auth';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(URL, options);
    return response;
}

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // const response = await registerUser({email, password, task: 'register'})
        if (email ==='' || password ==='' || confirm ==='') {
            setMessage('Please Fill All Fields');
            setHasError(true);
            return;
        }
        if (password !== confirm) {
            setMessage('Password and Confirm Password are different');
            setHasError(true);
            return;
        }
        setMessage('');
        setHasError(false);
        const response = await registerUser({email, password, task: 'register'});
        const responseJson = await response.json();
        console.log({ responseFromForm: responseJson });
        if(responseJson.status === 200) {
            setEmail('');
            setPassword('');
            setConfirm('');
            setMessage(`${responseJson.message}`);
            setTimeout(() => {
                setMessage('')
            }, 4000)
        } else {
            setMessage('Something went wrong');
        }
    }

    function toggleShow() {
        setShowPassword(current => !current);
    }

    return (
      <>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <div className="pass-eye">
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                />
                {' '}
                {showPassword && <FaEyeSlash onClick={toggleShow} />}
                {!showPassword && <FaEye onClick={toggleShow} />}
            </div>
            <label htmlFor="confirm">Confirm Password</label>
            <div className="pass-eye">
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={confirm}
                onInput={(e) => setConfirm(e.target.value)}
                />
                {' '}
                {showPassword && <FaEyeSlash onClick={toggleShow} />}
                {!showPassword && <FaEye onClick={toggleShow} />}
            </div>
            <input type="submit" value="Create" className="btn" />
          </form>
        </div>
        {message && <div>{message}</div>}
      </>
    );
}
