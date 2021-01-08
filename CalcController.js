class CalcController {
    
    constructor(){
        // Encapsulamento "_" significa que é privado//
        this._displayCalc = "0";
        this._dataAtual;

    }

    get displayCalc (){
        return this._displayCalc;
    }

    set displayCalc (valor){
        this._displayCalc = valor;
    }

    get dataAtual (){
        return this._dataAtual;
    }

    set dataAtual (valor){
        this.dataAtual = valor;
    }

};