import { SetMetadata } from '@nestjs/common';

export const ALSO_ADMIN_KEY = 'alsoAdmin';
export const AlsoAdmin = () => SetMetadata(ALSO_ADMIN_KEY, true);
