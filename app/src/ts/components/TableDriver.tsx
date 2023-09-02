import React, { useContext } from "react";
import { DriverContext } from "../App";
import calculateOfferType from "../utils/calculateOfferType";
import {
  blueOffer,
  greenOffer,
  orangeOffer,
  redOffer,
} from "../utils/offertTypes";
import calculateAge from "../utils/calculateAge";

export interface IDriver {
  id: number | null;
  name: string;
  lastName: string;
  birthday: string;
  dateObtDriverLicense: string;
  subscriptionDate: string;
  accidentNumber: number | null;
}

export const driverInitialState: IDriver[] = [];

const TableDriver = () => {
  const driverContext = useContext(DriverContext);

  const headers: string[] = [
    "Name",
    "Last Name",
    "Birthday",
    "Driver's License Date",
    "Subscription Date",
    "Age",
    "Accident Count",
    "Offer Type",
  ];

  const createHeaders = () => {
    return headers.map((header, headerKey) => (
      <th
        scope="col"
        key={headerKey}
        className="table-dark text-capitalize text-left align-top"
        style={{ verticalAlign: "top" }}
      >
        {header}
      </th>
    ));
  };

  // const calculateAge = (date: string) => {
  //   if (isValid(new Date(date))) {
  //     const ageString = formatDistanceToNow(new Date(date), {
  //       addSuffix: false,
  //     }).match(/\d+/)?.[0];
  //     if (ageString) {
  //       return parseInt(ageString);
  //     }
  //   }
  //   return 0;
  // };

  // const calculateOfferType = (
  //   age: number,
  //   accidentNumber: number | null,
  //   agePermis: number,
  //   seniority: number
  // ) => {
  //   if (accidentNumber === null) {
  //     return "";
  //   }

  //   let offerType = "";
  //   if (age < 25) {
  //     if (agePermis < 2) {
  //       offerType = accidentNumber === 0 ? "Rouge" : "Refusé";
  //     } else {
  //       offerType =
  //         accidentNumber === 0
  //           ? "Orange"
  //           : accidentNumber === 1
  //           ? "Rouge"
  //           : "Refusé";
  //     }
  //   } else if (age >= 25) {
  //     if (agePermis < 2) {
  //       offerType =
  //         accidentNumber === 0
  //           ? "Orange"
  //           : accidentNumber === 1
  //           ? "Rouge"
  //           : "Refusé";
  //     } else {
  //       if (accidentNumber === 0) {
  //         offerType = seniority > 5 ? "Bleu" : "Vert";
  //       } else if (accidentNumber === 1) {
  //         offerType = seniority > 5 ? "Vert" : "Orange";
  //       } else if (accidentNumber === 2) {
  //         offerType = seniority > 5 ? "Orange" : "Rouge";
  //       } else {
  //         offerType = "Refusé";
  //       }
  //     }
  //   }

  //   return offerType;
  // };

  const getOfferTypeStyle = (offerTypeClass: string) => {
    let backgroundColor = "transparent";
    switch (offerTypeClass) {
      case "bleu":
        backgroundColor = "blue";
        break;
      case "vert":
        backgroundColor = "green";
        break;
      case "orange":
        backgroundColor = "orange";
        break;
      case "rouge":
        backgroundColor = "red";
        break;
      default:
        break;
    }

    return {
      backgroundColor,
      color: "white",
      fontWeight: "bold",
    };
  };

  const createBody = () => {
    if (driverContext.driver.length > 0) {
      return driverContext.driver.map((item, driverKey) => {
        const age = calculateAge(item.birthday);
        const agePermis = calculateAge(item.dateObtDriverLicense);
        const seniority = calculateAge(item.subscriptionDate);
        // const offerType = calculateOfferType(
        //   age,
        //   item.accidentNumber,
        //   agePermis,
        //   seniority
        // );
        // const offerTypeClass = offerType.toLowerCase();

        return (
          <tr key={driverKey}>
            <td>{item.name}</td>
            <td>{item.lastName}</td>
            <td>{item.birthday}</td>
            <td>{item.dateObtDriverLicense}</td>
            <td>{item.subscriptionDate}</td>
            <td>{age} ans</td>
            <td>
              <input
                type="number"
                min={0}
                value={item.accidentNumber !== null ? item.accidentNumber : 0}
                onChange={(event) => {
                  const updatedDriver = {
                    ...item,
                    accidentNumber: parseInt(event.target.value),
                  };

                  const updatedDrivers = driverContext.driver.map(
                    (prevDriver) =>
                      prevDriver.id === item.id ? updatedDriver : prevDriver
                  );
                  driverContext.setDriver(updatedDrivers);
                }}
              />
            </td>
            <td>
              {calculateOfferType(
                age,
                item.accidentNumber,
                agePermis,
                seniority,
                [blueOffer, greenOffer, orangeOffer, redOffer]
              )}
            </td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan={headers.length}>No data found</td>
      </tr>
    );
  };

  return (
    <table className="table shadow-sm table-hover">
      <thead>
        <tr>{createHeaders()}</tr>
      </thead>
      <tbody>{createBody()}</tbody>
    </table>
  );
};

export default TableDriver;
