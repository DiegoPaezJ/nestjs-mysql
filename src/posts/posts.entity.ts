import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { Usuario } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { FileDto } from "./dto/file.dto";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    contenido: string;

    // @Column()
    // autorId?: number;
    @Column()
    autorId?: string;
    // @Column()
    // filename?: string;

    @Column({ nullable: true })
    file?: string;

    // @Column({nullable:true})
    // audio?: string;

    @Column({ default: false })
    publicado?: boolean;

    @ManyToOne(() => Usuario, (usuario) => usuario.posts)
    autor: Usuario;

}