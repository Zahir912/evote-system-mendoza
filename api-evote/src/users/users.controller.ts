import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth') // Esto crea la ruta http://localhost:3000/auth/login
export class UsersController {
  @Post('login')
  async login(@Body() body: any) {
    // Lógica dinámica: si el usuario es 'admin', le damos el poder.
    // En un sistema real, acá consultarías tu UserSchema en MongoDB.
    const { username, password } = body;

    if (username === 'admin' && password === '1234') {
      return {
        username: 'Admin Mendoza',
        role: 'Admin',
        token: 'session-token-maximus-2026',
      };
    } else {
      return {
        username: username,
        role: 'Usuario',
        token: 'session-token-user-2026',
      };
    }
  }
}
