const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        setTimeout(() => {
            this.inicializar()
            this.secuencia()
            this.siguienteNivel()
        }, 500)
        
    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtn()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toggleBtn(){
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }
    secuencia() {
        this.generarSecuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarClicks()
    }
    numAColor(n) {
        switch (n) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    colorANum(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.numAColor(this.generarSecuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)

        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    agregarClicks() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarClicks(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        const nomColor = ev.target.dataset.color
        const numeroColor = this.colorANum(nomColor)
        if (numeroColor === this.generarSecuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarClicks()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.gana()
                }else{
                    setTimeout(this.siguienteNivel.bind(this), 1500)
                }
            }
        }else{
            this.pierde()
        }
        // console.log(ev)
    }
    gana(){
        swal('Has ganado', 'Enhorabuena', 'success')
        .then(this.inicializar.bind(this))
    }
    pierde(){
        swal('Has perdido', 'Suerte para la próxima', 'error')
        .then(() =>{
            this.eliminarClicks()
            this.inicializar()
        })
    }
}

function empezarJuego() {
    window.juego = new Juego()
}