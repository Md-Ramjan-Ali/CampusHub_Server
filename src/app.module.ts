import { Module } from '@nestjs/common';

import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: envValidationSchema,
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
