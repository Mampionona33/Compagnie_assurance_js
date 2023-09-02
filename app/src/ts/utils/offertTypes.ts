import { createOffer } from "./createOffer";
import {
  isAccidentNumber1,
  isAccidentNumber2,
  isAccidentNumber3,
  isAccidentNumberNull,
  isAgePermisUnder2,
  isAgeUnder25,
  isSeniorityUpper5,
} from "./offertValidation";

interface IOfferConditions {
  (
    age: number,
    agePermis: number,
    accidentNumber: number,
    seniority?: number
  ): boolean;
}

const redOfferConditions: IOfferConditions[] = [];
const orangeOfferConditions: IOfferConditions[] = [];
const greenOfferConditions: IOfferConditions[] = [];
const blueOfferConditions: IOfferConditions[] = [];

redOfferConditions.push(
  (age, agePermis, accidentNumber, seniority) =>
    (isAgeUnder25(age) &&
      isAgePermisUnder2(agePermis) &&
      isAccidentNumberNull(accidentNumber)) ||
    (isAgeUnder25(age) &&
      !isAgePermisUnder2(agePermis) &&
      isAccidentNumber1(accidentNumber)) ||
    (!isAgeUnder25(age) &&
      !isAgePermisUnder2(agePermis) &&
      isAccidentNumber2(accidentNumber))
);

orangeOfferConditions.push(
  (age, agePermis, accidentNumber, seniority) =>
    (isAgeUnder25(age) &&
      isAccidentNumberNull(accidentNumber) &&
      !isAgePermisUnder2(agePermis)) ||
    (!isAgeUnder25(age) &&
      isAgePermisUnder2(agePermis) &&
      isAccidentNumberNull(accidentNumber)) ||
    (!isAgeUnder25(age) &&
      !isAgePermisUnder2(agePermis) &&
      isAccidentNumber1(accidentNumber))
);

greenOfferConditions.push(
  (age, agePermis, accidentNumber, seniority) =>
    !isAgeUnder25(age) &&
    !isAgePermisUnder2(agePermis) &&
    isAccidentNumberNull(accidentNumber)
);

blueOfferConditions.push();

export const redOffer = createOffer("Rouge", redOfferConditions);
export const orangeOffer = createOffer("Orange", orangeOfferConditions);
export const greenOffer = createOffer("Vert", greenOfferConditions);
export const blueOffer = createOffer("Bleu", blueOfferConditions);
