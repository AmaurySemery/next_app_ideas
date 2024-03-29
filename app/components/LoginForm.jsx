"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContextProvider";

async function loginUser(data) {
  const URL = "http://localhost:3000/api/auth";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(URL, options);
  return response;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { refreshLoginState } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please Fill In All Fields");
      setHasError(true);
      return;
    }
    setHasError(false);
    const response = await loginUser({ email, password, task: "login" });
    const responseJson = await response.json();
    if (responseJson.status === 200) {
      refreshLoginState({
        email: responseJson.email,
        uid: responseJson.uid,
        jwt: responseJson.jwt,
      });
      setEmail("");
      setPassword("");
      setMessage(responseJson.message);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else {
      setHasError(true);
      setMessage(responseJson.message);
    }
  }

  function toggleShow() {
    setShowPassword((current) => !current);
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
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
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />{" "}
            {showPassword && <FaEyeSlash onClick={toggleShow} />}
            {!showPassword && <FaEye onClick={toggleShow} />}
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
      </div>
      No account yet ? <Link href="/register">Go to Register Page</Link>
      {message && <div className={hasError ? "error" : "ok"}>{message}</div>}
    </>
  );
}
