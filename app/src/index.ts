import * as bootstrap from "bootstrap";
import { Table } from "./ts/Table";

console.log("Hello World!");

const table = new Table();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  table.setHeader(["Nom", "Prénom", "Date de naissance"]);
  console.log(root);

  if (root) {
    root.innerHTML = table.render();
  }
});
