import { ApiProperty } from '@nestjs/swagger';

import User from '@/user/entities/user.entity';

class Auth {
  @ApiProperty({
    type: 'String',
    description: 'JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9',
  })
  readonly token: string;

  @ApiProperty({
    type: User,
    description: 'The user that was authenticated',
  })
  readonly user: User;
}

export default Auth;
