import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { Election, ElectionSchema } from '../elections/schemas/election.schema';

@Module({
  imports: [
    // Registramos ambos esquemas porque el servicio de votos necesita consultar elecciones
    MongooseModule.forFeature([
      { name: Vote.name, schema: VoteSchema },
      { name: Election.name, schema: ElectionSchema },
    ]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
