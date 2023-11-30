import { Transform, Type } from "class-transformer";
import { IsBase64, IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength, ValidateNested, isBase64, isBoolean, isNumber } from "class-validator"
import { FileDto } from "./file.dto";
export class SavePostDto {
    @IsString()
    @MinLength(1)
    titulo: string;

    @IsString()
    @MinLength(1)
    contenido: string;

    @IsNumber()
    autorId?: number;
    // @IsString()
    // autorId?: string;

    @IsString()
    file: string;

    // @IsString()
    // audio: string;

    publicado?: boolean;
}