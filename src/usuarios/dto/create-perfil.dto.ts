import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator"
export class CreatePerfilDto{
    @IsString()
    nombres: string;
    @IsString()
    apellidos: string;
}