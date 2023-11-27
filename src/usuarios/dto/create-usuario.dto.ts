import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, Validate } from "class-validator"
import { UserExistConstraint } from "src/constraints/user-exist.conatraint";
export class CreateUsuarioDto {
    
    @IsEmail()
    @Validate(UserExistConstraint)
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    // @Transform(({ value }) => value.trim())
    // @IsString()
    // role ?:string;

}