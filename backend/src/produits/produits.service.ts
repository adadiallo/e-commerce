import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { Repository } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class ProduitsService {
    constructor (
        @InjectRepository(Produit)
        private produitRepo:Repository<Produit>,
    ){}
create(dto: CreateProduitDto){
    const produit =this.produitRepo.create(dto);
    return this.produitRepo.save(produit);
}
findAll(){
    return this.produitRepo.find();
}
async findOne(id: number) {
    const produit= await this.produitRepo.findOneBy({id});
    if(!produit) throw new NotFoundException('Produit non trouve');
    return produit
}

async update(id: number, dto: UpdateProduitDto): Promise<Produit> {
  const produit = await this.produitRepo.preload({
    id,
    ...dto,
  });

  if (!produit) {
    throw new NotFoundException(`Produit avec l'id ${id} non trouvé`);
  }

  return this.produitRepo.save(produit);
}

async remove(id: number): Promise<void> {
  const produit = await this.produitRepo.findOneBy({ id });

  if (!produit) {
    throw new NotFoundException(`Produit avec l'id ${id} non trouvé`);
  }

  await this.produitRepo.remove(produit);
}





}
