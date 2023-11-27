import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express'

import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
// import { Roles } from './decorators/roles.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';


interface RequestWithUser extends Request {
    usuario: {
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {

        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.authService.login(loginDto)
    }

    @Get('perfil')
    @Auth(Role.USUARIO)
    // @UseGuards(AuthGuard, RolesGuard)
    perfil(
        @Req() req: RequestWithUser
    ) {
        return this.authService.perfil(req.usuario)
    }
    // @Get('perfil')
    // @Auth(Role.USUARIO)
    // profile(@ActiveUser() user: UserActiveInterface) {
    //     console.log(user)
    //     return this.authService.perfil(user);
    // }

    // @Get('perfil')
    // @Roles(Role.SUPERADMIN)
    // @UseGuards(AuthGuard, RolesGuard)
    // perfil(
    //     @Req() req: RequestWithUser
    // ) {
    //     return this.authService.perfil(req.usuario)
    // }

    // @Get('perfil')
    // @Roles(Role.USUARIO)
    // @UseGuards(AuthGuard, RolesGuard)
    // perfil(
    //     @Req() req: RequestWithUser
    // ) {
    //     return this.authService.perfil(req.usuario)
    // }
}
