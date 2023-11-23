import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

import { ADMIN_KEY } from '@/utils/constants';

const AdminAccess = () => SetMetadata(ADMIN_KEY, Role.ADMIN);

export default AdminAccess;
