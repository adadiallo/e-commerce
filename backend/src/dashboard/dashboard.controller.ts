import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role.decorateur';

@Controller('dashboard')
export class DashboardController {
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getAdminData() {
    return { message: "Seulement pour l'admin" };
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  getUserData() {
    return { message: "Pour tous les utilisateurs" };
  }
}
