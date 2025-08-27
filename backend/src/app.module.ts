import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProduitsModule } from './produits/produits.module';
import { PanierModule } from './panier/panier.module';
import { CommandesModule } from './commandes/commandes.module';
import { StripeModule } from './stripe/stripe.module';
import { CategoriesModule } from './categories/categories.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { User } from './users/entities/user.entity';
import { Produit } from './produits/entities/produit.entity';
import { PanierItem } from './panier/entities/panier-item.entity';
import { Commande } from './commandes/entities/commande.entity';
import { Category } from './categories/entities/category.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    // 1️⃣ Variables d'environnement globales
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2️⃣ Connexion à MySQL avec TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: config.get<number>('DB_PORT') || 5432,
        username: config.get<string>('DB_USERNAME') || 'postgres',
        password: config.get<string>('DB_PASSWORD') || 'ecommercepassword ',
        database: config.get<string>('DB_NAME') || 'ecommerce',
        entities: [User, Produit, PanierItem, Commande, Category],
        synchronize: true, // false en prod
      }),
    }),

    // 3️⃣ Modules de l'application
    AuthModule,
    UsersModule,
    ProduitsModule,
    PanierModule,
    CommandesModule,
    StripeModule,
    CategoriesModule,
    DashboardModule,
  ],
  controllers: [AppController], // les autres sont déjà dans leurs modules
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
