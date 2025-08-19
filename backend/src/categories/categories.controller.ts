import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from 'src/auth/role.decorateur';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

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
 @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
 create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesServices.create(createCategoryDto);
 }
@Patch(':id')
update(@Param('id') id:string, @Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesServices.update(+id, createCategoryDto);
}

@Delete(':id')
remove(@Param('id') id:string){
    return this.categoriesServices.remove(+id)
}
    
}
