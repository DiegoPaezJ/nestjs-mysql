export interface Posts{
    id: number;
    titulo: string;
    contenido: string;
    autorId?:number

    // @Column()
    // autorId?: number;
    filename: string;

    publicado?: boolean;

}