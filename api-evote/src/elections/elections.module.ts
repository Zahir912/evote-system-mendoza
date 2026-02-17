import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectionsController } from './elections.controller';
import { ElectionsService } from './elections.service';
import { Election, ElectionSchema } from './schemas/election.schema';

@Module({
  imports: [
    // Esto conecta el esquema con la base de datos para este módulo
    MongooseModule.forFeature([
      { name: Election.name, schema: ElectionSchema },
    ]),
  ],
  controllers: [ElectionsController], // Si esto no está, da error 404
  providers: [ElectionsService],
})
export class ElectionsModule {}
