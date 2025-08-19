import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Repository } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private produitRepo: Repository<Produit>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async create(dto: CreateProduitDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Catégorie introuvable');
    }
    const produit = this.produitRepo.create({ ...dto, category });

    return this.produitRepo.save(produit);
  }
  async findAll() {
  return await this.produitRepo.find({
    where: { isActive: true }, // ✅ seulement les actifs
    relations: ['category'],
  });
}
  async findOne(id: number) {
  const produit = await this.produitRepo.findOne({
    where: { id },
    relations: ['category'], // ajouter la relation
  });
  if (!produit) throw new NotFoundException('Produit non trouvé');
  return produit;
}

async update(id: number, dto: UpdateProduitDto, imageUrl?: string): Promise<Produit> {
  const produit = await this.produitRepo.preload({ id, ...dto });

  if (!produit) {
    throw new NotFoundException(`Produit avec l'id ${id} non trouvé`);
  }

  // Mise à jour catégorie
  if (dto.categoryId) {
    const category = await this.categoryRepo.findOne({
      where: { id: +dto.categoryId }, // conversion en number
    });
    if (!category) throw new NotFoundException('Catégorie introuvable');
    produit.category = category;
  }

  // Mise à jour image
  if (imageUrl) {
    produit.image = imageUrl;
  }

  return this.produitRepo.save(produit);
}



async remove(id: number) {
  const produit = await this.produitRepo.findOne({ where: { id } });

  if (!produit) {
    throw new NotFoundException(`Produit avec l'id ${id} non trouvé`);
  }

  // ✅ Soft delete
  produit.isActive = false;
  await this.produitRepo.save(produit);

  return { message: `Produit ${id} désactivé avec succès` };
}

}
