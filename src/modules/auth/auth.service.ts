import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateGoogleLogin(profile: any) {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'google',
    };
    return this.generateJwtToken(user);
  }

  async validateFacebookLogin(profile: any) {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'facebook',
    };
    return this.generateJwtToken(user);
  }

  generateJwtToken(user: any) {
    const payload = { email: user.email, name: user.name, provider: user.provider };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
