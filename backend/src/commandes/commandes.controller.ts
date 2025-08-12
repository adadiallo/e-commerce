import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('commandes')
export class CommandesController {
  constructor(private commandesService: CommandesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('valider')
  async validerCommande(@Req() req) {
    const userId = req.user.userId;
    return this.commandesService.validerCommande(userId);
  }
}
