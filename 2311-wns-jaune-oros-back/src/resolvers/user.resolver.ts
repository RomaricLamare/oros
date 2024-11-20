import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import User, {
  InputRegister,
  InputChangeUserInfos,
  UserDeleted,
  Message,
  InputLogin,
} from '../entities/User.entity';
import UserServices from '../services/user.services';
import { MyContext } from '..';
import Cookies from 'cookies';
import { SignJWT } from 'jose';
import SessionServices from '../services/session.services';

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async listUsers() {
    const users: User[] = await new UserServices().list();
    return users;
  }

  @Query(() => User)
  async findUserById(@Arg('id') id: string) {
    const user: User = await new UserServices().findById(id);
    return user;
  }

  @Query(() => Message)
  async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
    const user = await new UserServices().findUserByEmail(infos.email);
    if (!user) {
      throw new Error('Vérify your login information');
    }

    const isPasswordValid = await user.verifyPassword(infos.password);
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email, role: user.role })
        .setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set('token', token, { httpOnly: true });

      // Créer ou récupérer la session
      const sessionServices = new SessionServices();
      const session = await sessionServices.createOrGetSession(ctx, user);

      console.log(token);
      console.log(cookies);
      console.log('babakens:', session.cart);

      m.message = 'Welcome!';
      m.success = true;
    } else {
      m.message = 'Verify your login information';
      m.success = false;
      throw new Error('Vérify your login information');
    }
    return m;
  }

  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set('token'); //sans valeur, le cookie token sera supprimé
    }
    if (ctx.sessionId) {
      const sessionServices = new SessionServices();
      sessionServices.deleteSessionCookie(ctx);
    }
    const m = new Message();
    m.message = 'Vous avez été déconnecté';
    m.success = true;

    return m;
  }

  // @Query(() => User, { nullable: true })
  // async userInfos(@Ctx() ctx: MyContext): Promise<User | null> {
  //   if (!ctx.user) {
  //     console.log('No user in context');
  //     return null;
  //   }
  //   console.log('User found in context:', ctx.user);
  //   return ctx.user;
  // }
  @Query(() => User, { nullable: true })
  async userInfos(@Ctx() ctx: MyContext) {
    console.log('CXT USER', ctx.user);
    return ctx.user;
  }
  // @Query(() => User)
  // async userInfos(@Ctx() ctx: MyContext) {
  //   const userId = ctx.user?.id;

  //   if (!userId) {
  //     throw new Error("Utilisateur non authentifié");
  //   }

  //   // Rechercher l'utilisateur en base de données
  //   const user = await datasource.getRepository(User).findOne({
  //     where: { id: userId },
  //     relations: ['session', 'session.cart'],  // Inclure les relations de session et panier
  //   });

  //   if (!user) {
  //     throw new Error("Utilisateur non trouvé");
  //   }

  //   return user;  // Renvoie les informations à jour de l'utilisateur
  // }

  @Mutation(() => User)
  async createUser(@Arg('infos') infos: InputRegister) {
    const result: User = await new UserServices().create(infos);
    console.log('RESULT', result);
    return result;
  }

  @Mutation(() => User)
  async updateUser(@Arg('infos') infos: InputChangeUserInfos) {
    const { id, ...otherData } = infos;
    const userToUpdate = await new UserServices().update(id, otherData);
    return userToUpdate;
  }

  @Mutation(() => UserDeleted)
  async deleteUser(@Arg('id') id: string) {
    const { ...user } = await new UserServices().delete(id);
    return user;
  }
}
