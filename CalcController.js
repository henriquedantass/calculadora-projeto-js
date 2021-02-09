class CalcController {

    constructor() {
        // Encapsulamento "_" significa que é privado//
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents()

    }
    // DOM - DOCUMENT OBJECT MODEL 
    // MANIPUALÇÃO DO DOM POR MEIO DE EVENTOS
    // document.querrySelector[];

    //Initialize é o método que irá realizar as primeiras alterações quando a calculadora
    // for inicializada. Nesse caso ele ira selecionar o display, data e hora e colocar
    // valores no HTML por meio do "innerHTML"
    initialize() {
        // setInterval - Função executada em um intervalo de tempo. 
        // Recebe dois parâmetros : uma função  e o espaço de tempo de execução.
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);

    }
    //metodo criado para adicionar 2 eventos simultaneos
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })

    };
    allClear() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }
    setError(){
        this.displayCalc = "error";
    }
    addOperation(value){
        this._operation.push(value);
        console.log(this._operation)
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.allClear();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'porcento':
                this.addPorcento();
                break;
            case 'divisao':
                break;
            case 'multiplicacao':
                break;
            case 'subtraçao':
                break;
            case 'soma':
                break;
            
            case '0':            
            case '1':           
            case '2':          
            case '3':            
            case '4':           
            case '5':           
            case '6':           
            case '7':           
            case '8':           
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                 this.setError();
                 break;
                       

        }
    }




    initButtonsEvents() {
        // let buttons foi uma variavel definida para selecionar todos os botões do HTML, para isso foi usado
        // o querrySelectorAll que seleciona todos os filhos do id #buttons e filhos do id #parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        // após os botões selecionados, para cada botão (forEach) eu devo executar uma função de selecionar
        // o botão, e pegar seu index após o evento de click.  
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");  //replace utilizado para a função retonar apenas a string com o número do botão ou nome, o replace funciona com substituição dependedo do paramêtro utilizado. Nesse caso, o replace retira o "btn-" e coloca no lugar dele um valor vazio "".
                this.execBtn(textBtn)
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => { //evento para colocar um pointer ao passar o mouse por cima do elemento.
                btn.style.cursor = "pointer"
            });
        });

    }



    // metodos get e set permitem acessar valores  set tem função de definir um valor 
    // innerHTML = seleciona o objeto e coloca uma informação nele  em formato HTML.


    // Método criado para iniciar o display de tempo e hora da calculadora.
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "short",
            year: "numeric"
            // day, month e year podem ser personalizados, se for de interesse do dev.
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    };


    get displayCalc() {
        return this._displayCalcEl.innerHTML; // innerHTML = seleciona o objeto e coloca uma informação nele  em formato HTML.
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get currentDate() {
        // Date é uma classe nativa do JS para datas.
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

};