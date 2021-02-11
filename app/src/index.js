//arquivo inicial da aplicação

//importando as dependências
import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./main/Calculator";
import registerServiceWorker from "./registerServiceWorker";

//importando o estilo
import "./index.css";

//renderizando a aplicação
ReactDOM.render(
  <div>
    <h1>Calculadora</h1>
    <Calculator />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
