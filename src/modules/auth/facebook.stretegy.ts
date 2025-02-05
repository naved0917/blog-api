import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private authService: AuthService) {
    super({
      clientID: 'Test',
      clientSecret: 'Test',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateFacebookLogin(profile);
    return user;
  }
}
