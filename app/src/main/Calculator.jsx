//importando as dependências
import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";

//importando o estilo
import "./Calculator.css";

//definindo o estado inicial das variáveis do componente
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  //classe responsável por criar o componente calculator

  //carregando o estado inicial
  state = { ...initialState };

  //definindo a função construtora
  constructor(props) {
    //usando o construtor da superclasse
    super(props);

    //definindo o escopo do this para o objeto da classe,
    //quando utilizar os métodos abaixo

    //função para limpar a memória
    this.clearMemory = this.clearMemory.bind(this);

    //função para definir a operação atual
    this.setOperation = this.setOperation.bind(this);

    //função para inserir um dígito na operação
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    //função responsável por limpar a memória,
    //recarregando o estado inicial do componente
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    // console.log(this);

    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    console.log(this);

    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      // console.log(values);
    }
  }

  //função que renderiza o componente
  render() {
    return (
      <div className="calculator">
        {/* renderizando o display */}
        <Display value={this.state.displayValue} />

        {/* renderizando os botões */}
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
