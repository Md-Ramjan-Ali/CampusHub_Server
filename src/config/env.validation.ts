import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

  JWT_EXPIRES_IN: z.string().default('7d'),
});

export function validate(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ Environment validation failed');
    console.error(result.error.flatten().fieldErrors);

    throw new Error('Invalid environment variables');
  }

  return result.data;
}
