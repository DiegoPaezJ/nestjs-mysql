import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { FileDto } from "src/posts/dto/file.dto";


@ValidatorConstraint({ name: 'ValidateFileConstraint', async: true })
@Injectable()
export class ValidateFileConstraint implements ValidatorConstraintInterface {

    async validate(file: FileDto, args: ValidationArguments) {
        const maxFileSizeInBytes = 1024 * 1024; // 1 MB
        
        console.log('entro')

        if (!file.buffer) {
            return false; // No hay búfer
        }

        const fileSizeInBytes = file.buffer.length;

        return fileSizeInBytes <= maxFileSizeInBytes;
    }


    defaultMessage(validationArguments?: ValidationArguments): string {
        return "El Archivo no es valido"
    }
}