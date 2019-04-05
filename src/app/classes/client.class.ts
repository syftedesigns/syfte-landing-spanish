// Para los clientes que nos contactan mediante el formulario de contacto
export class ClientContact {
    constructor (
        public name: string,
        public phone: string,
        public email: string,
        public message: string
    ) {}
}
