import { AbstractDocument } from '@app /common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Orders extends AbstractDocument {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  phoneNumber: string;
}

export const ordersSchema = SchemaFactory.createForClass(Orders);
