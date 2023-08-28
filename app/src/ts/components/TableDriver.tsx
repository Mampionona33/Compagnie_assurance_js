import React, { useContext } from "react";
import { DriverContext } from "../App";
import { formatDistanceToNow, isValid } from "date-fns";

export interface IDriver {
  id: number | null;
  name: string;
  lastName: string;
  birthday: string;
  subscriptionDate: string;
  accidentNumber: number | null;
}

export const driverInitialState: IDriver[] = [];

const TableDriver = () => {
  const driverContext = useContext(DriverContext);

  const headers: string[] = [
    "nom",
    "prénom",
    "date de naissance",
    "date d'adhésion",
    "âge",
    "nombre d'accident",
    "tarif",
  ];

  const createHeaders = () => {
    return headers.map((header, headerKey) => (
      <th key={headerKey} className="table-dark text-capitalize">
        {header}
      </th>
    ));
  };

  const calculateAge = (date: string) => {
    if (isValid(new Date(date))) {
      return formatDistanceToNow(new Date(date), { addSuffix: false }).match(
        /\d+/
      )?.[0];
    }
  };

  const createBody = () => {
    if (driverContext.driver.length > 0) {
      return driverContext.driver.map((item, driverKey) => {
        console.log(driverContext.driver);

        const age = calculateAge(item.birthday);
        return (
          <tr key={driverKey}>
            <td>{item.name}</td>
            <td>{item.lastName}</td>
            <td>{item.birthday}</td>
            <td>{item.subscriptionDate}</td>
            <td>{age} ans</td>
            <td>
              <input
                type="number"
                value={item.accidentNumber ? item.accidentNumber : 0}
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
            <td></td>
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
    <table className="table table-striped shadow-sm">
      <thead>
        <tr>{createHeaders()}</tr>
      </thead>
      <tbody>{createBody()}</tbody>
    </table>
  );
};

export default TableDriver;
