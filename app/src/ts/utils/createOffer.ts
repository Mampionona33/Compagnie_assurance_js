export interface Offer {
  name: string;
  validate: (
    age: number,
    agePermis: number,
    accidentNumber: number,
    seniority?: number
  ) => boolean;
}

export const createOffer = (
  name: string,
  conditions: ((
    age: number,
    agePermis: number,
    accidentNumber: number,
    seniority?: number
  ) => boolean)[]
): Offer => {
  const validate = (
    age: number,
    agePermis: number,
    accidentNumber: number,
    seniority?: number
  ) => {
    for (const condition of conditions) {
      console.log(condition(age, agePermis, accidentNumber, seniority));

      if (condition(age, agePermis, accidentNumber, seniority)) {
        return true;
      }
    }
    return false;
  };

  return { name, validate };
};
