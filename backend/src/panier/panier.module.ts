// src/panier/panier.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { PanierItem } from './entities/panier-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PanierItem])],
  providers: [PanierService],
  controllers: [PanierController],
})
export class PanierModule {}
