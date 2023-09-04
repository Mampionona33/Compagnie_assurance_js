export interface IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;
  active: () => boolean;
  calculerTarif(): string;
}

export enum tarifColors {
  Bleu = "Bleu",
  Vert = "Vert",
  Orange = "Orange",
  Rouge = "Rouge",
  Refuse = "Réfusé",
}

export class Refuse implements IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;
  constructor(
    driverAge: number,
    licenseAge: number,
    accidentNumber: number,
    fidelity: number
  ) {
    this.driverAge = driverAge;
    this.licenseAge = licenseAge;
    this.accidentNumber = accidentNumber;
    this.fidelity = fidelity;
  }

  active(): boolean {
    return true;
  }

  calculerTarif(): string {
    if (this.fidelity > 5) {
      if (this.accidentNumber > 3) {
        return tarifColors.Refuse;
      }
      return tarifColors.Rouge;
    }
    return tarifColors.Refuse;
  }
}

export class RedOffer implements IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;

  constructor(
    driverAge: number,
    licenseAge: number,
    accidentNumber: number,
    fidelity: number
  ) {
    this.driverAge = driverAge;
    this.licenseAge = licenseAge;
    this.accidentNumber = accidentNumber;
    this.fidelity = fidelity;
  }

  active(): boolean {
    if (
      (this.accidentNumber === 0 &&
        this.licenseAge < 2 &&
        (this.driverAge < 25 || this.driverAge > 25)) ||
      (this.accidentNumber === 1 &&
        ((this.licenseAge > 2 && this.driverAge < 25) ||
          (this.driverAge > 25 && this.licenseAge < 2))) ||
      (this.accidentNumber === 2 && this.licenseAge > 2 && this.driverAge > 25)
    ) {
      return true;
    }
    return false;
  }

  calculerTarif(): string {
    if (this.fidelity > 5) {
      return tarifColors.Orange;
    }
    return tarifColors.Rouge;
  }
}

export class OrangeOffer implements IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;

  constructor(
    driverAge: number,
    licenseAge: number,
    accidentNumber: number,
    fidelity: number
  ) {
    this.driverAge = driverAge;
    this.licenseAge = licenseAge;
    this.accidentNumber = accidentNumber;
    this.fidelity = fidelity;
  }

  active(): boolean {
    if (
      (this.accidentNumber === 0 &&
        this.driverAge < 25 &&
        this.licenseAge > 2) ||
      (this.driverAge > 25 && this.licenseAge < 2) ||
      (this.accidentNumber === 1 && this.driverAge > 25 && this.licenseAge > 2)
    ) {
      return true;
    }
    return false;
  }
  calculerTarif(): string {
    if (this.fidelity > 5) {
      return tarifColors.Vert;
    }
    return tarifColors.Orange;
  }
}

export class GreenOffer implements IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;

  constructor(
    driverAge: number,
    licenseAge: number,
    accidentNumber: number,
    fidelity: number
  ) {
    this.driverAge = driverAge;
    this.licenseAge = licenseAge;
    this.accidentNumber = accidentNumber;
    this.fidelity = fidelity;
  }

  active(): boolean {
    if (
      this.driverAge > 25 &&
      this.licenseAge > 2 &&
      this.accidentNumber === 0
    ) {
      return true;
    }
    return false;
  }
  calculerTarif(): string {
    if (this.fidelity > 5) {
      return tarifColors.Bleu;
    }
    return tarifColors.Vert;
  }
}

export class OffreManager {
  private offers: IOffreAssurance[];
  private offer: IOffreAssurance;

  constructor(driverAge, licenseAge, accidentNumber, fidelity) {
    this.offers = [
      new RedOffer(driverAge, licenseAge, accidentNumber, fidelity),
      new OrangeOffer(driverAge, licenseAge, accidentNumber, fidelity),
      new GreenOffer(driverAge, licenseAge, accidentNumber, fidelity),
      new Refuse(driverAge, licenseAge, accidentNumber, fidelity),
    ];

    for (let offer of this.offers) {
      if (offer.active()) {
        this.offer = offer;
        break;
      }
    }
  }

  calculerTarif(): string {
    if (this.offer) {
      console.log(this.offer);
      return this.offer.calculerTarif();
    }
    return tarifColors.Refuse;
  }
}
