import { Module } from '@nestjs/common';
import { ProduitsController } from './produits.controller';
import { ProduitsService } from './produits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports:[TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitsController],
  providers: [ProduitsService,CloudinaryService]
})
export class ProduitsModule {}
