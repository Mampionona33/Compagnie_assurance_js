import { IOfferConditions } from "./offertTypes";

export interface Offer {
  name: string;
  validate: (conducteur: IConducteur) => boolean;
}

export interface IConducteur {
  age: number;
  permisDepuis: number;
  accidents: number;
  seniority: number;
}

export const colorTransitions: Record<string, string> = {};

export function createOffer(
  name: string,
  conditions: IOfferConditions[],
  checkFideliteFn: (conducteur: IConducteur) => boolean
): Offer {
  return {
    name,
    validate: (conducteur: IConducteur) => {
      const { age, permisDepuis, accidents, seniority } = conducteur;

      for (const condition of conditions) {
        if (condition(age, permisDepuis, accidents, seniority)) {
          if (checkFideliteFn(conducteur)) {
            return true;
          }
          return false;
        }
      }
      return false;
    },
  };
}
