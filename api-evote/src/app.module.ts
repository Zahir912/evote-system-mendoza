import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importar esto
import { MongooseModule } from '@nestjs/mongoose';
import { ElectionsModule } from './elections/elections.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1. Cargamos la configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Usamos la variable de entorno para Atlas (o local si no existe)
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/evote_db',
    ),
    UsersModule,
    ElectionsModule,
    VotesModule,
  ],
})
export class AppModule {}
