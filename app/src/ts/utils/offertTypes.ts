import { IConducteur, Offer, createOffer } from "./createOffer";
import {
  isAccidentNumber1,
  isAccidentNumber2,
  isAccidentNumberNull,
  isAgePermisUnder2,
  isAgeUnder25,
  isSeniorityUpper5,
} from "./offertValidation";

export interface IOfferConditions {
  (
    age: number,
    agePermis: number,
    accidentNumber: number,
    seniority: number
  ): boolean;
}

function shouldSwitchToBetterOffer(conducteur: IConducteur): boolean {
  if (isSeniorityUpper5(conducteur.seniority)) {
    return true;
  }
  return false;
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

// blueOfferConditions.push(
//   (age, agePermis, accidentNumber, seniority) =>
//     isSeniorityUpper5(seniority) &&
//     greenOfferConditions.some((condition) =>
//       condition(age, agePermis, accidentNumber, seniority)
//     )
// );

export const redOffer = createOffer(
  "Rouge",
  redOfferConditions,
  shouldSwitchToBetterOffer
);
export const orangeOffer = createOffer(
  "Orange",
  orangeOfferConditions,
  shouldSwitchToBetterOffer
);
export const greenOffer = createOffer(
  "Vert",
  greenOfferConditions,
  shouldSwitchToBetterOffer
);
export const blueOffer = createOffer(
  "Bleu",
  blueOfferConditions,
  shouldSwitchToBetterOffer
);
