import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}

export default JwtRefreshAuthGuard;
