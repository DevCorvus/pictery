import { z } from 'zod';

export const uuidArray = z.array(z.string().uuid()).nonempty();
