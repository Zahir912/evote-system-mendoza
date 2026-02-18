import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service'; // Asegurate de que esto esté bien importado

@Controller('auth')
export class UsersController {
  // 1. Inyectamos el servicio (esto te faltaba)
  constructor(private readonly usersService: UsersService) {}

  // 2. Esta es la ruta que te da el error 404
  @Post('register')
  async register(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    // Ahora el login es dinámico y busca en Atlas
    const user = await this.usersService.findByUsername(body.username);

    if (user && user.password === body.password) {
      return {
        username: user.username,
        role: user.role,
        token: `token-${user.role}-2026`,
      };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
