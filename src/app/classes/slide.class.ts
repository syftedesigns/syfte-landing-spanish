/*
Objeto para desplazar componentes en el home
*/
export class SlideComponent {
    constructor(
        public reference: string,
        public Displayed: boolean,
        public position?: number
    ) {}
}
