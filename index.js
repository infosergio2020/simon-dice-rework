
    // DECLARACION DE ELEMENTOS DEL JUEGO
    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const btnEmpezar = document.getElementById('btnEmpezar')
    const ULTIMO_NIVEL = 10

    //ver NOTA:1 al pie de pagina
    class Juego {
            constructor() {
                this.inicializar = this.inicializar.bind(this)
                this.inicializar()
                this.generarSecuencia()
                setTimeout(this.siguienteNivel, 500)
            }

        inicializar() {
            this.siguienteNivel = this.siguienteNivel.bind(this)
            this.elegirColor = this.elegirColor.bind(this)
            this.toggleBtnEmpezar()
            this.nivel = 1
            this.colores = {
                celeste,
                violeta,
                naranja,
                verde,
            }
        }

        // ver NOTA 2
        toggleBtnEmpezar(){
            if (btnEmpezar.classList.contains('hide')) {
                btnEmpezar.classList.remove('hide')
            }   else {
                btnEmpezar.classList.add('hide')
            }
        }

        // ver NOTA 3
        generarSecuencia() {
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        }
    

        siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        }

        transformarNumeroAColor(numero){
            switch (numero) {
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


        iluminarSecuencia(){
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(() => this.iluminarColor(color), 1000 * i) 
            }
          }

        iluminarColor(color){
            this.colores[color].classList.add('light')
            setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color) {
            this.colores[color].classList.remove('light')
        }

        agregarEventosClick(){
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick() {
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev) {
            const nombreColor = ev.target.dataset.color
            this.iluminarColor(nombreColor)
            const nombreSecuenciaActualColor = this.colores[this.transformarNumeroAColor(this.secuencia[this.subnivel])].dataset.color;
            if(nombreColor === nombreSecuenciaActualColor){
                this.subnivel++
                if(this.subnivel === this.nivel) {
                    this.nivel++
                    this.eliminarEventosClick()
                    this.continuarOGanaste(this.nivel)
                }
            } else {
                this.perdioElJuego()
            }
        }

        continuarOGanaste(nivel){
            if (nivel === (ULTIMO_NIVEL + 1)){
                this.ganoElJuego()
            } else {
                setTimeout(this.siguienteNivel, 1500)
                } 
        }

        ganoElJuego() {
            swal('Yay!', 'Felicitaciones, ganaste el juego!', 'success')
            .then(this.inicializar)
        }

        perdioElJuego() {
            swal('Oops!', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
        }
    }
    
    
    function empezarJuego() {
        window.juego = new Juego()
    }



// NOTA 1: 
//para no perder la referencia con las propiedades de la clase Juego
//se realiza un .bind(this) de esta forma no se hara referencia a las propiedades globales

// NOTA 2:
// necesito visualizar el boton la primera vez que un usuairo ingrese al juego
// la posibilidad de comenzar con el juego, utilizaré la clase hide para poder 

// NOTA 3:
// voy a generar una secuencia de 10 numero aleatorios entre 0 y 4
// Math.floor(Math.random() * 4)