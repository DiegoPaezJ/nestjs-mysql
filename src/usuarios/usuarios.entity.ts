/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Perfil } from './perfil.entity';
import { Post } from '.././posts/posts.entity';
import { Role } from '.././common/enums/rol.enum';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true,nullable: false  })
    email: string;

    @Column({nullable: false, select:false  })
    password: string;

    @Column({type:'enum',default:Role.USUARIO, enum:Role})
    role: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    authStrategy: string;

    @OneToOne(() => Perfil)
    @JoinColumn()
    perfil: Perfil;

    @OneToMany(() => Post, post => post.autor)
    posts: Post[];
}
