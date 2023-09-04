export interface IOffreAssurance {
  driverAge: number;
  licenseAge: number;
  accidentNumber: number;
  fidelity: number;
  active: () => boolean;
  calculerTarif(): Itarif;
}

export interface Itarif{
  name: tarifName;
  style: tarifStyle;
}

export enum tarifStyle {
  Bleu = "bg-primary text-white",
  Vert = "bg-success text-white",
  Orange = "bg-warning text-white",
  Rouge = "bg-danger text-white",
  Refuse = "bg-secondary text-white",
}

export enum tarifName {
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

  calculerTarif(): Itarif {
    if (this.fidelity > 5) {
      if (this.accidentNumber > 3) {
        return {name:tarifName.Refuse,style:tarifStyle.Refuse}
      }
      return {name:tarifName.Rouge,style:tarifStyle.Rouge}
    }
    return {name:tarifName.Refuse, style:tarifStyle.Refuse}
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

  calculerTarif(): Itarif {
    if (this.fidelity > 5) {
      return {name:tarifName.Orange, style:tarifStyle.Orange}
    }
    return {name:tarifName.Rouge, style:tarifStyle.Rouge}
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
  calculerTarif(): Itarif {
    if (this.fidelity > 5) {
      return {name:tarifName.Vert,style:tarifStyle.Vert}
    }
    return {name : tarifName.Orange, style:tarifStyle.Orange}
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
  calculerTarif(): Itarif {
    if (this.fidelity > 5) {
      return {name:tarifName.Bleu, style:tarifStyle.Bleu}
    }
    return {name:tarifName.Vert, style:tarifStyle.Vert}
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

  calculerTarif(): Itarif {
    if (this.offer) {
      return {name: this.offer.calculerTarif().name, style:this.offer.calculerTarif().style};
    }
    return {name:tarifName.Refuse, style:tarifStyle.Refuse}
  }
}
