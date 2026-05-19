let clientes = [
  {cedula: 1748596603, nombre: "Eduardo", apellido: "Guerrero", telefono: "096758876", ingresos: 1000, egresos: 800, correo: "edu.guerrero@mail.com"},
  {cedula: 1712345678, nombre: "Juan", apellido: "Pérez", telefono: "096758877", ingresos: 1200, egresos: 500, correo: "JPérez@gmail.com"},
  {cedula: 1723456789, nombre: "Maria", apellido: "Gómez", telefono: "096758878", ingresos: 1500, egresos: 600, correo: "MaríaGómez@outlook.com"},
  {cedula: 1734567890, nombre: "Carlos", apellido: "Ramirez", telefono: "096758879", ingresos: 900, egresos: 350, correo: "Car.Ram@yahoo.com"},
  {cedula: 1701234567, nombre: "Carlos", apellido: "Mendoza", telefono: "0991234567", ingresos: 8500, egresos: 3200, correo: "carlos.mendoza@gmail.com"},
  {cedula: 1756789012, nombre: "Ana", apellido: "Paredes", telefono: "0982345678", ingresos: 12000, egresos: 4500, correo: "ana.paredes@hotmail.com"},
  {cedula: 1709876543, nombre: "Luis", apellido: "Carrillo", telefono: "0973456789", ingresos: 3200, egresos: 1800, correo: "luis.carrillo@gmail.com"},
  {cedula: 1798765432, nombre: "María", apellido: "Sánchez", telefono: "0964567890", ingresos: 15000, egresos: 6000, correo: "maria.sanchez@yahoo.com"},
  {cedula: 1745678901, nombre: "Jorge", apellido: "Villacís", telefono: "0955678901", ingresos: 9800, egresos: 2100, correo: "jorge.villacis@gmail.com"}
];

let creditos = [];
let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

let listaContactos = [
  {nombre: "Jasinto", numero: "0994756627"},
  {nombre: "Ana", numero: "0994756638"},
  {nombre: "Nicolas", numero: "0994743838"}
]

function pintarContactos(listaContactos){
  let tabla = recuperarElemento("tablaContactos")
  let contenedor = "";
    for(i = 0; i < listaContactos.length; i++){
      let contacto = listaContactos[i];
      contenedor+=
      `<tr>
        <td>${contacto.nombre}</td>
        <td>${contacto.numero}</td>
      </tr>`
    }
    tabla.innerHTML = contenedor
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones(){
  //Quitar la clase activa a todas las secciones por su id
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}

//funcion que muestra solo la seccion cuyo id recibe como parametro 
function mostrarSeccion(id){
  //incovamos la funcion 
  ocultarSecciones(); 
  //Agregamos la clase activa solo a la seccion indicada
  document.getElementById(id).classList.add("activa");

  if(id == "listaContactos"){
    pintarContactos(listaContactos);
  }
}

function guardarTasa(){
  //obtener el valor input y convertirlo a numero
  let tasa = recuperarFloat("tasaInteres");
  //validamos que este entre el 10 y 20
  if(tasa >= 10 && tasa <=20){
    //si es valido, guaradamos la variable y mostramos mensaje exitoso
    tasaInteres = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");

  }else{
    // si no es valido mostramos mensaje de error 
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarMontoMax(){
  let monto = recuperarFloat("montoMax");
  //validamos que este entre el 10 y 20
  if(monto >= 5000 && monto <=30000){
    //si es valido, guaradamos la variable y mostramos mensaje exitoso
    montoMaximo = monto;
    mostrarTexto("mensajeMonto", "Monto configurado correctamente: " + monto);
  }else{
    // si no es valido mostramos mensaje de error 
    mostrarTexto("mensajeMonto", "El monto debe estar entre 2 mil y 30 mil");
  }
}

function borrarMonto(){
  document.getElementById("montoMax").value = ""
}

function guardarCliente(){
  
  //obtetener datos de formulario utilizando utilitarios
  let cedula = recuperaraTexto("cedula");
  let nombre  = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let telefono = recuperaraTexto("telefono")
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");
  let correo = recuperaraTexto("cmpCorreo");
  let soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/  //esto es una regla para que se valide si el nombre y apellido ingresados son si o si letras
  let soloNumeros = /^\d+$/ //regla que se usa para que reconosca todos los dígitos del 0 aL 9 USANDO "\d" simobolos como "^" y "$" hace que valide desde el inicio hasta el fin, el signo de "+" hace que puedan haber más númerosía me
  
  //||VALIDACIONES||//

  if(!cedula || !cedula.trim()){
    alert("Debe ingresar un número de cédula válido");
  return null;
  }else if(cedula.trim().length !=10){
    alert("El número de cédula debe tener exactamente 10 dígitos");
    return null;
  }else if(!soloNumeros.test(cedula)){
    alert("La cédula solo puede contener números");
    return null;
  }
  if(!nombre.trim()){
    alert("Nombre no válido");
  return null;
  }else if(!soloLetras.test(nombre)){
    alert("El nombre solo puede contener letras");
  }
  if(!apellido.trim()){
    alert("Apellido no válido");
  return null;
  }else if(!soloLetras.test(apellido)){
    alert("El apellido solo puede contener letras")
  }
  if(isNaN(ingresos)||ingresos <= 0){
    alert("El valor ingresado no es válido");
    return null
  }
  if(isNaN(egresos)||egresos <= 0){
    alert("El valor ingresado no es válido");
    return null;
  }

  if(!correo.trim()){
    alert("Ingrese un correo válido");
    return null;
  }
  //Buscamos si el cliente ya existe
  let clienteExiste = buscarCliente(cedula);

  // si no existe lo creamos
  if(clienteExiste == null){

  //creamos el objeto cliente
  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    ingresos: ingresos,
    egresos: egresos,
    correo: correo
  };

  //agregamos el objeto al arreglo
  clientes.push(cliente);
  }else{
    //si existe actualizamos sus datos exepto la cedula
    clienteExiste.nombre = nombre;
    clienteExiste.apellido = apellido;
    clienteExiste.ingresos = ingresos;
    clienteExiste.telefono = telefono
    clienteExiste.egresos = egresos;
    clienteExiste.correo = correo;
  }

  pintarClientes();
}
function pintarClientes(){
  // limpiar la tabla antes de volver a pintar 
  let tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  // Recorrer el arreglo de clientes
  for(let i = 0; i < clientes.length; i++){
    //Tomamos el cliente de turno
    let cliente = clientes[i];

    //creamos una fila con sus datos y boton actualizar
    tabla.innerHTML += "<tr>"+
      "<td>" + cliente.cedula + "</td>" + 
      "<td>" + cliente.nombre + "</td>" + 
      "<td>" + cliente.apellido + "</td>" +
      "<td>" + cliente.telefono + "</td>" + 
      "<td>" + cliente.ingresos + "</td>" + 
      "<td>"+ cliente.egresos + "</td>" + 
      "<td>" + cliente.correo + "</td>"+
      "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button>" +
      "<button onclick=\"eliminarCliente('" + cliente.cedula + "')\">Eliminar</button></td>" +
    "</tr>"
  }
}
function buscarCliente(cedula){
  //Recorremos el arreglo buscando la cedula
  for(let i = 0; i < clientes.length; i++){
    //Si encontramos la cedula retorna
    if(clientes[i].cedula == cedula){
      return clientes[i];
    }
  }
  //Si no retorna null
  return null;
}

function seleccionarCliente(cedula){
  //buscar al cliente // guardarlo en clientesseleccionado
  clienteSeleccionado = buscarCliente(cedula);

  //Mostar datos de cada input 
  mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
  mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
  mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
  mostrarTextoEnCaja("apellido", clienteSeleccionado.telefono);
  mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
  mostrarTextoEnCaja("cmpCorreo", clienteSeleccionado.correo)
}

//limpia las casillas donde guardamos los datos

function limpiar(){
  //vaiar cada input
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("telefono", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");
  mostrarTextoEnCaja("cmpCorreo","");
}

//eliminamos al cliente 

eliminarCliente = function(cedula){
  for(let  i = 0; i < clientes.length; i++){
    if(clientes[i].cedula == cedula){
      clientes.splice(i,1);
      break;
    }
  }
  pintarClientes()
}

//al buscar al cliente mediante la cédula se generará la siguietne información:

function buscarClienteCredito(){
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteEncontrado = buscarCliente(cedula);
    if(clienteEncontrado != null){

      clienteSeleccionado = clienteEncontrado

      let cmpClienteCredito = document.getElementById("datosClienteCredito");
      cmpClienteCredito.innerHTML =
      "Cédula: "+clienteEncontrado.cedula+"<br>"+
      "Nombre: "+clienteEncontrado.nombre+"<br>"+
      "Apellido: "+clienteEncontrado.apellido+"<br>"+
      "Telefono: "+clienteEncontrado.telefono+"<br>"+
      "Ingresos: "+clienteEncontrado.ingresos+"<br>"+
      "Egresos: "+clienteEncontrado.egresos +"<br>"+
      "Correo Electrónico: " +clienteEncontrado.correo + "<br>";
    }else{
      clienteSeleccionado = null;
      alert("Cliente no encontrado")
      limpiar()
    }
}



function calcularDisponible(ingresos,arriendo,alimentacion,varios){
    let valorDisponible;
    valorDisponible = ingresos - (arriendo+alimentacion+varios);
    if(valorDisponible<0){
        return "0";
    }
    return valorDisponible;
}


function calcularCapacidadPago(montoDisponible){
    return montoDisponible*0.5;
}

function calcularInteresSimple(monto,tasa,plazo){
    let interesAPagar;
    interesAPagar = plazo * (tasa/100) * monto;
    return interesAPagar;
}

function calcularTotalPagar(monto,interes){
    let totalAPagar;
    totalAPagar = monto + interes + 100;
    return totalAPagar; 
}

function calcularCuotaMensual(total, plazoAnios){
    let totalCuotaMensual;
    totalCuotaMensual = total/(plazoAnios*12);
    return totalCuotaMensual;
}

function aprobarCredito(capacidadPago,cuotaMensual){   
    if(capacidadPago > cuotaMensual){
        return true;
    }else{
        return false;
    }
}

simularCredito = function(){
  let monto = document.getElementById("montoCredito").value;
  let floatMonto = parseFloat(monto);
  let plazo = document.getElementById("plazoCredito").value;
  let intPlazo = parseInt(plazo);
  let disponible = calcularDisponible(clienteSeleccionado.ingresos,clienteSeleccionado.egresos, 0, 0);
  let capacidadPago = calcularCapacidadPago(disponible);
  let interes = calcularInteresSimple(floatMonto, tasaInteres, intPlazo);
  let totalPagar = calcularTotalPagar(floatMonto, interes);
  let cuota = calcularCuotaMensual(totalPagar, intPlazo);
  let aprobado = aprobarCredito(capacidadPago, cuota);
  
  let veredicto = aprobado ? "Crédito disponible" : "El monto exede la capacidad de pago";

  let divResultado = document.getElementById("resultadoCredito")
  
  divResultado.innerHTML = 
  "Capacidad de pago:" + capacidadPago + "<br>"+
  "Total a Pagar: "+totalPagar+"<br>"+
  "Cuota mensual: " +cuota+"<br>"+
  "RESULTADO: " +veredicto;

  divResultado.className = aprobado ? "aprobado":"rechazado"

    document.getElementById("btnSolicitarCredito").disabled = !aprobado;

    montoCalculado = disponible;
    plazoCalculado = plazo;
    cuotaCalculada = cuota;
} 

solicitarCredito = function(){
  let credito = {cedula:clienteSeleccionado.cedula,
    nombre:clienteSeleccionado.nombre,
    apellido:clienteSeleccionado.apellido,
    monto:montoCalculado,
    tasa:tasaInteres,
    plazo:plazoCalculado,
    cuota:cuotaCalculada
  }
  creditos.push(credito);
}

function  buscarCreditos(cedula){
  let creditosCliente = [];
   if(!cedula || !cedula.trim()){
    alert("Debe ingresar un número de cédula válido");
  return null;
  }else if(cedula.trim().length !=10){
    alert("El número de cédula debe tener exactamente 10 dígitos")
    return null;
  }
  for(let i = 0; i < creditos.length; i++){
    let credito = creditos[i];
  if(credito.cedula == cedula){
    creditosCliente.push(credito)
  }
  }
  return creditosCliente; 
}

function pintarCreditos(creditos){
  let tabla = recuperarElemento("tablaCreditos");
  let contenido = "";
  for(let i = 0; i < creditos.length;i++){
    let credito = creditos[i];
    contenido += `<tr>
          <td>${credito.cedula}</td>
          <td>${credito.nombre}</td>
          <td>${credito.apellido}</td>
          <td>${credito.monto}</td>
          <td>${credito.tasa}</td>
          <td>${credito.plazo}</td>
          <td>${credito.cuota.toFixed(2)}</td>
          <td><button onclick = "eliminarCredito(${credito.cedula})">Eliminar</button></td>
        </tr>`
  }
  tabla.innerHTML = contenido;
}

buscarCreditosCliente = function(){
  let campoCliente = recuperaraTexto("buscarCedulaListado");
  let creditosCliente = buscarCreditos(campoCliente);
  pintarCreditos(creditosCliente);
}

function eliminarCredito(cedula){
    for(let  i = 0; i < creditos.length; i++){
    if(creditos[i].cedula == cedula){
      creditos.splice(i,1);
      break;
    }
  }
  pintarCreditos(creditos);
}

function buscarContactos(filtros){
  let cmpFiltro = recuperaraTexto("buscarContactos")
  let filtroContactos = [];
    if(filtros == "nombre"){
      for(i = 0; i < listaContactos.length;i++){
        let contacto = listaContactos[i];
        if(contacto.nombre == cmpFiltro){
          filtroContactos.push(contacto);
        }
      }
      pintarContactos(filtroContactos);
    }
    
    if(filtros == "numero"){
      for(i = 0; i < listaContactos.length;i++){
        let contacto = listaContactos[i];
        if(contacto.numero == cmpFiltro){
          filtroContactos.push(contacto);
        }
      }
      pintarContactos(filtroContactos);
    }
}

function creditosVIP(){
  let tabla = recuperarElemento("tablaVIP");
  let contenido = "";

  for(let i = 0; i < clientes.length; i++){
    let cliente = clientes[i];
    let credito = cliente.ingresos - cliente.egresos;

    if(credito > 5000){
      contenido += "<tr>" +
        "<td>" + cliente.cedula + "</td>" +
        "<td>" + cliente.nombre + "</td>" +
        "<td>" + cliente.apellido + "</td>" +
        "<td>" + cliente.telefono + "</td>" +
        "<td>" + cliente.ingresos + "</td>" +
        "<td>" + cliente.egresos + "</td>" +
        "<td>" + cliente.correo + "</td>" +
        "<td>" + credito + "</td>" +
      "</tr>";
    }
  }

  tabla.innerHTML = contenido;
}