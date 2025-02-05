import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FacebookAuthGuard } from '../guards/facebook-auth.guard';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleAuth(@Req() req) { }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req, @Res() res) {
        const { access_token } = req.user;
        res.redirect(`http://localhost:4200/login-success?token=${access_token}`);
    }

    @Get('facebook')
    @UseGuards(FacebookAuthGuard)
    facebookAuth(@Req() req) { }

    @Get('facebook/callback')
    @UseGuards(FacebookAuthGuard)
    facebookAuthRedirect(@Req() req, @Res() res) {
        const { access_token } = req.user;
        res.redirect(`http://localhost:4200/login-success?token=${access_token}`);
    }
}
