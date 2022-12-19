const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: true,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class Reserva {
  constructor() {
    this._reservas = [];
    this._subtotal = 0;
    this._total = 0;
    this._iva = 21;
    this._descuento = 0;
    this._precioDesayuno = 15;
    this._totalDesayuno = 0;
    this._totalPersonaAdicional = 40;
    this._precioHabStandard = 100;
    this._precioHabSuite = 150;
    this._precioHabTourOperador = 100;
  }

  calcDesayuno() {
    this._totalDesayuno = this._reservas.reduce((acc, reserva) => {
      if (reserva.desayuno == true){
        acc += ((reserva.pax * this._precioDesayuno) + (reserva.noches * this._precioDesayuno));
      }
      return acc;
    }, 0);
  }

  calcExtraPrecioPersona (){
    this._totalPersonaAdicional = this._reservas.reduce((acc, reserva) => {
      if (reserva.pax > 1) acc += reserva.noches * this._totalPersonaAdicional;
      return acc;
    }, 0);
  }

  calcTotal() {
    this._total = this._subtotal - (this._subtotal * this._descuento) / 100;
    this._total = this._total * (this._iva / 100 + 1);
  }

  set reservas(reservas) {
    this._reservas = reservas;
    this.calcSubTotal();
    this.calcDesayuno();
    this.calcExtraPrecioPersona();
    this.calcTotal();
  }

  get subtotal() {
    return this._subtotal;
  }

  get total() {
    return this._total;
  }
}

class ReservaClienteParticular extends Reserva {
  constructor() {
    super();
  }
  factorTipoHabitacion(tipoHabitacion) {
    switch (tipoHabitacion) {
      case "standard":
        return this._precioHabStandard;
      case "suite":
        return this._precioHabSuite;
      default:
        console.log("no se ha encontrado ninguna reserva");
        break;
    }
  }

  calcSubTotal() {
    this._subtotal = this._precioDesayuno + this._totalPersonaAdicional + this._reservas.reduce((acc, reserva) => {
      acc += reserva.noches * this.factorTipoHabitacion(reserva.tipoHabitacion);
      if (reserva.pax > 1) acc += reserva.noches * 40;
      return acc;
    }, 0);
  }

  
}

const reserva1 = new ReservaClienteParticular();
reserva1.reservas = reservas;
console.log("-------- Reserva de Particulares --------");
console.log("Subtotal (IVA Excl.)", reserva1.subtotal);
console.log("Total (IVA Incl.)", reserva1.total);

class ReservaTourOperador extends Reserva {
  constructor() {
    super();
    this._descuento = 15;
  }

  calcSubTotal() {
    this._subtotal = this._reservas.reduce((acc, reserva) => {
      acc += reserva.noches * this._precioHabTourOperador;
      if (reserva.pax > 1) acc += reserva.noches * 40;
      return acc;
    }, 0);
  }
}

const tourOperado1 = new ReservaTourOperador();
tourOperado1.reservas = reservas;
console.log("-------- Reserva de Tour Operador --------");
console.log("Subtotal (IVA Excl.)", tourOperado1.subtotal);
console.log("Total (IVA Incl.)", tourOperado1.total);
