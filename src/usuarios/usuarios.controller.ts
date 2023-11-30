import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, Put, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';




// Auth(Role.USUARIO) se declara a que acceso tiene cada uno de los roles
 @Auth(Role.ADMIN)
 @Auth(Role.SUPERADMIN)
// @Auth(Role.USUARIO)
@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }
    // GET /usuarios
    
    @Get()
    // @UseGuards(RolesGuard)
    // @Roles('admin')
    getUsuarios(): Promise<Usuario[]> {
        return this.usuarioService.getUsuarios();
    }

    // GET /usuarios/1
    @Get(':id')
    getUsuario(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.getUsuario(id);
    }

    // POST/usuarios
    @Post()
    createUsuario(@Body() newUser: CreateUsuarioDto) {
        return this.usuarioService.createUsuario(newUser)
    }

    // DELETE/usuarios/1
    @Delete(':id')
    deleteUsuario(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.deleteUsuario(id)
    }

    // PATCH/usuarios/1
    @Patch(':id')
    updateUsuario(@Param('id', ParseIntPipe) id: number, @Body()
    usuario: UpdateUsuarioDto) {
        return this.usuarioService.updateUsuario(id, usuario)
    }

    @Post(':id/perfil')
    createPerfil(
        @Param('id', ParseIntPipe) id: number,
        @Body() perfil: CreatePerfilDto) {

        console.log(id, perfil)
        return this.usuarioService.createPerfil(id, perfil)

    }
}
