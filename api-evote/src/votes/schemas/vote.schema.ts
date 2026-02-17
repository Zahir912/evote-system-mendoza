import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// REQUISITO: timestamps: true crea automáticamente createdAt y updatedAt
@Schema({ timestamps: true })
export class Vote extends Document {
  @Prop({ required: true }) electionId: string;
  @Prop({ required: true }) level: string;
  @Prop({ required: true }) candidateId: string;
  @Prop({ required: true }) candidateName: string;
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) category: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
