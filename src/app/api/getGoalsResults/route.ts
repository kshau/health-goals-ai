import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(request : NextRequest) {

    try {

        const {
            userAge, 
            userWeightNumber, 
            userWeightUnit,
            userPhysicalGoals, 
            userMentalGoals
        } = await request.json();

        const exerciseRoutineRes = await ollama.chat({
            model: 'Luciferalive/health_llama:latest',
            messages: [{ 
                role: 'user', 
                content: 
                `
                Use less than 275 words in your response.

                I am 15 years old and weigh 148 lbs.

                My physical health goals are:
                gaining forearm strength
                building stamina while running

                Create a daily exercise routine for me. Use lists and paragraphs as necessary.`, 

            }],
            
        })

        console.log(exerciseRoutineRes.message.content)

        return NextResponse.json({ 
            exerciseRoutine: exerciseRoutineRes.message.content
        }, { status: 200 });

    }

    catch (err) {
        console.error(err);
        return NextResponse.json({ status: "error", message: err }, { status: 500 });
    }

}