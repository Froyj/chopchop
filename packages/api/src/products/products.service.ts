import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll() {
    const products = this.productModel.find().exec();
    return products;
  }

  findOne(id: string) {
    const product = this.productModel.findById(id).exec();
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const modifiedProduct = this.productModel
      .updateOne({ _id: id }, updateProductDto)
      .exec();
    return modifiedProduct;
  }

  remove(id: string) {
    this.productModel.deleteOne({ _id: id }).exec();
    return `Removed product with id ${id}`;
  }
}
