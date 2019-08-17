
export class GaleryModel{
    latitud : number;
    longitud : number;
    descripcion :string;
    fechaCompleta : Date;
    imagen: string;


    constructor(){
        this.latitud = 0 ;
        this.longitud =  0;
        this.descripcion = "";
        this.fechaCompleta =new Date();
        this.imagen = "";
    }
}