import { Module } from '@nestjs/common';
import { RouterModule } from './router.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RouterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
