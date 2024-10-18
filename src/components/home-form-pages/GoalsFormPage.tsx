"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function GoalsFormPage({ goalsType, inputsPlaceholder, exampleInputs, setUserGoals, userGoals } : {
    goalsType: string,
    inputsPlaceholder: string,
    exampleInputs: Array<string>,
    setUserGoals: Dispatch<SetStateAction<any>>, 
    userGoals: Array<string>
  }) {
  
    const addGoal = (goal : string) => {
      setUserGoals((o : Array<string>) => [...o, goal]);
    }
  
    const editGoal = (editIndex: number, newGoal: string) => {
      setUserGoals((o: Array<string>) => {
        const updatedGoals = [...o]; 
        updatedGoals[editIndex] = newGoal;
        return updatedGoals;
      });
    }
  
    const removeGoal = (removeIndex: number) => {
      setUserGoals((o: Array<string>) => 
        o.filter((_, index) => index !== removeIndex)
      );
    };
  
    return (
      <div>
  
        <div className="font-semibold flex flex-col items-center mt-24 gap-y-6">
  
          <div className="text-secondary text-2xl text-center">
            <span>Enter in your goals that relate to your </span>
            <span className="text-accent">{goalsType} </span>
            <span>fitness.</span>
          </div>
  
          {userGoals.map((goal, index) => (
  
            <div className="flex flex-row gap-x-2 animate-fade">
  
              <Input className="w-96" value={goal} placeholder={inputsPlaceholder} onChange={e => {editGoal(index, e.target.value)}}/>
  
              <Button variant="ghost" onClick={() => {removeGoal(index)}} className="px-0">
                <Trash2Icon/>
              </Button>
  
            </div>
  
          ))}
  
          <Button size="icon" variant="secondary" className="text-3xl" onClick={() => {addGoal("")}}>
            +
          </Button>
  
  
          <div className="flex flex-wrap w-[30rem] justify-center gap-2 mt-8">
  
            {exampleInputs.map((goal, index) => (userGoals.includes(goal) || index > 10) ? <></> : (
              <Button variant="outline" size="sm" className="text-sm" key={index} onClick={() => {addGoal(goal)}}>
                {goal}
              </Button>
            ))}
          
          </div>
  
  
        </div>
  
      </div>
    )
  
  }