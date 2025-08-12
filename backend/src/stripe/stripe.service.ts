// src/stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Commande } from 'src/commandes/entities/commande.entity';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
  });

  async createPaymentSession(commande: Commande) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: commande.produits.map((item) => ({
        price_data: {
          currency: 'usd', // adapte à ta devise
          product_data: {
            name: item.produit.nom,
            // description: item.produit.description,
          },
          unit_amount: item.produit.prix * 100, // prix en cents
        },
        quantity: item.quantite,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/commande/cancel`,
      metadata: {
        commandeId: commande.id.toString(),
      },
    });

    return session;
  }
}
