import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesServices:CategoriesService){}

@Get()
findAll(){
    return this.categoriesServices.findAll();
}
 @Get(':id')
 findOne(@Param(':id') id: string){
    return this.categoriesServices.findOne(+id);
 }
 @Post()
 create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesServices.create(createCategoryDto);
 }
 @Patch(':id')
 update(@Param('id') id:string, @Body() CreateCategoryDto:CreateCategoryDto){
    return this.categoriesServices.update((+id),CreateCategoryDto);
 }
@Delete(':id')
remove(@Param('id') id:string){
    return this.categoriesServices.remove(+id)
}
    
}
