import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {

    // el @transform es para que transformemose el string en podamos manejarlo, por emeplo si exiten "    " (espacios) no pueda estar 
    // en nombres ni en password

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    // @Transform(({ value }) => value.trim())
    // @IsString()
    // role?: string;
}