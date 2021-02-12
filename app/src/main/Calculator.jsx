//importando as dependências
import React, { Component } from "react";
import Button from "../components/Button";
import Display from "../components/Display";

//importando o estilo
import "./Calculator.css";

//definindo o estado inicial das variáveis do componente
const initialState = {
  //valor exibido no display
  displayValue: "0",

  //variável que armazena a necessidade de limpar o display
  clearDisplay: false,

  //operação a ser efetuada
  operation: null,

  //array com os operandos
  values: [0, 0],

  //ponteiro do array de operandos
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
    //função responsável por realizar as operações matemáticas

    //se o ponteiro do array de operandos for zero:
    if (this.state.current === 0) {
      //atualiza o estado do componente com a operação selecionada,
      //incrementa o ponteiro e autoriza a limpeza do display
      this.setState({ operation, current: 1, clearDisplay: true });

      //senão:
    } else {
      //se a operação selecionada for '=', equals recebe true
      const equals = operation === "=";

      //obtendo o operador selecionado
      const currentOperation = this.state.operation;

      //obtendo o array de operandos
      const values = [...this.state.values];

      //tenta realizar a operação
      try {
        //se a operação for bem sucedida, armazena na posicao 0 do array de operandos
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        //senão, utiliza o valor do estado atual do componente
        values[0] = this.state.values[0];
      }

      //zera a posição 1 do array de operandos
      values[1] = 0;

      //atualizando o estado do componente
      this.setState({
        //atualiza o display com o resultado da operação, convertendo para string
        displayValue: values[0].toString(),

        //caso não tenha pressionado o '=', mantém a operação selecionada
        operation: equals ? null : operation,

        //caso não tenha pressionado o '=', incrementa o ponteiro
        //do array de operandos
        current: equals ? 0 : 1,

        //caso não tenha pressionado o '=', autoriza a limpeza do display
        //para a entrada do segundo operando
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    //função responsável por incluir um dígito no display

    //se o botão digitado for o '.' e já existir algum '.' no display:
    if (n === "." && this.state.displayValue.includes(n)) {
      //não inclui o dígito
      return;
    }

    //o display será limpo antes de incluir o novo dígito quando:
    const clearDisplay =
      //o valor atual é zero (para evitar zeros à esquerda) ou
      this.state.displayValue === "0" ||
      //a variável clear display estiver setada como true
      this.state.clearDisplay;

    //o dígito atual só sera considerado caso clearDisplay seja false
    const currentValue = clearDisplay ? "" : this.state.displayValue;

    //o novo número a ser exibido será o dígito atual
    //concatenado com o novo dígito n
    const displayValue = currentValue + n;

    //atualizando o novo número no display e
    //falseando o clearDisplay no estado do componente
    this.setState({ displayValue, clearDisplay: false });

    //se o botão digitado não for o '.':
    if (n !== ".") {
      //obtendo o ponteiro atual do array de operandos
      const i = this.state.current;

      //convertendo o número atual do display para float
      const newValue = parseFloat(displayValue);

      //obtendo o array atual de operandos
      const values = [...this.state.values];

      //populando a posição do ponteiro no array de operandos
      values[i] = newValue;

      //atualizando o array de operandos no estado do componente
      this.setState({ values });
      console.log(values);
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
