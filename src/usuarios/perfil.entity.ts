import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('perfil_usuario')
export class Perfil {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({ nullable: true })
    edad: number;
}