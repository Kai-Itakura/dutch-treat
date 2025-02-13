import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
