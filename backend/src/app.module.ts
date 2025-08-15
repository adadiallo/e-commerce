import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsModule } from './produits/produits.module';
import { Produit } from './produits/entities/produit.entity';
import { PanierModule } from './panier/panier.module';
import { PanierItem } from './panier/entities/panier-item.entity';
import { CommandesModule } from './commandes/commandes.module';
import { Commande } from './commandes/entities/commande.entity';
import { StripeController } from './stripe/stripe.controller';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  
  imports: [
    // 1️⃣ Charger les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true, // accessible partout sans réimporter
    }),

    // 2️⃣ Connexion à MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // par défaut sous XAMPP/MAMP
      password: '',     // vide par défaut
      database: 'ecommerce',
      entities: [User, Produit, PanierItem, Commande],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProduitsModule,
    PanierModule,
    CommandesModule,
    StripeModule,
  ],
  controllers: [AppController, StripeController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
