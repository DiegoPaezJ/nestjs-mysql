export interface Posts{
    id: number;
    titulo: string;
    contenido: string;
    autorId?:string

    // @Column()
    // autorId?: number;
    filename: string;

    publicado?: boolean;

}