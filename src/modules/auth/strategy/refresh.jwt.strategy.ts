import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRequestPayload } from './jwt.strategy';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const jwt: string | null = req.cookies['refresh_token'] ?? null;
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('REFRESH_JWT_SECRET'),
    });
  }

  validate(payload: JwtRequestPayload): JwtRequestPayload {
    return payload;
  }
}
