// src/panier/panier.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PanierItem } from './entities/panier-item.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(PanierItem)
    private panierRepository: Repository<PanierItem>,
  ) {}

  // Ajouter un produit au panier ou mettre à jour la quantité si déjà présent
  async addToCart(userId: number, produitId: number, quantite: number) {
    let item = await this.panierRepository.findOne({
      where: { user: { id: userId }, produit: { id: produitId } },
    });

    if (item) {
      item.quantite += quantite;
    } else {
      item = this.panierRepository.create({
        user: { id: userId },
        produit: { id: produitId },
        quantite,
      });
    }

    return this.panierRepository.save(item);
  }

  // Récupérer le panier d’un utilisateur
 // Récupérer le panier d’un utilisateur
async getCart(userId: number) {
  const panier = await this.panierRepository.find({
    where: { user: { id: userId } },
    relations: ['produit'],
  });

  return panier.map(item => ({
    id: item.produit.id,
    nom: item.produit.nom,
    // description:item.produit.description,
    prix: item.produit.prix,
    image: item.produit.image,
    quantite: item.quantite,
  }));
}



  // ✅ MISE À JOUR DE LA QUANTITÉ
  async updateQuantite(userId: number, produitId: number, quantite: number) {
    const panierItem = await this.panierRepository.findOne({
      where: {
        user: { id: userId },
        produit: { id: produitId },
      },
      relations: ['user', 'produit'],
    });

    if (!panierItem) {
      throw new NotFoundException('Produit non trouvé dans le panier');
    }

    panierItem.quantite = quantite;
    return this.panierRepository.save(panierItem);
  }













  // Supprimer un produit du panier
  async removeFromCart(userId: number, produitId: number) {
    return this.panierRepository.delete({
      user: { id: userId },
      produit: { id: produitId },
    });
  }
  async getCartItemCount(userId: number): Promise<{ count: number }> {
  const count = await this.panierRepository.count({
    where: { user: { id: userId } }, 
  });

  return { count };
}

}
