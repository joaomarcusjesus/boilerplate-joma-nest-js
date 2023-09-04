import { Module } from '@nestjs/common';
import { JwtModule } from '../infra/jwt/jwt.module';
import { AuthRoutesModule } from './modules/auth/auth-routes.module';
import { CustomerRoutesModule } from './modules/customers/customer-routes.module';
import { TaskRoutesModule } from './modules/tasks/task-routes.module';

@Module({
  imports: [
    CustomerRoutesModule,
    TaskRoutesModule,
    AuthRoutesModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class RouterModule {}
