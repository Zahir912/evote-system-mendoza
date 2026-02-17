import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Election extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) level: string; // Nacional, Provincial, Municipal
  @Prop() region: string;
  @Prop({ default: 'active' }) status: string;
  @Prop({ default: Date.now }) date: Date;

  @Prop({
    type: [{ name: String, party: String, category: String }],
  })
  candidates: { name: string; party: string; category: string }[];
}
export const ElectionSchema = SchemaFactory.createForClass(Election);
