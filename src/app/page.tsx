"use client"

import { AgeAndWeightFormPage } from "@/components/home-form-pages/AgeAndWeightFormPage"
import { GoalsFormPage } from "@/components/home-form-pages/GoalsFormPage"
import { GoalsFormResultsPage } from "@/components/home-form-pages/GoalsFormResultsPage"
import { Button } from "@/components/ui/button"
import { exampleMentalGoals, examplePhysicalGoals, Gender, Lifestyle, WeightUnit } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const isBrowser = () => typeof window !== 'undefined'; 

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0 });
}

export default function Home() {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div className="flex flex-col items-center animate-fade">

      <div className="font-semibold text-2xl lg:text-4xl mt-32 text-center ">
        <span className="text-primary">Welcome to </span>
        <span>Health Goals AI</span>
        <span className="text-primary">!</span>
      </div>

      <GoalsForm/>

    </div>
  )

}

function IncompleteFormHeader() {

  return (
    <div className="font-semibold text-xl lg:text-3xl max-w-[55rem] mt-16 text-center">
      <span>Enter your information into the following fields, and we will provide a </span>
      <span className="text-accent">realistic </span>
      <span>approach to achieving your </span>
      <span className="text-accent">health goals</span>
      <span>!</span>
    </div>
  )

}

function CompleteFormHeader() {

  return (
    <div className="font-semibold text-xl lg:text-3xl max-w-[50rem] mt-16 text-center">
      <span>Here is what you should do in order to </span>
      <span className="text-accent">achieve </span>
      <span>your </span>
      <span className="text-accent">health goals</span>
      <span>!</span>
    </div>
  )

}

function GoalsForm() {

  const [userAge, setUserAge] = useState<number | undefined>(undefined);
  const [userWeightNumber, setUserWeightNumber] = useState<number | undefined>(undefined);
  const [userWeightUnit, setUserWeightUnit] = useState<WeightUnit>(WeightUnit.lbs);
  const [userGender, setUserGender] = useState<Gender>(Gender.male);
  const [userLifestyle, setUserLifestyle] = useState<Lifestyle>(Lifestyle.sedentary);
  const [userPhysicalGoals, setUserPhysicalGoals] = useState<Array<string>>([""]);
  const [userMentalGoals, setUserMentalGoals] = useState<Array<string>>([""]);

  const pages = [

    <AgeAndWeightFormPage 
      setUserAge={setUserAge} 
      setUserWeightNumber={setUserWeightNumber} 
      setUserWeightUnit={setUserWeightUnit} 
      setUserGender={setUserGender}
      setUserLifestyle={setUserLifestyle}
      userAge={userAge}
      userWeightNumber={userWeightNumber}
      userWeightUnit={userWeightUnit}
      userGender={userGender}
      userLifestyle={userLifestyle}
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

  if (currentPageIdx >= pages.length) {

    return (

      <div className="flex flex-col items-center animate-fade">
        <CompleteFormHeader/>
        <GoalsFormResultsPage formData={{
          userAge, 
          userWeightNumber, 
          userWeightUnit,
          userGender,
          userLifestyle,
          userPhysicalGoals, 
          userMentalGoals
        }}/>
      </div>

    )

  }

  return (
    <div className="flex flex-col items-center animate-fade" key={key}>
      <IncompleteFormHeader/>
      {pages[currentPageIdx]}
      <FormNavigationButtons currentPageIdx={currentPageIdx} setCurrentPageIdx={setCurrentPageIdx} setKey={setKey}/>
    </div>
  )

}

function FormNavigationButtons({ currentPageIdx, setCurrentPageIdx, setKey } : { currentPageIdx : number, setCurrentPageIdx : Dispatch<SetStateAction<number>>, setKey : Dispatch<SetStateAction<number>> }) {

  const nextPage = () => {
    setKey(o => o + 1);
    setCurrentPageIdx(o => o + 1);
    scrollToTop();
  }

  const previousPage = () => {
    setKey(o => o + 1);
    setCurrentPageIdx(o => o - 1);
    scrollToTop();
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
