export function formatCalories(calories: number): string {
  return calories.toLocaleString();
}

export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} kg`;
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'lightly' | 'moderately' | 'very' | 'extremely'
): number {
  // Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly: 1.375,
    moderately: 1.55,
    very: 1.725,
    extremely: 1.9
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
} 