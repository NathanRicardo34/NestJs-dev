import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';

import { AuthController } from './auth.controller';

import { AuthService } from './shared/auth-service/auth-service';
import { LocalStrategy } from './shared/local-auth/local.strategy';
import { JwtStrategy } from './shared/jwt-auth/jwt.strategy';
import { jwtConstants } from './shared/jwt-auth/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
