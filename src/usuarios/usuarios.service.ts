import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { Perfil } from './perfil.entity';


@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Perfil) private perfilRepository: Repository<Perfil>) {

    }

    findOneByUsername(username: string) {
        return this.usuarioRepository.findOneBy({ username })
    }


    // POST/usuarios
    async createUsuario(usuario: CreateUsuarioDto) {

        const usuarioFound = await this.usuarioRepository.findOne({
            where: {
                username: usuario.username
            }
        })

        if (usuarioFound) {
            return new HttpException('Usuario ya existe !', HttpStatus.CONFLICT)
        }

        const newUser = this.usuarioRepository.create(usuario);
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
    async updateUsuario(id: number, usuario: UpdateUsuarioDto) {
        const usuarioFound = await this.usuarioRepository.findOne({
            where: { id: id }
        });

        if (!usuarioFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        const updateUsuario = Object.assign(usuarioFound, usuario);
        return this.usuarioRepository.save(updateUsuario);
    }

    async createPerfil(id: number, perfil: CreatePerfilDto) {
        const usuarioFound = await this.usuarioRepository.findOne({
            where: {
                id,
            }
        });

        if (!usuarioFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        const newPerfil = this.perfilRepository.create(perfil);
        const savePerfil = await this.perfilRepository.save(newPerfil);

        usuarioFound.perfil = savePerfil

        return this.usuarioRepository.save(usuarioFound)


    }
}
