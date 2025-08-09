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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecommerce',
      entities: [User,Produit,PanierItem],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProduitsModule,
    PanierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
