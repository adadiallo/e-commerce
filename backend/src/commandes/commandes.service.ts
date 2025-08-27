import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from './entities/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepo: Repository<Commande>,
    @InjectRepository(PanierItem)
    private panierRepo: Repository<PanierItem>,
    private stripeService: StripeService,
  ) {}

  async validerCommande(userId: number,currency: string) {
    const panier = await this.panierRepo.find({
      where: { user: { id: userId } },
      relations: ['produit'],
    });

    if (!panier.length) {
      throw new BadRequestException('Votre panier est vide');
    }

    const total = panier.reduce(
      (acc, item) => acc + item.produit.prix * item.quantite,
      0,
    );

    const commande = this.commandeRepo.create({
      user: { id: userId },
      produits: panier.map((item) => ({
        produit: item.produit,
        quantite: item.quantite,
      })),
      total,
      statut: 'en attente',
    });

    await this.commandeRepo.save(commande);

    await this.panierRepo.delete({ user: { id: userId } });

    const paymentSession = await this.stripeService.createCheckoutSession(
      total , 
    currency,
      `${process.env.FRONTEND_URL}/commande/success`,
      `${process.env.FRONTEND_URL}/commande/cancel`,
    );

    return {
      commande,
      paymentUrl: paymentSession.url,
    };
  }
}
