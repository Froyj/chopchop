import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
export type NutritionalInformation =
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'lactose_free'
  | 'contains_milk_allergen'
  | 'nuts_residues';

export type Availability = 'available' | 'coming_soon' | Date;

export interface ReheatInstructions {
  reheatMode: string;
  reheatTime: number;
}

@Schema()
export class Product {
  @Prop({ required: true, maxlength: 150 })
  name: string;

  @Prop({ required: true, maxlength: 400 })
  description: string;

  @Prop({ required: true, maxlength: 50 })
  category: string;

  @Prop({ required: true, default: [] })
  nutritionalInformation: Array<NutritionalInformation>;

  @Prop()
  retentionTime: number;

  @Prop({ type: Object, required: true })
  reheatingInstructions: ReheatInstructions;

  @Prop({ type: String, required: true })
  availability: Availability;

  @Prop({ min: 0, max: 20 })
  servings: number;

  @Prop()
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
