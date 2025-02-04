import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post("/sign-in")
    async signIn(@Body() payload: any) {
        console.log('body', payload);

        return await this.authService.signIn(payload);
    }
}
