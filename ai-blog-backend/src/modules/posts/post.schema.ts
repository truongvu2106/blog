import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically add createdAt and updatedAt fields
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
