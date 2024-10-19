"use client";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender, Lifestyle, WeightUnit } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export function AgeAndWeightFormPage({ setUserAge, setUserWeightNumber, setUserWeightUnit, setUserGender, setUserLifestyle, userAge, userWeightNumber, userWeightUnit, userGender, userLifestyle } : { 
    setUserAge : Dispatch<SetStateAction<any>>, 
    setUserWeightNumber : Dispatch<SetStateAction<any>>, 
    setUserWeightUnit :  Dispatch<SetStateAction<any>>, 
    setUserGender: Dispatch<SetStateAction<any>>,
    setUserLifestyle: Dispatch<SetStateAction<any>>,
    userAge : number | undefined, 
    userWeightNumber : number | undefined,
    userWeightUnit : WeightUnit, 
    userGender : Gender
    userLifestyle: Lifestyle
  }) {
  
    return (
      <div>
  
        <div className="font-semibold flex flex-col items-center mt-24 gap-y-6">
          <span className="text-secondary text-2xl">What is your age?</span>
          <Input className="w-20 text-center" type="number" min={1} max={150} step={1} onChange={e => setUserAge(Number(e.target.value))} value={userAge}/>
        </div>

        <div className="font-semibold flex flex-col items-center mt-24 gap-y-6">
          <span className="text-secondary text-2xl">What is your gender?</span>
          <Select onValueChange={(value : Gender) => setUserGender(value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={userGender}/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Gender.male}>Male</SelectItem>
                  <SelectItem value={Gender.female}>Female</SelectItem>
                  <SelectItem value={Gender.other}>Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

        <div className="font-semibold flex flex-col items-center mt-24 gap-y-6">
          <span className="text-secondary text-2xl">Describe your current lifestyle.</span>
          <Select onValueChange={(value : Lifestyle) => setUserLifestyle(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={userLifestyle}/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Lifestyle.sedentary}>Sedentary</SelectItem>
                  <SelectItem value={Lifestyle.active}>Active</SelectItem>
                  <SelectItem value={Lifestyle.highlyActive}>Highly active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>

        
      </div>
    )
  
  }