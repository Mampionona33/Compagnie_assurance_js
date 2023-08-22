import * as bootstrap from "bootstrap";
import { Table } from "./ts/Table";

console.log("Hello World!");

const table = new Table();
table.setHeader(["Nom", "Prénom", "Date de naissance","age","dete optention permis","date d'adhésion","nombre d'accident","tarif"]);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  if (root) {
    root.innerHTML = table.render();
  }
});
