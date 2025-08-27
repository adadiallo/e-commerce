import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }

    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15' as any, 
    });
  }

async createCheckoutSession(
  amount: number,
  currency: string,
  successUrl: string,
  cancelUrl: string,
): Promise<Stripe.Checkout.Session> {
const unitAmount =
  currency.toLowerCase() === 'xof'
    ? Math.round(amount)         
    : Math.round(amount * 100);  
  return await this.stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: 'Commande AdaShop',
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}


}
