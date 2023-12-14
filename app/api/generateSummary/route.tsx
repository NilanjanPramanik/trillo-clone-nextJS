import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    //todo in the body of the POST req
    const { todos } = await request.json();
    console.log(todos)

    //communicate with GPT
    const response = await openai.createChartComplication({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `When responding welcome the user always as Mr.Nila and say welcome to the Trillo clone todo app! Limit the response to 200 characters`,
            },
            {
                role: "user",
                content: `Hi there, provided a summary of the following todos. Count how many todos are in each catogory such as To do, in progress and done, then tell the user to have a productive day! Here's gthe date:${JSON.stringify(todos)}`
            },
        ],

    })

    const { data } = response;

    console.log("data is:" , data);
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}