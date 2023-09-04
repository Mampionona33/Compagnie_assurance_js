import { Offer } from "./createOffer";

const calculateOfferType = (
  age: number,
  accidentNumber: number | null,
  agePermis: number,
  seniority: number,
  offers: Offer[]
) => {
  if (accidentNumber === null) {
    return "";
  }

  for (const offer of offers) {
    if (
      offer.validate({
        age: age,
        permisDepuis: agePermis,
        accidents: accidentNumber,
        seniority: seniority,
      })
    ) {
      return offer.name;
    }
  }

  return "Refusé";
};

export default calculateOfferType;
