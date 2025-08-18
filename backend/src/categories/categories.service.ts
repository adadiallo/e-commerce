import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository:Repository<Category>
    ){}

async findAll():Promise<Category[]>{
    return await this.categoryRepository.find();
}

async findOne(id: number):Promise<Category>{
    const category = await this.categoryRepository.findOne({where:{id}});
    if(!category){
        throw new NotFoundException(`Categorie avec ID ${id }introuvable`)
    }
    return category;
}
 async create(createCategoryDto:CreateCategoryDto):Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);

 }

async update(id:number, createCategoryDto:CreateCategoryDto):Promise<Category>{
    const category= await this.findOne(id);
    return await this.categoryRepository.save(category);
}

async remove(id:number):Promise<void> {
    const result = await this.categoryRepository.delete(id);
     if (result.affected === 0) {
      throw new NotFoundException(`Catégorie avec ID ${id} introuvable`);
    }
}


}
