import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator"
export class CreateUsuarioDto {
    
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    // @Transform(({ value }) => value.trim())
    // @IsString()
    // role ?:string;

}