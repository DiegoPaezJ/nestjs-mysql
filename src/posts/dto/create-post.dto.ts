import { Transform, Type } from "class-transformer";
import { IsBase64, IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength, Validate, ValidateNested, isBase64, isBoolean, isNumber } from "class-validator"
import { FileDto } from "./file.dto";
import { ValidateFileConstraint } from "src/constraints/validate-file.constraint";
export class CreatePostDto {
    @IsString()
    @MinLength(1)
    titulo: string;

    @IsString()
    @MinLength(1)
    contenido: string;

    // @IsNumber()
    // autorId?: number;
    @IsString()
    autorId?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FileDto)
    // @Validate(ValidateFileConstraint)
    file?: FileDto;

    // @IsOptional()
    // @ValidateNested({ each: true })
    // @Type(() => FileDto)
    // audio?: FileDto;

    // @IsString()
    // filename: string;

    publicado?: boolean;
}