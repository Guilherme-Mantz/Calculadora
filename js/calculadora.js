let valorAtual = document.querySelector('#valor-atual');
let valorAnterior = document.querySelector('#valor-anterior');
let numeros = document.querySelectorAll('.numero');
let limpar = document.querySelector('#C');
let calculo = document.querySelectorAll('.operador');
let excluirNum = document.querySelector('#excluiNumero');

class Calculadora{
    soma(valorA, valorB){
        return valorA + valorB;
    };
    diferenca(valorA, valorB){
        return valorA - valorB;
    };
    divide(valorA, valorB){
        return valorA / valorB;
    };
    multiplica(valorA, valorB){
        return valorA * valorB;
    };
};

class Display{
    constructor(valorAtual, valorAnterior){
        this.displayValorAtual = valorAtual;
        this.displayValorAnterior = valorAnterior;
        this.valorAtual = '';
        this.valorAnterior = '';
        this.obterResultado = new Calculadora();
        this.operation = undefined;
        this.sinais = {
            soma: '+',
            diferenca: '-',
            divide: '/',
            multiplica: 'x'
        }
    };

    excluirNum(){
        this.valorAtual = this.valorAtual.toString().slice(0, -1);
        this.imprimir()
    }

    limpar(){
        this.valorAtual = '',
        this.valorAnterior = '',
        this.operation = undefined;
        this.imprimir();
    }

    atribuiNumber(numero){
        if(numero === '.' && this.valorAtual.includes('.')){return}
        this.valorAtual = this.valorAtual.toString() + numero.toString();
        this.imprimir();
    };

    tipoDeoperador(tipo){
        this.operation !== 'igual' && this.resultado();
        this.operation = tipo;
        this.valorAnterior = this.valorAtual || this.valorAnterior;
        this.valorAtual = '';
        this.imprimir();    
    };

    imprimir(){
        this.displayValorAtual.textContent = this.valorAtual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.sinais[this.operation] || ''}`;
    };

    resultado(){
        let valorAtual = parseFloat(this.valorAtual);
        let valorAnterior = parseFloat(this.valorAnterior);
        
        if( isNaN(valorAtual) || isNaN(valorAnterior)){ return }
        this.valorAtual = this.obterResultado[this.operation](valorAnterior, valorAtual)
    };

};

let display = new Display(valorAtual, valorAnterior);

numeros.forEach((number) => {
    number.addEventListener('click', () => {
        display.atribuiNumber(number.innerHTML);
    });
});

calculo.forEach((operador) => {
    operador.addEventListener('click', () => {
        display.tipoDeoperador(operador.value);
    });
});

excluirNum.onclick = () => {
    display.excluirNum();
};

limpar.onclick = () => {
    display.limpar();
};