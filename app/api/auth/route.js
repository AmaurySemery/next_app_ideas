import { createUserWithEmailAndPassword } from "firebase/auth";
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
        console.log({serverErrMsg: err.message});
        // handle error email-already-in-use
        if(err.message.includes('email-already-in-use')) {
            return NextResponse.json({
                status: 500,
                message: `Sorry, this email is already in use`,
            });
        }
        // handle error auth/weak-password
        if(err.message.includes('auth/weak-password')) {
            return NextResponse.json({
                status: 500,
                message: `Sorry, the password should be at least 6 characters`,
            });
        }
      }
    }

    if (task === 'login') {
        // TODO
    }

    return NextResponse.json({status:200, message:'unknown task'});
}