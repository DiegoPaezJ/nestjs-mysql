import { Usuario } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    contenido: string;

    @Column()
    autorId: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.posts)
    autor: Usuario;

}