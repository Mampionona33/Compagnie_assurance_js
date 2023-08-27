import React, { useContext, useState } from "react";
import { DriverContext } from "../App";

const TableDriver = () => {
  const driver = useContext(DriverContext);

  const headers: string[] = [
    "nom",
    "prénom",
    "date de naissance",
    "date d'adhésion",
    "nombre d'accident",
    "tarif",
  ];

  const createHeaders = () => {
    return headers.map((header, headerKey) => {
      return (
        <th key={headerKey} className="table-dark text-capitalize">
          {header}
        </th>
      );
    });
  };

  const createBody = () => {
    if (driver.length > 0) {
      return driver.map((item, driverKey) => {
        return <td key={driverKey}>{item}</td>;
      });
    }
    return <td colSpan={headers.length}>No data found</td>;
  };

  return (
    <table className="table table-striped shadow-sm">
      <thead>
        <tr>{createHeaders()}</tr>
      </thead>
      <tbody>
        <tr>{createBody()}</tr>
      </tbody>
    </table>
  );
};

export default TableDriver;
