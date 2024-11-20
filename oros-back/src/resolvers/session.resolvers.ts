import { Arg, Mutation, Resolver } from 'type-graphql';
import Session, { Cart } from '../entities/Session.entity';
import SessionServices from '../services/session.services';
import { DeletedCart } from '../entities/Session.entity';
import { CartItemInput } from '../entities/Session.entity';
@Resolver()
export default class SessionResolver {
  @Mutation(() => Session)
  async updateCart(
    @Arg('sessionId') sessionId: string,
    @Arg('materialId') materialId: string,
    @Arg('quantity') quantity: number,
    @Arg('startDate') startDate: Date,
    @Arg('endDate') endDate: Date,
  ) {
    return await new SessionServices().updateCart(
      sessionId,
      materialId,
      quantity,
      startDate,
      endDate,
    );
  }

  @Mutation(() => DeletedCart)
  async resetCart(@Arg('sessionId') sessionId: string) {
    const { ...cart } = await new SessionServices().resetCart(sessionId);
    return cart;
  }

  @Mutation(() => Cart)
  async updateManyCart(
    @Arg('sessionId') sessionId: string,
    @Arg('startDate') startDate: Date,
    @Arg('endDate') endDate: Date,
    @Arg('cartItems', () => [CartItemInput], { nullable: true })
    cartItems?: CartItemInput[],
  ) {
    const updatedCart = await new SessionServices().updateManyCart(
      sessionId,
      startDate,
      endDate,
      cartItems || [],
    );

    // Retourne le panier avec des `cartItems` assurés d'être un tableau
    return updatedCart;
  }

  @Mutation(() => Session)
  async removeCartItem(
    @Arg('sessionId') sessionId: string,
    @Arg('materialId') materialId: string,
  ) {
    return await new SessionServices().removeCartItem(sessionId, materialId);
  }
}
