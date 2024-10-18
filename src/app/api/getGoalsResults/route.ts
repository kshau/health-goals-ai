import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(request : NextRequest) {

    try {

        const {userAge, userWeightNumber, userWeightUnit, userGender, userPhysicalGoals, userMentalGoals} = await request.json();

        const ollamaRes = await ollama.chat({
            model: 'Luciferalive/health_llama:latest',
            messages: [
              {
                role: 'user',
                content: `
                  Use lists, paragraphs, and newlines as necessary. Use character • for bullet points.
          
                  I am ${userAge} years old and weigh ${userWeightNumber} ${userWeightUnit}. My gender is ${userGender}.
          
                  My physical health goals are:
                  ${userPhysicalGoals}

                  My mental health goals are:
                  ${userMentalGoals}
          
                  Respond to each question separately. Clearly label each section as "EXERCISE ROUTINE:", "DIET:", and "HABITS:".
          
                  Tell me a good daily exercise routine for myself so I can achieve my goals.
                `
              },
              {
                role: "user",
                content: "Tell me a good diet for myself so I can achieve my goals."
              },
              {
                role: "user",
                content: "Tell me good daily habits I should follow so I can achieve my goals."
              }
            ]
        });

        const ollamaResContent = ollamaRes.message.content;

        const exerciseRoutine = ollamaResContent.split('EXERCISE ROUTINE:')[1]?.split('DIET:')[0]?.trim();
        const diet = ollamaResContent.split('DIET:')[1]?.split('HABITS:')[0]?.trim();
        const habits = ollamaResContent.split('HABITS:')[1]?.trim();

        return NextResponse.json({ 
            exerciseRoutine, 
            diet, 
            habits
        }, { status: 200 });

    }

    catch (err) {
        console.error(err);
        return NextResponse.json({ status: "error", message: err }, { status: 500 });
    }

}