
/*
Todos los usuarios tienen una serie de propiedades y métodos.
Con esta clase nos permitirá utilizar todos estos datos de una
sola vez...
Este es un modelo de datos que nos permitirá trabajar de una
manera ordenada sencilla, despues de cada solicitud GET, POST, PUT, etc..
*/

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {}

}
