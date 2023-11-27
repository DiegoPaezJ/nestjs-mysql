export interface Posts{
    id: number;
    titulo: string;
    contenido: string;

    // @Column()
    // autorId?: number;
    filename: string;

    publicado?: boolean;

}