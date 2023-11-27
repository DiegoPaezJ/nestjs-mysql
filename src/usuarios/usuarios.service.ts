import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { Perfil } from './perfil.entity';
import * as bcryptjs from 'bcryptjs'


@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Perfil) private perfilRepository: Repository<Perfil>) {

    }

    // findOneByEmail(email: string) {
    //     return this.usuarioRepository.findOne({
    //         where: {
    //             email: email
    //         }
    //     })
    // }

    findOneByEmail(email: string) {
        return this.usuarioRepository.findOneBy({ email });
    }

    findByEmailWithPassword(email: string) {
        return this.usuarioRepository.findOne(
            {
                where: { email },
                select: ['id', 'email', 'password', 'role'],
            });
    }


    finAll() {
        return this.usuarioRepository.find()
    }


    // POST/usuarios
    async createUsuario({ email, password }: CreateUsuarioDto) {

        const usuarioFound = await this.usuarioRepository.findOne({
            where: {
                email: email
            }
        })

        if (usuarioFound) {
            return new HttpException('Usuario ya existe !', HttpStatus.CONFLICT)
        }

        // const newUser = this.usuarioRepository.create(usuario);
        // return this.usuarioRepository.save(newUser);
        const newUser = this.usuarioRepository.create({
            email,
            password: await bcryptjs.hash(password, 10),
        });
        return this.usuarioRepository.save(newUser);
    }


    // GET /usuarios
    getUsuarios() {
        return this.usuarioRepository.find({
            relations: ['posts', 'perfil']
        })
    }

    // GET /usuarios/1
    async getUsuario(id: number) {
        const usuarioFound = await this.usuarioRepository.findOne({
            where: {
                id: id
            },
            relations: ['posts']
        });

        if (!usuarioFound) {
            return new HttpException('Usuario no existe !', HttpStatus.NOT_FOUND);
        }
        return usuarioFound;
    }



    // DELETE/usuarios/1
    async deleteUsuario(id: number) {
        const result = await this.usuarioRepository.delete({
            id: id
        });

        if (result.affected === 0) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return result;
    }


    // PATCH/usuarios/1
    // async updateUsuario(id: number, { email, password }: UpdateUsuarioDto) {
    //     const usuarioFound = await this.usuarioRepository.findOne({
    //         where: { id: id }
    //     });

    //     if (!usuarioFound) {
    //         return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    //     }
    //     // const updateUsuario = Object.assign(usuarioFound, usuario);
    //     // return this.usuarioRepository.save(updateUsuario);
    //     const updateUsuario = Object.assign(usuarioFound, {
    //         email,
    //         password: await bcryptjs.hash(password, 10),
    //     });
    //     return this.usuarioRepository.save(updateUsuario);
    // }
    async updateUsuario(id: number, { email, password, role }: UpdateUsuarioDto) {
        const usuarioFound = await this.usuarioRepository.findOne({
            where: { id: id }
        });

        if (!usuarioFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        // const updateUsuario = Object.assign(usuarioFound, usuario);
        // return this.usuarioRepository.save(updateUsuario);
        const updateUsuario = Object.assign(usuarioFound, {
            email,
            password: await bcryptjs.hash(password, 10),
            role,
        });
        return this.usuarioRepository.save(updateUsuario);
    }

    async createPerfil(id: number, perfil: CreatePerfilDto) {

        const usuarioFound = await this.usuarioRepository.findOne({
            where: {
                id,
            },
        });

        if (!usuarioFound) {
            console.log('usuario no encontrado')
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        console.log(usuarioFound)



        const newPerfil = this.perfilRepository.create(perfil);
        console.log(newPerfil)
        const savePerfil = await this.perfilRepository.save(newPerfil);
        console.log(savePerfil)
        usuarioFound.perfil = savePerfil

        return this.usuarioRepository.save(usuarioFound)


    }
}
