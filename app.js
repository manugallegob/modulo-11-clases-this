const reservas = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

class ReservaParticular {
  constructor() {
    this._reservas = [];
    this._subtotal = 0;
    this._total = 0;
    this._iva = 21;
  }

  factorTipoHabitacion(tipoHabitacion) {
    switch (tipoHabitacion) {
      case "standard":
        return 100;
      case "suite":
        return 150;
      default:
        console.log("no se ha encontrado ninguna reserva");
        break;
    }
  }

  calcSubTotal() {
    this._subtotal = this._reservas.reduce((acc, reserva) => {
      acc += reserva.noches * this.factorTipoHabitacion(reserva.tipoHabitacion);
      if (reserva.pax > 1) acc += reserva.noches * 40;
      return acc;
    }, 0);
  }

  calcTotal() {
    this._total = this._subtotal * ((this._iva / 100)+1);
  }

  set reservas(reservas) {
    this._reservas = reservas;
    this.calcSubTotal();
    this.calcTotal();
  }

  get subtotal() {
    return this._subtotal;
  }

  get total() {
    return this._total;
  }
}

const reserva1 = new ReservaParticular();
reserva1.reservas = reservas;
console.log ("-------- Reserva de Particulares caso 1--------");
console.log("Subtotal (IVA Excl.)", reserva1.subtotal);
console.log("Total (IVA Incl.)", reserva1.total);


class ReservaEmpresa extends ReservaParticular {
  constructor(){
    super();
    this._precioHabGrandesVol = 100;
    this._descuento = 15;
  }

  calcSubTotal() {
    this._subtotal = this._reservas.reduce((acc, reserva) => {
      acc += reserva.noches * this._precioHabGrandesVol;
      if (reserva.pax > 1) acc += reserva.pax * 40;
      return acc;
    }, 0);
  }

  calcTotal() {
    this._total = this._total - ( this._total * (this._descuento / 100));
    this._total = this._subtotal * ((this._iva / 100)+1);

  }


}

const reservaTour1 = new ReservaEmpresa();
reservaTour1.reservas = reservas;
console.log ("-------- Reserva de Tour Caso 2--------");
console.log("Subtotal", reservaTour1.subtotal);
console.log("Total - descuento + IVA", reservaTour1.total);
