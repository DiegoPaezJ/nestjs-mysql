import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }


    // async register({ email, password }: RegisterDto) {
    //     const usuarioFound = await this.usuarioService.findOneByEmail(email)

    //     if (usuarioFound) {
    //         return new HttpException('Usuario ya existe !', HttpStatus.CONFLICT)
    //     }
    //     await this.usuarioService.createUsuario({
    //         email,
    //         password: await bcryptjs.hash(password, 10),
    //     });

    //     return {
    //         email
    //     }
    // }
    async register({ email, password }: RegisterDto) {
        const usuarioFound = await this.usuarioService.findOneByEmail(email)

        if (usuarioFound) {
            return new HttpException('Usuario ya existe !', HttpStatus.CONFLICT)
        }
        await this.usuarioService.createUsuario({
            email,
            password,
            // role
        });

        return {
            email
        }
    }
    async login({ email, password,role}: LoginDto) {
        const usuarioFound = await this.usuarioService.findByEmailWithPassword(email)

        if (!usuarioFound) {
            return new HttpException('Email incorrecto !', HttpStatus.UNAUTHORIZED)
        }

        const isPasswordValid = await bcryptjs.compare(password, usuarioFound.password);

        if (!isPasswordValid) {
            return new HttpException('Password es incorrecta !', HttpStatus.UNAUTHORIZED)
        }

        const payload = { email: usuarioFound.email, role: usuarioFound.role };

        if (usuarioFound.role === "admin") {
            role = 'admin'
        } else if (usuarioFound.role === "usuario") {
            role = 'usuario'
        }
        else if (usuarioFound.role === "superadmin") {
            role = 'superadmin'
        }
        const token = await await this.jwtService.signAsync(payload);

        return {
            token,
            email,
            role
        }
    }

    // async perfil({ email, role }: { email: string, role: string }) {

    


    async perfil({ email, role }: { email: string; role: string }) {
        return await this.usuarioService.findOneByEmail(email);
    }
    // async perfil({ email, role }: { email: string, role: string }) {
    //     return await this.usuarioService.findOneByEmail(email)
    // }
}
