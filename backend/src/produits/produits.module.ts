import { Module } from '@nestjs/common';
import { ProduitsController } from './produits.controller';
import { ProduitsService } from './produits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Produit,Category])],
  controllers: [ProduitsController],
  providers: [ProduitsService,CloudinaryService]
})
export class ProduitsModule {}
