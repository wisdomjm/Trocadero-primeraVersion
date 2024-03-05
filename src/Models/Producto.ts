export default interface Producto{
    nombre?:string,
    descripcionCorta?:string,
    descripcionLarga?:string, 
    categoria:string,
    precio?:number,
    cantidadDisponible?:number,
    idVendedor?:string,
    fechaCreacion?:string,
    imagenes?:{}
}