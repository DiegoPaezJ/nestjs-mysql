import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator"
export class UpdateUsuarioDto {

    @IsEmail()
    email?: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password?: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    role?: string;
}