// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout')
  async checkout(@Body() body: { amount: number; currency: string }) {
    const session = await this.stripeService.createCheckoutSession(
      body.amount,
      body.currency,
      `${process.env.FRONTEND_URL}/success`,
      `${process.env.FRONTEND_URL}/cancel`,
    );

    return { id: session.id, url: session.url };
  }
}
