import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE_MS,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE_MS,
} from './auth.constants';
import { JwtPayload } from './types/jwt-payload.type';

export type AuthUserResponse = {
  id: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User, response: Response): Promise<AuthUserResponse> {
    await this.issueTokens(user, response);
    return this.toAuthUserResponse(user);
  }

  async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<AuthUserResponse> {
    const tokenHash = this.hashToken(refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
        await this.prisma.refreshToken.delete({
          where: { id: storedToken.id },
        });
      }

      this.clearAuthCookies(response);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });

    await this.issueTokens(storedToken.user, response);
    return this.toAuthUserResponse(storedToken.user);
  }

  async logout(
    refreshToken: string | undefined,
    response: Response,
  ): Promise<void> {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);

      await this.prisma.refreshToken.deleteMany({
        where: { tokenHash },
      });
    }

    this.clearAuthCookies(response);
  }

  async getMe(userId: string): Promise<AuthUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toAuthUserResponse(user);
  }

  private async issueTokens(user: User, response: Response): Promise<void> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = randomBytes(64).toString('hex');
    const tokenHash = this.hashToken(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS),
      },
    });

    this.setAuthCookies(response, accessToken, refreshToken);
  }

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    const isProduction = process.env.NODE_ENV === 'production';

    response.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });

    response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
  }

  private clearAuthCookies(response: Response): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const,
      path: '/',
    };

    response.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
    response.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private toAuthUserResponse(user: User): AuthUserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
