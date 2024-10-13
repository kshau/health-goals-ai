"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { exampleMentalGoals, examplePhysicalGoals, WeightUnit } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Trash2Icon } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

export default function Home() {

  return (
    <div className="flex flex-col items-center animate-fade">

      <div className="font-semibold text-2xl lg:text-4xl mt-32 text-center ">
        <span className="text-primary">Welcome to </span>
        <span>Health Goals AI</span>
        <span className="text-primary">!</span>
      </div>

      <div className="font-semibold text-xl lg:text-3xl max-w-[55rem] mt-16 text-center">
        <span>Enter your information into the following fields, and we will provide a </span>
        <span className="text-accent">realistic </span>
        <span>approach to achieving your </span>
        <span className="text-accent">health goals</span>
        <span>!</span>
      </div>

      <GoalsForm/>

    </div>
  )

}

function GoalsForm() {

  const [userAge, setUserAge] = useState<number | undefined>(undefined);
  const [userWeightNumber, setUserWeightNumber] = useState<number | undefined>(undefined);
  const [userWeightUnit, setUserWeightUnit] = useState<WeightUnit>(WeightUnit.lbs);
  const [userPhysicalGoals, setUserPhysicalGoals] = useState<Array<string>>([""]);
  const [userMentalGoals, setUserMentalGoals] = useState<Array<string>>([""]);

  const pages = [

    <AgeAndWeightFormPage 
      setUserAge={setUserAge} 
      setUserWeightNumber={setUserWeightNumber} 
      setUserWeightUnit={setUserWeightUnit} 
      userAge={userAge}
      userWeightNumber={userWeightNumber}
      userWeightUnit={userWeightUnit}
    />, 

    <GoalsFormPage
      goalsType="physical"
      inputsPlaceholder="Eg. losing 20 lbs, strengthening forearms, etc."
      exampleInputs={examplePhysicalGoals}
      setUserGoals={setUserPhysicalGoals}
      userGoals={userPhysicalGoals}
    />, 

    <GoalsFormPage
      goalsType="mental"
      inputsPlaceholder="Eg. improving sleep, dealing with anxiety, etc."
      exampleInputs={exampleMentalGoals}
      setUserGoals={setUserMentalGoals}
      userGoals={userMentalGoals}
    />

  ]

  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  return (
    <div className="animate-fade" key={key}>
      {pages[currentPageIdx]}
      <FormNavigationButtons currentPageIdx={currentPageIdx} setCurrentPageIdx={setCurrentPageIdx} setKey={setKey}/>
    </div>
  )

}

function FormNavigationButtons({ currentPageIdx, setCurrentPageIdx, setKey } : { currentPageIdx : number, setCurrentPageIdx : Dispatch<SetStateAction<number>>, setKey : Dispatch<SetStateAction<number>> }) {

  const nextPage = () => {
    setKey(o => o + 1);
    setCurrentPageIdx(o => o + 1);
  }

  const previousPage = () => {
    setKey(o => o + 1);
    setCurrentPageIdx(o => o - 1);
  }

  return (
    <div className="flex flex-row gap-x-20 lg:gap-x-80 m-20 w-screen justify-center">

      {currentPageIdx != 0 ? (
        <Button variant="secondary" onClick={previousPage}>
          <ChevronLeft/>
          Back
        </Button>
      ) : <div/>}

      <Button onClick={nextPage}>
        Next
        <ChevronRight/>
      </Button>

    </div>
  )

}

function AgeAndWeightFormPage({ setUserAge, setUserWeightNumber, setUserWeightUnit, userAge, userWeightNumber, userWeightUnit } : { 
  setUserAge : Dispatch<SetStateAction<any>>, 
  setUserWeightNumber : Dispatch<SetStateAction<any>>, 
  setUserWeightUnit :  Dispatch<SetStateAction<any>>, 
  userAge : number | undefined, 
  userWeightNumber : number | undefined,
  userWeightUnit : WeightUnit
}) {

  return (
    <div>

      <div className="font-semibold flex flex-col items-center mt-24 gap-y-6">
        <span className="text-secondary text-2xl">What is your age?</span>
        <Input className="w-20 text-center" type="number" min={1} max={150} step={1} onChange={e => setUserAge(Number(e.target.value))} value={userAge}/>
      </div>

      <div className="font-semibold flex flex-col items-center mt-16 gap-y-6">
        <span className="text-secondary text-2xl">How much do you weigh?</span>
        <div className="flex flex-row gap-x-2">
          <Input className="w-20 text-center" type="number" min={1} max={1500} onChange={e => setUserWeightNumber(Number(e.target.value))} value={userWeightNumber}/>
          <Select onValueChange={(value : WeightUnit) => setUserWeightUnit(value)}>
            <SelectTrigger>
              <SelectValue placeholder={userWeightUnit}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={WeightUnit.lbs}>lbs</SelectItem>
                <SelectItem value={WeightUnit.kg}>kg</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

}

function GoalsFormPage({ goalsType, inputsPlaceholder, exampleInputs, setUserGoals, userGoals } : {
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