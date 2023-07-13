import { Controller, Get, Post, Param, Delete, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt/jwt-auth.guard';
import { Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  Login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response)
  }


  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  Logout(@Res({ passthrough: true }) response: Response, @Req() req) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    })
    return this.authService.logout(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(@Body() data, @Req() req) {
    return this.authService.changePasswordUser(data, req.user)
  }


  @Post('/google')
  GoogleLogin(@Body() data, @Res({ passthrough: true }) response: Response) {
    return this.authService.googleLogin(data, response)
  }

  @Post('/register')
  Register(@Body() registerUserDTO: RegisterUserDto) {
    return this.authService.register(registerUserDTO)

  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }


  @Get('refreshToken')
  handleRefreshToken(@Req() req, @Res({ passthrough: true }) response: Response) {
    const refreshToken = req.cookies['refreshToken']
    return this.authService.refresh(refreshToken, response)
  }
}
