import { Controller, Post, Body, UseGuards, Req, Get, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { PanierService } from './panier.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('panier')
export class PanierController {
  constructor(private panierService: PanierService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToCart(
    @Req() req,
    @Body() body: { produitId: number; quantite: number }
  ) {
    const userId = req.user.userId; // récupéré depuis le token JWT
    return this.panierService.addToCart(userId, body.produitId, body.quantite);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.userId;
    return this.panierService.getCart(userId);
  }
@UseGuards(AuthGuard('jwt'))
@Patch('update')
async updateQuantite(
  @Req() req,
  @Body() body: { produitId: number; quantite: number }
) {
  const userId = req.user.userId;
  return this.panierService.updateQuantite(userId, body.produitId, body.quantite);
}

 @UseGuards(AuthGuard('jwt'))
@Delete('remove/:id')
async removeFromCart(
  @Req() req,
  @Param('id', ParseIntPipe) produitId: number
) {
  const userId = req.user.userId;
  return this.panierService.removeFromCart(userId, produitId);
}

  @UseGuards(AuthGuard('jwt'))
@Get('count')
async getCartItemCount(@Req() req) {
  const userId = req.user.userId;
  return this.panierService.getCartItemCount(userId);
}
}
