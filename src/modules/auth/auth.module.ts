import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.stretegy';

@Module({
  imports: [JwtModule.register({ secret: 'SECRET_KEY', signOptions: { expiresIn: '60m' } })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, JwtStrategy],
})
export class AuthModule {}
