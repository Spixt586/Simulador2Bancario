let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;


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
function guardarCliente(){
  //obtetener datos de formulario utilizando utilitarios
  let cedula = recuperaraTexto("cedula");
  let nombre  = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  //Buscamos si el cliente ya existe
  let clienteExiste = buscarCliente(cedula);

  // si no existe lo creamos
  if(clienteExiste == null){

  //creamos el objeto cliente
  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  };

  //agregamos el objeto al arreglo
  clientes.push(cliente);
  }else{
    //si existe actualizamos sus datos exepto la cedula
    clienteExiste.nombre = nombre;
    clienteExiste.apellido = apellido;
    clienteExiste.ingresos = ingresos;
    clienteExiste.egresos = egresos;
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
      "<td>" + cliente.ingresos + "</td>" + 
      "<td>"+ cliente.egresos + "</td>" + 
      "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>" +
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
  mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
}

function limpiar(){
  //vaiar cada input
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");

}