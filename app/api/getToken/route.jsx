import { NextResponse } from "next/server";

export async function GET(request) {
    // Return the Deepgram API key securely
    return NextResponse.json({ apiKey: process.env.DEEPGRAM_API_KEY });
}