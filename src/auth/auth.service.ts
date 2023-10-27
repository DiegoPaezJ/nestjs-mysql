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
    async login({ email, password}: LoginDto) {
        const usuarioFound = await this.usuarioService.findOneByEmail(email)

        if (!usuarioFound) {
            return new HttpException('Username no es correcto !', HttpStatus.UNAUTHORIZED)
        }
        
        const isPasswordValid = await bcryptjs.compare(password, usuarioFound.password);

        if (!isPasswordValid) {
            return new HttpException('Password es incorrecta !', HttpStatus.UNAUTHORIZED)
        }

        const payload = { email: usuarioFound.email, role: usuarioFound.role };
        
        const token = await await this.jwtService.signAsync(payload);

        return {
            token,
            email
        }
    }

    // async login({ email, password }: LoginDto) {
    //     const usuarioFound = await this.usuarioService.findOneByEmail(email)

    //     if (!usuarioFound) {
    //         return new HttpException('Username no es correcto !', HttpStatus.UNAUTHORIZED)
    //     }

    //     const isPasswordValid = await bcryptjs.compare(password, usuarioFound.password);

    //     if (!isPasswordValid) {
    //         return new HttpException('Password es incorrecta !', HttpStatus.UNAUTHORIZED)
    //     }

    //     const payload = { email: usuarioFound.email, role: usuarioFound.role };
    //     const token = await await this.jwtService.signAsync(payload);

    //     return {
    //         token,
    //         email
    //     }
    // }

    async perfil({ email, role }: { email: string, role: string }) {
        // if (role === 'admin') {
        //     throw new UnauthorizedException(
        //         'No estas autorizado para acceder a este recurso.'
        //     );
        // }


        return await this.usuarioService.findOneByEmail(email)
    }
}
