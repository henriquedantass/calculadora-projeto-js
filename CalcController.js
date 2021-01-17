class CalcController {
    
    constructor(){
        // Encapsulamento "_" significa que é privado//
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();

    }
    // DOM - DOCUMENT OBJECT MODEL 
    // MANIPUALÇÃO DO DOM POR MEIO DE EVENTOS
    // document.querrySelector[];

    //Initialize é o método que irá realizar as primeiras alterações quando a calculadora
    // for inicializada. Nesse caso ele ira selecionar o display, data e hora e colocar
    // valores no HTML por meio do "innerHTML"
    initialize () {
       // setInterval - Função executada em um intervalo de tempo. 
       // Recebe dois parâmetros : uma função  e o espaço de tempo de execução.
        setInterval(() => {
            this.displayDate = this.currentDate.toLocaleDateString(this._locale);
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        },1000);

    }
    // metodos get e set permitem acessar valores 
    // innerHTML = seleciona o objeto e coloca uma informação nele 
    // em formato HTML.
    get displayCalc (){
        return this._displayCalcEl.innerHTML;
    }
    // set tem função de definir um valor 
    set displayCalc (valor){
        this._displayCalcEl.innerHTML = valor;
    }

    get displayTime() { 
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate () {
        return  this._dateEl.innerHTML;
    }

    set displayDate (value) {
        return this._dateEl.innerHTML = value;
    }

    get currentDate (){
        // Date é uma classe nativa do JS para datas.
        return new Date();
    }

    set currentDate (value){
        this._currentDate = value;
    }

};