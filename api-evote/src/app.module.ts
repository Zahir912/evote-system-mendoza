import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectionsModule } from './elections/elections.module'; // IMPORTANTE
import { VotesModule } from './votes/votes.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/evote_db'),
    UsersModule,
    ElectionsModule, // DEBE ESTAR AQUÍ
    VotesModule,
  ],
})
export class AppModule {}
