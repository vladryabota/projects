import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { REFRESH_TOKEN_COOKIE } from './auth.constants';
import { AuthenticatedUser } from './types/jwt-payload.type';

type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const authUser = await this.authService.login(user, response);

    return { user: authUser };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = this.getRefreshTokenFromRequest(request);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const authUser = await this.authService.refresh(refreshToken, response);

    return { user: authUser };
  }

  @Public()
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = this.getRefreshTokenFromRequest(request);

    await this.authService.logout(refreshToken, response);

    return { success: true };
  }

  @Get('me')
  async me(@Req() request: AuthenticatedRequest) {
    const authUser = await this.authService.getMe(request.user.userId);

    return { user: authUser };
  }

  private getRefreshTokenFromRequest(request: Request): string | undefined {
    const cookies = request.cookies as Record<string, unknown> | undefined;
    const value = cookies?.[REFRESH_TOKEN_COOKIE];
    return typeof value === 'string' ? value : undefined;
  }
}
