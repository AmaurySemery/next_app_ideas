import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password, task } = await request.json();
    if(task === 'register') {
        console.log('case - register')

        // TODO register with Firebase

        return NextResponse.json({status:200, message: `account for ${email} created`});
    }

    if (task === 'login') {
        // TODO
    }

    return NextResponse.json({status:200, message:'unknown task'});
}