import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(productDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel({
        name: productDto.name,
        description: productDto.description,
        category: productDto.category,
        nutritionalInformation: productDto.nutritionalInformation,
        retentionTime: productDto.retentionTime,
        reheatingInstructions: productDto.reheatingInstructions,
        availability: productDto.availability,
        servings: productDto.servings,
      });
      return await createdProduct.save();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error retrieving products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;
    } catch (error) {
      throw new HttpException(
        'Error retrieving product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productModel
        .updateOne({ _id: id }, updateProductDto)
        .exec();
      if (!result?.acknowledged) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.productModel.deleteOne({ _id: id }).exec();
      return `Removed product with id ${id}`;
    } catch (error) {
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
