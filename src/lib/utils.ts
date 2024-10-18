import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum WeightUnit {
  lbs = "lbs", 
  kg = "kg"
}

export enum Gender {
  male = "Male", 
  female = "Female", 
  other = "Other"
}

export const examplePhysicalGoals = ["exercising daily", "drinking more water", "eating healthier", "improving posture", 
  "building muscle", "losing weight", "running faster", "increasing flexibility", "lifting heavier", "getting stronger", 
  "walking more", "sleeping better", "better endurance", "reducing sugar", "stretching daily", "quitting smoking", "improving balance", 
  "better mobility", "eating more protein", "core strengthening", "resting properly", "improving agility", "reducing body fat", 
  "healthy snacking", "managing portion sizes"
];

export const exampleMentalGoals = ["sleeping more", "meditating daily", "reducing stress", "positive thinking", "reading daily", 
  "limiting screen time", "improving focus", "better time management", "emotional balance", 
  "improving patience", "learning new skills", "better self-care", "reducing anxiety", "mental clarity", "boosting confidence", 
  "daily reflection", "self-acceptance", "visualizing success"
];