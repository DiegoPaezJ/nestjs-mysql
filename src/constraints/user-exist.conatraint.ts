import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuariosService } from "src/usuarios/usuarios.service";

@ValidatorConstraint({ name: 'UserExistConstraint', async: true })
@Injectable()
export class UserExistConstraint implements ValidatorConstraintInterface {

    constructor(
        private readonly userService: UsuariosService
    ) { }

    async validate(email: string, args: ValidationArguments) {
        // const user = await this.userService.findOneByEmail(email);
        const user = await this.userService.findOneByEmail(email);
        return !user;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "El Usuario $value ya esta en uso"
    }
}