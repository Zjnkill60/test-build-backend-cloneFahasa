import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_ARRAY } from 'src/database/constant';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() queryString) {
    return this.productsService.findAll(queryString);
  }

  @Get('category')
  getAllCategory() {
    let category = ["KHOA HỌC KỸ THUẬT", "VĂN HỌC", "VĂN HÓA - NGHỆ THUẬT", "CHÍNH TRỊ - PHÁP LÝ", "KINH TẾ"]

    return {
      message: "Get category",
      category
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
