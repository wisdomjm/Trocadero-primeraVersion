export default interface Producto{
    uuid?:string,
    nombre?:string,
    descripcionCorta?:string,
    descripcionLarga?:string, 
    categoria:string,
    precio?:number,
    cantidadDisponible?:number,
    idVendedor?:string,
    emailVendedor?:string,
    fechaCreacion?:string,
    imagenes?:{},
    video?:{},
    latitude?:string,
    longitude?:string,
    carritoClienteId?:string,
    historialClienteId?:string
}