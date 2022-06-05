import { readdir } from 'node:fs/promises';
import { resolve } from 'path';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/edit-file-name';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(createProductDto);
    return createdProduct;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.update(id, updateProductDto);
    return this.productsService.findOne(id);
  }

  @Patch(':id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/assets/products/',
        filename: editFileName,
      }),
    }),
  )
  async updateImage(@Param('id') id: string, @UploadedFile() file) {
    this.productsService.update(id, {
      imageUrl: `/assets/products/${file.filename}`,
    });
    const productImagesDirPath = resolve(
      __dirname,
      '../../upload/assets/products/',
    );
    const files = await readdir(productImagesDirPath);
    // delete all files with same basename not matching extname
    return `/assets/products/${file.filename}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
