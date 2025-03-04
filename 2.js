class Persona {
  constructor(nombre, edad, trabajo) {
    this.nombre = nombre;
    this.edad = edad;
    this.trabajo = trabajo;
  }
  showInfo() {
    console.log(
      `${this.nombre} tiene ${this.edad} años y trabaja como ${this.trabajo}`
    );
  }
}
class Juan extends Persona {
  constructor(nombre, edad, trabajo) {
    super(nombre, edad, trabajo);
  }
}

const libro = {
  titulo: "El señor de los anillos",
  autor: "J.R.R. Tolkien",
  año: 1954,
};

libro.año = 1955;

console.log(libro.año);

const coche = {
  marca: "Ford",
  modelo: "Mustang",
  año: 1969,

  informacionCoche() {
    console.log(`El coche es ${this.marca} ${this.modelo} del año ${this.año}`);
  },
};
coche.informacionCoche();

const Empresa = {
  nombre: "Google",
  ubicacion: "Estados Unidos",
  empleados: [
    { nombre: "Juan", edad: 25 },
    { nombre: "Maria", edad: 30 },
    { nombre: "Pedro", edad: 35 },
  ],
  mostrarEmpleados() {
    this.empleados.forEach((empleado) => {
      console.log(`${empleado.nombre} tiene ${empleado.edad} años`);
    });
  },
};
