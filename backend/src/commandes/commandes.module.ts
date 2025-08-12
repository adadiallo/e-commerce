import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Commande } from './entities/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Commande,PanierItem]),    StripeModule,
],
    providers: [CommandesService],

  controllers: [CommandesController],
})
export class CommandesModule {}
