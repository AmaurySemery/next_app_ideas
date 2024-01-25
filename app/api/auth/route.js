import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "./firebase-config";

export async function POST(request) {
  const { email, password, task } = await request.json();
  if (task === "register") {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log({
        token: credentials.user.accessToken,
        uuid: credentials.user.uid,
      });
      console.log({ credentials });

      return NextResponse.json({
        status: 200,
        message: `account for ${email} created`,
      });
    } catch (err) {
      console.log({ serverErrMsg: err.message });
      // handle error email-already-in-use
      if (err.message.includes("email-already-in-use")) {
        return NextResponse.json({
          status: 500,
          message: `Sorry, this email is already in use`,
        });
      }
      // handle error auth/weak-password
      if (err.message.includes("auth/weak-password")) {
        return NextResponse.json({
          status: 500,
          message: `Sorry, the password should be at least 6 characters`,
        });
      }
    }
  }

  if (task === "login") {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ loginResponse: credentials });

      // Login success
      return NextResponse.json({
        status: 200,
        message: `Welcome back ${email}`,
        email,
        uid: credentials.user.uid,
        jwt: credentials.user.accessToken,
      });
    } catch (err) {
      // Attention ici, l'erreur renvoyée est toujours "auth/invalid-credential" peu importe l'action
      // L'API avec wrong-password n'existe plus dans firebase
      // Sujet à creuser

      console.log({ serverErrMessage: err.message });
      // Wrong password
      if (err.message.includes("auth/invalid-credential")) {
        return NextResponse.json({
          status: 500,
          message: "Login failed. Email or password incorrect",
        });
      }

      // User does not exist
      if (err.message.includes("auth/user-not-found")) {
        return NextResponse.json({
          status: 500,
          message: `No user found with this email: ${email}`,
        });
      }

      // Other error
      console.log({ loginError: err });
      return NextResponse.json({
        status: 500,
        message: "Login Error",
      });
    }
  }

  return NextResponse.json({ status: 200, message: "unknown task" });
}
