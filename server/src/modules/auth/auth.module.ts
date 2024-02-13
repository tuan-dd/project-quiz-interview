import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ScopeController } from './scope/scope.controller';
import { RoleController } from './role/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role/role.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { UserModule } from '@user/user.module';
import { AuthService } from './auth.service';
import { ScopeService } from './scope/scope.service';
import { RoleService } from './role/role.service';
import { ScopeEntity } from './scope/scope.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from '@guards/roles.guard';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([RoleEntity, ScopeEntity])],
  controllers: [AuthController, ScopeController, RoleController],
  providers: [
    LocalStrategy,
    JwtAuthGuard,
    RefreshStrategy,
    AuthService,
    ScopeService,
    RoleService,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
