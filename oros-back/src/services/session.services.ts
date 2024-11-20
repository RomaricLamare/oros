import { Repository } from 'typeorm';
import Session, { CartItem } from '../entities/Session.entity';
import Material from '../entities/Material.entity';
import datasource from '../lib/datasource';
import { MyContext } from '..';
import Cookies from 'cookies';
import User from '../entities/User.entity';
class SessionServices {
  db: Repository<Session>;
  materialRepository: Repository<Material>;
  constructor() {
    this.db = datasource.getRepository(Session);
    this.materialRepository = datasource.getRepository(Material);
  }

  async findById(id: string) {
    const session = await this.db.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!session) {
      throw new Error("La session n'existe pas");
    }
    return session;
  }

  async create(data: Partial<Session>) {
    const newSession = await this.db.create(data);
    return await this.db.save(newSession);
  }

  async createOrGetSession(ctx: MyContext, user: User) {
    const cookies = new Cookies(ctx.req, ctx.res);
    const sessionId = cookies.get('sessionId') ?? '';

    try {
      // Vérifier si une session existe déjà avec le sessionId du cookie
      const existingSession = await this.findById(sessionId);
      if (existingSession.user.id === user.id) {
        return existingSession;
      }
    } catch (error: unknown) {
      // Ignorer l'erreur si aucune session n'est trouvée avec le sessionId du cookie
    }

    // Vérifier si l'utilisateur a déjà une session
    const existingUserSession = await this.db.findOne({
      where: { user: { id: user.id } },
      relations: { user: true },
    });

    if (existingUserSession) {
      // Si une session existe déjà pour l'utilisateur, mettre à jour le cookie sessionId
      cookies.set('sessionId', existingUserSession.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return existingUserSession;
    }

    // Créer une nouvelle session si aucune session existante n'est trouvée
    const newSession = await this.create({
      user: user,
      cart: {
        cartItems: [],
        startDate: new Date(),
        endDate: new Date(),
      },
    });
    cookies.set('sessionId', newSession.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return newSession;
  }

  deleteSessionCookie(ctx: MyContext) {
    const cookies = new Cookies(ctx.req, ctx.res);

    // Récupère le cookie de la session existante
    const sessionId = cookies.get('sessionId');

    if (sessionId) {
      // Défini l'expiration du cookie à 2 heures dans le futur
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000); // Ajoute 2 heures

      cookies.set('sessionId', sessionId, {
        expires: expirationDate,
        httpOnly: true,
      });
      console.log('Session cookie set to expire in 2 hours');
    } else {
      console.log('No session cookie found');
    }
  }

  async update(id: string, data: Partial<Session>) {
    const findSession = await this.db.findOne({
      where: { id },
      relations: { user: true },
    });

    if (findSession) {
      const sessionToSave = this.db.merge(findSession, { ...data });
      return await this.db.save(sessionToSave);
    }
  }

  async updateCart(
    sessionId: string,
    materialId: string,
    quantity: number,
    startDate: Date,
    endDate: Date,
  ) {
    if (quantity < 0) {
      throw new Error('La quantité ne peut pas être négative');
    }

    const session = await this.findById(sessionId);

    const cart = session.cart || { cartItems: [], startDate, endDate };

    cart.startDate = startDate;
    cart.endDate = endDate;

    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.materialId === materialId,
    );

    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });

    if (!material) {
      throw new Error('Material not found');
    }

  if (existingItemIndex !== -1) {
    cart.cartItems[existingItemIndex].quantity = quantity;
  } else {
    const newCartItem = {
      materialId,
      quantity,
      id: material.id,
      name: material.name,
      description: material.description,
      image: material.image,
      initial_stock: material.initial_stock,
      price: material.price,
      slug: material.slug,
    };

      cart.cartItems.push(newCartItem);
    }
    console.log('wesh', cart);
    return await this.update(sessionId, { cart });
  }

  async resetCart(sessionId: string) {
    const session = await this.findById(sessionId);

    if (!session) {
      throw new Error("La session n'existe pas!");
    }

    session.cart = {
      cartItems: [],
      startDate: new Date(),
      endDate: new Date(),
    };

    return await this.db.save(session);
  }

  async updateManyCart(
    sessionId: string,
    startDate: Date,
    endDate: Date,
    cartItems: CartItem[],
  ) {
    const session = await this.findById(sessionId);
    if (!session) {
      throw new Error("La session n'existe pas!");
    }

    session.cart = session.cart || { cartItems: [], startDate, endDate };

    session.cart.startDate = startDate;
    session.cart.endDate = endDate;

    if (cartItems && cartItems.length > 0) {
      for (const item of cartItems) {
        const existingItemIndex = session.cart.cartItems.findIndex(
          (cartItem) => cartItem.materialId === item.materialId,
        );

        if (existingItemIndex !== -1) {
          session.cart.cartItems[existingItemIndex].quantity = item.quantity;
        } else {
          const material = await this.materialRepository.findOne({
            where: { id: item.materialId },
          });

          if (!material) {
            throw new Error(
              `Le matériel avec l'ID ${item.materialId} n'existe pas`,
            );
          }

        const newCartItem: CartItem = {
          id: item.id,
          materialId: item.materialId,
          quantity: item.quantity,
          name: material.name,
          description: material.description,
          image: material.image,
          initial_stock: material.initial_stock,
          price: material.price,
          slug: material.slug,
        };

          session.cart.cartItems.push(newCartItem);
        }
      }
    }

    await this.db.save(session);

    return {
      ...session.cart,
      cartItems: session.cart.cartItems || [],
    };
  }

  async removeCartItem(sessionId: string, materialId: string) {
    const session = await this.findById(sessionId);

    if (!session) {
      throw new Error("La session n'existe pas!");
    }

    session.cart.cartItems = session.cart.cartItems.filter(
      (item) => item.materialId !== materialId,
    );

    return await this.db.save(session);
  }
}

export default SessionServices;
