import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, Put } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreatePerfilDto } from './dto/create-perfil.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }
    // GET /usuarios
    @Get()
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
        return this.usuarioService.createPerfil(id, perfil)
    }
}
