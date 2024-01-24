import { NextResponse } from "next/server";
import ideas from './ideas.json'

export async function GET(request) {
    console.log({url: request.url, request});
    return NextResponse.json(ideas);
}