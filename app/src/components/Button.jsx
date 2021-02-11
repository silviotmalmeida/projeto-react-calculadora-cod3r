//importando as dependências
import React from "react";

//importando o estilo
import "./Button.css";

//criando o componente funcional button
export default (props) => {
  //criando a variável que agrupará as classes css do componente
  let classes = "button ";

  //se o atributo operation estiver setado, usa-se também a classe css operation
  //(categorizando como um botão de operação matemática)
  classes += props.operation ? "operation" : "";

  //se o atributo double estiver setado, usa-se também a classe css double
  //(dobrando o tamanho do botão)
  classes += props.double ? "double" : "";

  //se o atributo triple estiver setado, usa-se também a classe css triple
  //(triplicando o tamanho do botão)
  classes += props.triple ? "triple" : "";

  //retornando o componente
  return (
    <button
      //definindo o evento de click
      //se existir um atributo click setado, executa a referida função passando a label
      onClick={(e) => props.click && props.click(props.label)}
      //inserindo as classes css
      className={classes}
    >
      {/* exibindo a label do componente */}
      {props.label}
    </button>
  );
};
