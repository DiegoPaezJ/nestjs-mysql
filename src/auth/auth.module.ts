import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constanst';
import { UserExistConstraint } from 'src/constraints/user-exist.conatraint';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),

    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    // }),

  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
  // providers: [AuthService, UserExistConstraint]
})
export class AuthModule { }
