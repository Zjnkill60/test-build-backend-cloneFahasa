import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterGoogleUserDto, RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  validateUser = async (username: string, password: string) => {
    let user = await this.usersService.findByEmail(username)
    let verifyPassword = this.usersService.verifyHashPassword(password, user.password)
    if (user && verifyPassword) {
      const { name, email, phoneNumber, role, _id, avatar } = user
      return {
        name, email, phoneNumber, role, _id, avatar
      };
    } else {
      return null
    }
  }

  async login(user: any, response) {
    const payload = user

    const refreshToken = this.genarateRefreshToken(payload)
    await this.usersService.updateRefreshTokenToDatabase(payload._id, refreshToken)

    response.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    })


    return {
      message: "Login",
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async logout(dataJWT) {
    await this.usersService.deleteRefreshTokenToDatabase(dataJWT._id)
    return {
      message: 'log out success !'
    }

  }

  async googleLogin(dataUserGoogle: RegisterGoogleUserDto, response) {

    let userExist = await this.usersService.registerUserGoogle(dataUserGoogle)
    let { avatar, _id, name, email, role } = userExist
    let newPayload = { avatar, _id, name, email, role }
    const refreshToken = this.genarateRefreshToken(newPayload)
    await this.usersService.updateRefreshTokenToDatabase(newPayload._id, refreshToken)

    response.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
      httpOnly: true,
      sameSite: "none",
      secure: "false",
    })


    return {
      message: "Login by google",
      access_token: this.jwtService.sign(newPayload),
      newPayload
    };


  }

  async register(registerUserDTO: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDTO)
  }

  async refresh(refreshToken, response) {
    console.log('refreshToken', refreshToken)
    let userExist = await this.usersService.findByRefreshToken(refreshToken)
    if (userExist) {
      const { name, email, phoneNumber, role, _id, avatar } = userExist
      const user = { name, email, phoneNumber, role, _id, avatar }

      const newRefreshToken = this.genarateRefreshToken(user)
      await this.usersService.updateRefreshTokenToDatabase(user._id, newRefreshToken)

      response.cookie('refreshToken', newRefreshToken, {
        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
        httpOnly: true,
        sameSite: "none",
        secure: "false",
      })

      return {
        message: "Refresh AccessToken",
        access_token: this.jwtService.sign(user),
        user
      };


    } else {
      throw new BadRequestException("Phiên đăng nhập hết hạn , vui lòng đăng nhập lại !")
    }
  }


  async changePasswordUser(dataPassword, dataUser) {
    const { currentPassword, newPassword } = dataPassword
    let user = await this.usersService.findByEmail(dataUser.email)
    let verifyPassword = this.usersService.verifyHashPassword(currentPassword, user.password)
    if (verifyPassword) {
      let newHashPassword = this.usersService.genarateHashPassword(newPassword)
      await this.usersService.update(dataUser._id, { password: newHashPassword })
      return {
        message: "Change password user",
        newHashPassword
      }
    } else {
      throw new BadRequestException("Password is correct ? ")

    }


  }

  genarateRefreshToken = (payload: any) => {
    return this.jwtService.sign(payload, { secret: 'zjnkill18', expiresIn: '6000000s' })
  }


}
