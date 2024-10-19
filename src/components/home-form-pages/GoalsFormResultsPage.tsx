"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import axios from "axios"
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export function GoalsFormResultsPage({ formData } : { formData : Record<any, any> }) {

    const accordionData = [
      {
        "name": "Exercise Routine", 
        "value": "exerciseRoutine"
      }, 
      {
        "name": "Diet", 
        "value": "diet"
      }, 
      {
        "name": "Habits", 
        "value": "habits"
      }
    ]
  
    const hasFetchedData = useRef(false);
  
    const [goalsResults, setGoalsResults] = useState<{ [key: string]: any } | undefined>();
  
    const getGoalsResults = async () => {
  
      const {userAge, userWeightNumber, userWeightUnit, userGender, userLifestyle, userPhysicalGoals, userMentalGoals} = formData;
  
      const res = await axios.post("/api/getGoalsResults", {
        userAge,
        userWeightNumber,
        userWeightUnit,
        userGender,
        userLifestyle,
        userPhysicalGoals, 
        userMentalGoals,
      })
  
      setGoalsResults(res.data);
      
    }
  
    useEffect(() => {
      if (!hasFetchedData.current) {
        getGoalsResults();
        hasFetchedData.current = true; 
      }
    }, [])
  
    if (!goalsResults) {
      return (
        <Loader2Icon className="mr-2 h-16 w-16 animate-spin mt-16" />
      )
    }
  
    return (
        <div className="flex flex-col items-center">
            <Accordion type="multiple" className="w-[40rem] mt-24 animate-fade" defaultValue={[...(accordionData.map(item => item.value)), "yourInput"]}>
        
                {accordionData.map(item => (
                <AccordionItem value={item.value}>
        
                    <AccordionTrigger className="text-2xl text-secondary font-semibold">
                    {item.name}
                    </AccordionTrigger>
        
                    <AccordionContent className="whitespace-pre-line text-lg leading-loose">
                    {goalsResults[item.value]}
                    </AccordionContent>
        
                </AccordionItem>
                ))}
        
                <AccordionItem value="yourInput" className="my-16">
        
                <AccordionTrigger className="text-2xl text-accent font-semibold">
                    Your Input
                </AccordionTrigger>
        
                <AccordionContent className="flex flex-col text-lg leading-loose">
                    <span>Age: {formData.userAge}</span>
                    <span>Gender: {formData.userGender}</span>
                    <span>Weight: {formData.userWeightNumber} {formData.userWeightUnit}</span>
                    <span>Lifestyle: {formData.userLifestyle}</span>
                    <span>Physical Goals: {formData.userPhysicalGoals.filter((goal : string) => goal).toString()}</span>
                    <span>Mental Goals: {formData.userMentalGoals.filter((goal : string) => goal).toString()}</span>
                </AccordionContent>
        
                </AccordionItem>
        
                
        
            </Accordion>

            <Button variant="secondary" size="sm" className="mb-16" onClick={() => {location.reload()}}>
                Start over
            </Button>
      </div>
    )
  
  }