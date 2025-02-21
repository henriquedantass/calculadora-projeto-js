class CalcController {

    constructor() {
        // Encapsulamento "_" significa que é privado//
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents()
        this.initKeys()
    }

    pasteFromClipboard () {   // metodo para dar ctrl v em dados já copiados e adicionalos ao displau.

        document.addEventListener('paste', event => {
            let text = event.clipboardData.getData('Text');
            if (isNaN(text)) {

            } else {
                this.displayCalc = parseFloat(text);
            }
        })
        
    }
    copyToClipboard() {  // meotodo para copiar com ctrl c o que está no display da calculadora.

        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove(); 



    }
    // DOM - DOCUMENT OBJECT MODEL 
    // MANIPUALÇÃO DO DOM POR MEIO DE EVENTOS
    // document.querrySelector[];

    //Initialize é o método que irá realizar as primeiras alterações quando a calculadora
    // for inicializada. Nesse caso ele ira selecionar o display, data e hora e colocar
    // valores no HTML por meio do "innerHTML"
    initialize() { // metodo para iniciar a calculadora (data e hora)
    
        this.setLastNumberToDisplay();

        this.setDisplayDateTime();

        setInterval(() => { // setInterval - Função executada em um intervalo de tempo. Recebe dois parâmetros : uma função  e o espaço de tempo de execução.
            this.setDisplayDateTime()
        }, 1000);
        this.pasteFromClipboard (); 
    }

    initKeys() {
        document.addEventListener('keyup', event => {
           
            switch (event.key) {
                case 'Escape':
                    this.allClear();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;

                case '%':                   
                case '/':    
                case '*':
                case '-':
                case '+':
                    this.addOperation(event.key);
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '=':
                case 'Enter':
                    this.calc();
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
                    this.addOperation(parseInt(event.key));
                    break;

                case 'c':
                    if (event.ctrlKey) this.copyToClipboard();
                    break;
              
            }
        }); 
    }

    addEventListenerAll(element, events, fn) { //metodo criado para adicionar 2 eventos simultaneos
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })

    };
    allClear() { // metodo para dar clear no array do operation
        this._operation = [];
        this.lastOperation = "";
        this.lastNumber = "";
        this.setLastNumberToDisplay();
    }
    clearEntry() { // metodo para dar clear ao que foi recentemente adicionado ao array
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    setError(){ // metodo para apresentar no display caso aconteça algum error
        this.displayCalc = "error";
    }
    getLastOperation(){  // metodo criado para pegar o ultimo elemento do array de operações
        return this._operation[this._operation.length-1]; // lenght para saber a quantidade de elementos, e subtrair 1 para pegar o ultimo elemento do array.


    }
    setLastOperation (value) { // metodo para retornar a ultima operação na calculadora
        this._operation[this._operation.length-1] = value;
    }
    isOperator(value) { // metodo para identificar operadores
        
        if(['+', '-', '*', '%','/'].indexOf(value) > -1) {
            return true;
        } else {
            return false;
        }
    }
    

    pushOperation(value){
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
            console.log(this._operation);

        }
    }

    getResult () {
        try {
            return eval(this._operation.join(""));

        } catch (error) {
            setTimeout(() => {
                this.setError();
            },1) 
        }
    }
 

    calc () {  // metodo para realizar as operações dos operadores

        let last;
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this.lastNumber];

        }

        if (this._operation.length > 3) {
            last = this._operation.pop();

            this._lastOperator = this.getLastItem();

            this.lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this.lastNumber = this.getLastItem(false);
        }
        
        let result = this.getResult()  // aqui o array é transformado em string usando o join que aplica os separadores.

        if (last == '%') {

            result = result / 100;
            this._operation = [result];

        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
        
       
        this.setLastNumberToDisplay();

    }


    getLastItem (isOperator = true) {

        let lastItem;

        for (let i = this._operation.length -1; i >= 0; i --) {

                if (this.isOperator(this._operation[i]) == isOperator) {

                    lastItem = this._operation[i];
                    break;

                }
        }
        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this.lastNumber;
        }

        return lastItem;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }


    addOperation(value){ // metodo para adicionar operações

        if(isNaN(this.getLastOperation())) { // verifica se a ultima operação é ou não é um numero
           

            if (this.isOperator((value))){  // verifica qual é o operador, pois a ultima operação não é um numero
    
                this.setLastOperation(value);
                
            } else if (isNaN(value)) {  // outra coisa que não seja numero ou operador
                
            } else { 
               
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }
        } else {  
            
            if (this.isOperator(value)) { // adiciona o operador no array 
                
                this.pushOperation(value);

            }   else { // se o value for um numero, esse ultimo numero atribuido ao array é transformar em string e contatenado ao valor do array também em forma de string.
                 
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);  // apos serem transformados em strings o valor é adicionado ao array.
            this.setLastNumberToDisplay(value);
            }        
        }
    }

    addDot() {
       // verificar se o numero digitado é um operador
       // verificar se é vazio
       // se for um operador ou se for vazio, eu devo adicionar o "0." pois não há numero nem operação.

       let lastOperation = this.getLastOperation();
    
       if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
         
       if (this.isOperator(lastOperation) || !lastOperation) { // metodo que verifica se é um operador.
           this.pushOperation('0.');
       } 
       
       // se o metodo verificou que a operação não é vazia e não é um operador, foi adicionado o 0. , mas se a ultima operação for um número, é necessario contatenar o "." com o numero.
       
       else {
           this.setLastOperation(lastOperation.toString() + ".");  // metodo de pegar  a ultima operação.
       }

       this.setLastNumberToDisplay();   // metodo que adiciona o numero ao display.
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
                this.addOperation('%');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'ponto':
                this.addDot();
                break;
            case 'igual':
                this.calc();
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
        if (value.toString().length > 10) {
            this.setError();
            return false ;
        }
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