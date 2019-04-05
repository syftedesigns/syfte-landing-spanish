// Para las personas que envian el formulario de contacto
export class ProposalData {
    constructor (
        public name: string,
        public email: string,
        public phone: string,
        public service: string,
        public country: string,
        public attachment?: File
    ) {}
}
