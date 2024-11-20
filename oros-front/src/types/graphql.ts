import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Cart = {
  __typename?: 'Cart';
  cartItems: Array<CartItem>;
  endDate: Scalars['DateTimeISO']['output'];
  startDate: Scalars['DateTimeISO']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  initial_stock: Scalars['Float']['output'];
  materialId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type CartItemInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  initial_stock: Scalars['Float']['input'];
  materialId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  materials?: Maybe<Array<Material>>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type DeletedCart = {
  __typename?: 'DeletedCart';
  cart: Cart;
  id: Scalars['ID']['output'];
  user: User;
};

export type InputChangeUserInfos = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type InputCreateCategory = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type InputCreateMaterial = {
  category?: InputMaybe<PartialCategoryInput>;
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  initial_stock: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};

export type InputCreateReservation = {
  end_date: Scalars['DateTimeISO']['input'];
  material: Array<MaterialReservationInput>;
  start_date: Scalars['DateTimeISO']['input'];
  user?: InputMaybe<PartialUserInput>;
};

export type InputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputRegister = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type InputUpdateCategory = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateMaterial = {
  category?: InputMaybe<PartialCategoryInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  initial_stock?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type InputUpdateReservation = {
  end_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id: Scalars['String']['input'];
  start_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type InputUpdateReservedMaterial = {
  id: Scalars['String']['input'];
  material?: InputMaybe<PartialMaterialInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  qtty_reserved?: InputMaybe<Scalars['Float']['input']>;
  reservation?: InputMaybe<PartialReservationInput>;
};

export type Material = {
  __typename?: 'Material';
  category: Category;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  initial_stock: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type MaterialDeleted = {
  __typename?: 'MaterialDeleted';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type MaterialReservationInput = {
  id: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  qtty_reserved?: InputMaybe<Scalars['Float']['input']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createMaterial: Material;
  createReservation: Reservation;
  createUser: User;
  deleteCategory: Category;
  deleteMaterial: MaterialDeleted;
  deleteReservation: ReservationDeleted;
  deleteReservedMaterial: ReservedMaterialDeleted;
  deleteUser: UserDeleted;
  removeCartItem: Session;
  resetCart: DeletedCart;
  updateCart: Session;
  updateCategory: Category;
  updateManyCart: Cart;
  updateMaterial: Material;
  updateReservation: Reservation;
  updateReservedMaterial: ReservedMaterial;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  infos: InputCreateCategory;
};


export type MutationCreateMaterialArgs = {
  infos: InputCreateMaterial;
};


export type MutationCreateReservationArgs = {
  infos: InputCreateReservation;
};


export type MutationCreateUserArgs = {
  infos: InputRegister;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReservationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReservedMaterialArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCartItemArgs = {
  materialId: Scalars['String']['input'];
  sessionId: Scalars['String']['input'];
};


export type MutationResetCartArgs = {
  sessionId: Scalars['String']['input'];
};


export type MutationUpdateCartArgs = {
  endDate: Scalars['DateTimeISO']['input'];
  materialId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  sessionId: Scalars['String']['input'];
  startDate: Scalars['DateTimeISO']['input'];
};


export type MutationUpdateCategoryArgs = {
  infos: InputUpdateCategory;
};


export type MutationUpdateManyCartArgs = {
  cartItems?: InputMaybe<Array<CartItemInput>>;
  endDate: Scalars['DateTimeISO']['input'];
  sessionId: Scalars['String']['input'];
  startDate: Scalars['DateTimeISO']['input'];
};


export type MutationUpdateMaterialArgs = {
  infos: InputUpdateMaterial;
};


export type MutationUpdateReservationArgs = {
  infos: InputUpdateReservation;
};


export type MutationUpdateReservedMaterialArgs = {
  infos: InputUpdateReservedMaterial;
};


export type MutationUpdateUserArgs = {
  infos: InputChangeUserInfos;
};

export type PartialCategoryInput = {
  id: Scalars['Float']['input'];
};

export type PartialMaterialInput = {
  id: Scalars['String']['input'];
};

export type PartialReservationInput = {
  id: Scalars['String']['input'];
};

export type PartialUserInput = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  findCategoryById: Category;
  findMaterialById: Material;
  findReservationById: Reservation;
  findReservedMaterialById: ReservedMaterial;
  findUserById: User;
  listCategories: Array<Category>;
  listMaterials: Array<Material>;
  listMaterialsByIds: Array<Material>;
  listReservations: Array<Reservation>;
  listReservedMaterials: Array<ReservedMaterial>;
  listReservedMaterialsByUserId: Array<ReservedMaterial>;
  listUsers: Array<User>;
  login: Message;
  logout: Message;
  userInfos?: Maybe<User>;
};


export type QueryFindCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindMaterialByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindReservationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindReservedMaterialByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryListMaterialsByIdsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryListReservedMaterialsByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type Reservation = {
  __typename?: 'Reservation';
  completed: Scalars['Boolean']['output'];
  end_date: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  start_date: Scalars['DateTimeISO']['output'];
  user: User;
};

export type ReservationDeleted = {
  __typename?: 'ReservationDeleted';
  end_date: Scalars['DateTimeISO']['output'];
  start_date: Scalars['DateTimeISO']['output'];
};

export type ReservedMaterial = {
  __typename?: 'ReservedMaterial';
  id: Scalars['ID']['output'];
  material: Material;
  price: Scalars['Float']['output'];
  qtty_reserved: Scalars['Float']['output'];
  reservation: Reservation;
};

export type ReservedMaterialDeleted = {
  __typename?: 'ReservedMaterialDeleted';
  material?: Maybe<Material>;
  price?: Maybe<Scalars['Float']['output']>;
  qtty_reserved?: Maybe<Scalars['Float']['output']>;
  reservation?: Maybe<Reservation>;
};

export type Session = {
  __typename?: 'Session';
  cart: Cart;
  id: Scalars['ID']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  reservations?: Maybe<Array<Reservation>>;
  role: Scalars['String']['output'];
  session?: Maybe<Session>;
};

export type UserDeleted = {
  __typename?: 'UserDeleted';
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  infos: InputRegister;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstname: string, lastname: string, password: string, role: string } };

export type UpdateUserMutationVariables = Exact<{
  infos: InputChangeUserInfos;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, password: string, role: string, reservations?: Array<{ __typename?: 'Reservation', id: string }> | null } };

export type UpdateMaterialMutationVariables = Exact<{
  infos: InputUpdateMaterial;
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', id: string, name: string, slug: string, price: number, initial_stock: number, image: string, description: string, category: { __typename?: 'Category', id: string } } };

export type CreateMaterialMutationVariables = Exact<{
  infos: InputCreateMaterial;
}>;


export type CreateMaterialMutation = { __typename?: 'Mutation', createMaterial: { __typename?: 'Material', id: string, name: string, description: string, image: string, initial_stock: number, price: number, slug: string, category: { __typename?: 'Category', id: string } } };

export type DeleteMaterialMutationVariables = Exact<{
  deleteMaterialId: Scalars['String']['input'];
}>;


export type DeleteMaterialMutation = { __typename?: 'Mutation', deleteMaterial: { __typename?: 'MaterialDeleted', success: boolean, message: string } };

export type CreateReservationMutationVariables = Exact<{
  infos: InputCreateReservation;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation: { __typename?: 'Reservation', id: string, start_date: any, end_date: any, completed: boolean, user: { __typename?: 'User', id: string, firstname: string } } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Message', success: boolean, message: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'Message', success: boolean, message: string } };

export type UserInfosQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfosQuery = { __typename?: 'Query', userInfos?: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, password: string, role: string, reservations?: Array<{ __typename?: 'Reservation', id: string }> | null, session?: { __typename?: 'Session', id: string, cart: { __typename?: 'Cart', endDate: any, startDate: any, cartItems: Array<{ __typename?: 'CartItem', slug: string, price: number, initial_stock: number, image: string, description: string, name: string, quantity: number, materialId: string }> } } | null } | null };

export type ListCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCategoriesQuery = { __typename?: 'Query', listCategories: Array<{ __typename?: 'Category', id: string, name: string, slug: string }> };

export type FindCategoryByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindCategoryByIdQuery = { __typename?: 'Query', findCategoryById: { __typename?: 'Category', id: string, materials?: Array<{ __typename?: 'Material', id: string, name: string, price: number, image: string, slug: string }> | null } };

export type ListMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListMaterialsQuery = { __typename?: 'Query', listMaterials: Array<{ __typename?: 'Material', id: string, name: string, description: string, image: string, price: number, initial_stock: number, slug: string, category: { __typename?: 'Category', id: string, name: string, slug: string } }> };

export type FindMaterialByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindMaterialByIdQuery = { __typename?: 'Query', findMaterialById: { __typename?: 'Material', id: string, name: string, description: string, image: string, price: number, initial_stock: number, slug: string, category: { __typename?: 'Category', id: string, name: string, slug: string } } };

export type ListMaterialsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type ListMaterialsByIdsQuery = { __typename?: 'Query', listMaterialsByIds: Array<{ __typename?: 'Material', id: string, name: string, image: string, description: string, initial_stock: number, price: number, slug: string, category: { __typename?: 'Category', id: string } }> };

export type ListReservedMaterialsByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ListReservedMaterialsByUserIdQuery = { __typename?: 'Query', listReservedMaterialsByUserId: Array<{ __typename?: 'ReservedMaterial', id: string, qtty_reserved: number, price: number, material: { __typename?: 'Material', id: string, name: string, description: string, image: string, price: number }, reservation: { __typename?: 'Reservation', id: string, start_date: any, end_date: any, completed: boolean, user: { __typename?: 'User', id: string } } }> };

export type QueryQueryVariables = Exact<{
  findReservedMaterialByIdId: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', findReservedMaterialById: { __typename?: 'ReservedMaterial', id: string, qtty_reserved: number, price: number, material: { __typename?: 'Material', id: string, name: string, image: string, price: number }, reservation: { __typename?: 'Reservation', id: string } } };

export type ListReservedMaterielByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ListReservedMaterielByUserIdQuery = { __typename?: 'Query', listReservedMaterialsByUserId: Array<{ __typename?: 'ReservedMaterial', id: string, qtty_reserved: number, price: number, material: { __typename?: 'Material', id: string, name: string, description: string, image: string, initial_stock: number, price: number, slug: string }, reservation: { __typename?: 'Reservation', id: string, start_date: any, end_date: any, completed: boolean } }> };

export type ListReservedMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListReservedMaterialsQuery = { __typename?: 'Query', listReservedMaterials: Array<{ __typename?: 'ReservedMaterial', id: string, qtty_reserved: number, price: number, material: { __typename?: 'Material', id: string, name: string, image: string }, reservation: { __typename?: 'Reservation', end_date: any, start_date: any, user: { __typename?: 'User', id: string, firstname: string, lastname: string } } }> };


export const CreateUserDocument = gql`
    mutation CreateUser($infos: InputRegister!) {
  createUser(infos: $infos) {
    id
    email
    firstname
    lastname
    password
    role
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($infos: InputChangeUserInfos!) {
  updateUser(infos: $infos) {
    id
    firstname
    lastname
    email
    password
    reservations {
      id
    }
    role
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateMaterialDocument = gql`
    mutation UpdateMaterial($infos: InputUpdateMaterial!) {
  updateMaterial(infos: $infos) {
    id
    name
    category {
      id
    }
    slug
    price
    initial_stock
    image
    description
  }
}
    `;
export type UpdateMaterialMutationFn = Apollo.MutationFunction<UpdateMaterialMutation, UpdateMaterialMutationVariables>;

/**
 * __useUpdateMaterialMutation__
 *
 * To run a mutation, you first call `useUpdateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMaterialMutation, { data, loading, error }] = useUpdateMaterialMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useUpdateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(UpdateMaterialDocument, options);
      }
export type UpdateMaterialMutationHookResult = ReturnType<typeof useUpdateMaterialMutation>;
export type UpdateMaterialMutationResult = Apollo.MutationResult<UpdateMaterialMutation>;
export type UpdateMaterialMutationOptions = Apollo.BaseMutationOptions<UpdateMaterialMutation, UpdateMaterialMutationVariables>;
export const CreateMaterialDocument = gql`
    mutation CreateMaterial($infos: InputCreateMaterial!) {
  createMaterial(infos: $infos) {
    id
    name
    category {
      id
    }
    description
    image
    initial_stock
    price
    slug
  }
}
    `;
export type CreateMaterialMutationFn = Apollo.MutationFunction<CreateMaterialMutation, CreateMaterialMutationVariables>;

/**
 * __useCreateMaterialMutation__
 *
 * To run a mutation, you first call `useCreateMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMaterialMutation, { data, loading, error }] = useCreateMaterialMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateMaterialMutation(baseOptions?: Apollo.MutationHookOptions<CreateMaterialMutation, CreateMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMaterialMutation, CreateMaterialMutationVariables>(CreateMaterialDocument, options);
      }
export type CreateMaterialMutationHookResult = ReturnType<typeof useCreateMaterialMutation>;
export type CreateMaterialMutationResult = Apollo.MutationResult<CreateMaterialMutation>;
export type CreateMaterialMutationOptions = Apollo.BaseMutationOptions<CreateMaterialMutation, CreateMaterialMutationVariables>;
export const DeleteMaterialDocument = gql`
    mutation DeleteMaterial($deleteMaterialId: String!) {
  deleteMaterial(id: $deleteMaterialId) {
    success
    message
  }
}
    `;
export type DeleteMaterialMutationFn = Apollo.MutationFunction<DeleteMaterialMutation, DeleteMaterialMutationVariables>;

/**
 * __useDeleteMaterialMutation__
 *
 * To run a mutation, you first call `useDeleteMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMaterialMutation, { data, loading, error }] = useDeleteMaterialMutation({
 *   variables: {
 *      deleteMaterialId: // value for 'deleteMaterialId'
 *   },
 * });
 */
export function useDeleteMaterialMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMaterialMutation, DeleteMaterialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMaterialMutation, DeleteMaterialMutationVariables>(DeleteMaterialDocument, options);
      }
export type DeleteMaterialMutationHookResult = ReturnType<typeof useDeleteMaterialMutation>;
export type DeleteMaterialMutationResult = Apollo.MutationResult<DeleteMaterialMutation>;
export type DeleteMaterialMutationOptions = Apollo.BaseMutationOptions<DeleteMaterialMutation, DeleteMaterialMutationVariables>;
export const CreateReservationDocument = gql`
    mutation CreateReservation($infos: InputCreateReservation!) {
  createReservation(infos: $infos) {
    id
    start_date
    end_date
    completed
    user {
      id
      firstname
    }
  }
}
    `;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    success
    message
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const UserInfosDocument = gql`
    query UserInfos {
  userInfos {
    id
    firstname
    lastname
    email
    password
    reservations {
      id
    }
    role
    session {
      id
      cart {
        endDate
        startDate
        cartItems {
          slug
          price
          initial_stock
          image
          description
          name
          quantity
          materialId
        }
      }
    }
  }
}
    `;

/**
 * __useUserInfosQuery__
 *
 * To run a query within a React component, call `useUserInfosQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfosQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfosQuery(baseOptions?: Apollo.QueryHookOptions<UserInfosQuery, UserInfosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfosQuery, UserInfosQueryVariables>(UserInfosDocument, options);
      }
export function useUserInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfosQuery, UserInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfosQuery, UserInfosQueryVariables>(UserInfosDocument, options);
        }
export function useUserInfosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserInfosQuery, UserInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserInfosQuery, UserInfosQueryVariables>(UserInfosDocument, options);
        }
export type UserInfosQueryHookResult = ReturnType<typeof useUserInfosQuery>;
export type UserInfosLazyQueryHookResult = ReturnType<typeof useUserInfosLazyQuery>;
export type UserInfosSuspenseQueryHookResult = ReturnType<typeof useUserInfosSuspenseQuery>;
export type UserInfosQueryResult = Apollo.QueryResult<UserInfosQuery, UserInfosQueryVariables>;
export const ListCategoriesDocument = gql`
    query ListCategories {
  listCategories {
    id
    name
    slug
  }
}
    `;

/**
 * __useListCategoriesQuery__
 *
 * To run a query within a React component, call `useListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
      }
export function useListCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export function useListCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export type ListCategoriesQueryHookResult = ReturnType<typeof useListCategoriesQuery>;
export type ListCategoriesLazyQueryHookResult = ReturnType<typeof useListCategoriesLazyQuery>;
export type ListCategoriesSuspenseQueryHookResult = ReturnType<typeof useListCategoriesSuspenseQuery>;
export type ListCategoriesQueryResult = Apollo.QueryResult<ListCategoriesQuery, ListCategoriesQueryVariables>;
export const FindCategoryByIdDocument = gql`
    query FindCategoryById($id: String!) {
  findCategoryById(id: $id) {
    id
    materials {
      id
      name
      price
      image
      slug
    }
  }
}
    `;

/**
 * __useFindCategoryByIdQuery__
 *
 * To run a query within a React component, call `useFindCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryByIdQuery, FindCategoryByIdQueryVariables> & ({ variables: FindCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>(FindCategoryByIdDocument, options);
      }
export function useFindCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>(FindCategoryByIdDocument, options);
        }
export function useFindCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>(FindCategoryByIdDocument, options);
        }
export type FindCategoryByIdQueryHookResult = ReturnType<typeof useFindCategoryByIdQuery>;
export type FindCategoryByIdLazyQueryHookResult = ReturnType<typeof useFindCategoryByIdLazyQuery>;
export type FindCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useFindCategoryByIdSuspenseQuery>;
export type FindCategoryByIdQueryResult = Apollo.QueryResult<FindCategoryByIdQuery, FindCategoryByIdQueryVariables>;
export const ListMaterialsDocument = gql`
    query ListMaterials {
  listMaterials {
    id
    name
    description
    image
    price
    initial_stock
    slug
    category {
      id
      name
      slug
    }
  }
}
    `;

/**
 * __useListMaterialsQuery__
 *
 * To run a query within a React component, call `useListMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListMaterialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<ListMaterialsQuery, ListMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListMaterialsQuery, ListMaterialsQueryVariables>(ListMaterialsDocument, options);
      }
export function useListMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListMaterialsQuery, ListMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListMaterialsQuery, ListMaterialsQueryVariables>(ListMaterialsDocument, options);
        }
export function useListMaterialsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListMaterialsQuery, ListMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListMaterialsQuery, ListMaterialsQueryVariables>(ListMaterialsDocument, options);
        }
export type ListMaterialsQueryHookResult = ReturnType<typeof useListMaterialsQuery>;
export type ListMaterialsLazyQueryHookResult = ReturnType<typeof useListMaterialsLazyQuery>;
export type ListMaterialsSuspenseQueryHookResult = ReturnType<typeof useListMaterialsSuspenseQuery>;
export type ListMaterialsQueryResult = Apollo.QueryResult<ListMaterialsQuery, ListMaterialsQueryVariables>;
export const FindMaterialByIdDocument = gql`
    query FindMaterialById($id: String!) {
  findMaterialById(id: $id) {
    id
    name
    description
    category {
      id
      name
      slug
    }
    image
    price
    initial_stock
    slug
  }
}
    `;

/**
 * __useFindMaterialByIdQuery__
 *
 * To run a query within a React component, call `useFindMaterialByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMaterialByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMaterialByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindMaterialByIdQuery(baseOptions: Apollo.QueryHookOptions<FindMaterialByIdQuery, FindMaterialByIdQueryVariables> & ({ variables: FindMaterialByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>(FindMaterialByIdDocument, options);
      }
export function useFindMaterialByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>(FindMaterialByIdDocument, options);
        }
export function useFindMaterialByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>(FindMaterialByIdDocument, options);
        }
export type FindMaterialByIdQueryHookResult = ReturnType<typeof useFindMaterialByIdQuery>;
export type FindMaterialByIdLazyQueryHookResult = ReturnType<typeof useFindMaterialByIdLazyQuery>;
export type FindMaterialByIdSuspenseQueryHookResult = ReturnType<typeof useFindMaterialByIdSuspenseQuery>;
export type FindMaterialByIdQueryResult = Apollo.QueryResult<FindMaterialByIdQuery, FindMaterialByIdQueryVariables>;
export const ListMaterialsByIdsDocument = gql`
    query listMaterialsByIds($ids: [String!]!) {
  listMaterialsByIds(ids: $ids) {
    id
    name
    image
    description
    initial_stock
    price
    slug
    category {
      id
    }
  }
}
    `;

/**
 * __useListMaterialsByIdsQuery__
 *
 * To run a query within a React component, call `useListMaterialsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListMaterialsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListMaterialsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useListMaterialsByIdsQuery(baseOptions: Apollo.QueryHookOptions<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables> & ({ variables: ListMaterialsByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>(ListMaterialsByIdsDocument, options);
      }
export function useListMaterialsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>(ListMaterialsByIdsDocument, options);
        }
export function useListMaterialsByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>(ListMaterialsByIdsDocument, options);
        }
export type ListMaterialsByIdsQueryHookResult = ReturnType<typeof useListMaterialsByIdsQuery>;
export type ListMaterialsByIdsLazyQueryHookResult = ReturnType<typeof useListMaterialsByIdsLazyQuery>;
export type ListMaterialsByIdsSuspenseQueryHookResult = ReturnType<typeof useListMaterialsByIdsSuspenseQuery>;
export type ListMaterialsByIdsQueryResult = Apollo.QueryResult<ListMaterialsByIdsQuery, ListMaterialsByIdsQueryVariables>;
export const ListReservedMaterialsByUserIdDocument = gql`
    query ListReservedMaterialsByUserId($userId: String!) {
  listReservedMaterialsByUserId(userId: $userId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      description
      image
      price
    }
    reservation {
      id
      user {
        id
      }
      start_date
      end_date
      completed
    }
  }
}
    `;

/**
 * __useListReservedMaterialsByUserIdQuery__
 *
 * To run a query within a React component, call `useListReservedMaterialsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListReservedMaterialsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListReservedMaterialsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useListReservedMaterialsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables> & ({ variables: ListReservedMaterialsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>(ListReservedMaterialsByUserIdDocument, options);
      }
export function useListReservedMaterialsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>(ListReservedMaterialsByUserIdDocument, options);
        }
export function useListReservedMaterialsByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>(ListReservedMaterialsByUserIdDocument, options);
        }
export type ListReservedMaterialsByUserIdQueryHookResult = ReturnType<typeof useListReservedMaterialsByUserIdQuery>;
export type ListReservedMaterialsByUserIdLazyQueryHookResult = ReturnType<typeof useListReservedMaterialsByUserIdLazyQuery>;
export type ListReservedMaterialsByUserIdSuspenseQueryHookResult = ReturnType<typeof useListReservedMaterialsByUserIdSuspenseQuery>;
export type ListReservedMaterialsByUserIdQueryResult = Apollo.QueryResult<ListReservedMaterialsByUserIdQuery, ListReservedMaterialsByUserIdQueryVariables>;
export const QueryDocument = gql`
    query Query($findReservedMaterialByIdId: String!) {
  findReservedMaterialById(id: $findReservedMaterialByIdId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      image
      price
    }
    reservation {
      id
    }
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      findReservedMaterialByIdId: // value for 'findReservedMaterialByIdId'
 *   },
 * });
 */
export function useQueryQuery(baseOptions: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables> & ({ variables: QueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const ListReservedMaterielByUserIdDocument = gql`
    query ListReservedMaterielByUserId($userId: String!) {
  listReservedMaterialsByUserId(userId: $userId) {
    id
    qtty_reserved
    price
    material {
      id
      name
      description
      image
      initial_stock
      price
      slug
    }
    reservation {
      id
      start_date
      end_date
      completed
    }
  }
}
    `;

/**
 * __useListReservedMaterielByUserIdQuery__
 *
 * To run a query within a React component, call `useListReservedMaterielByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListReservedMaterielByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListReservedMaterielByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useListReservedMaterielByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables> & ({ variables: ListReservedMaterielByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>(ListReservedMaterielByUserIdDocument, options);
      }
export function useListReservedMaterielByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>(ListReservedMaterielByUserIdDocument, options);
        }
export function useListReservedMaterielByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>(ListReservedMaterielByUserIdDocument, options);
        }
export type ListReservedMaterielByUserIdQueryHookResult = ReturnType<typeof useListReservedMaterielByUserIdQuery>;
export type ListReservedMaterielByUserIdLazyQueryHookResult = ReturnType<typeof useListReservedMaterielByUserIdLazyQuery>;
export type ListReservedMaterielByUserIdSuspenseQueryHookResult = ReturnType<typeof useListReservedMaterielByUserIdSuspenseQuery>;
export type ListReservedMaterielByUserIdQueryResult = Apollo.QueryResult<ListReservedMaterielByUserIdQuery, ListReservedMaterielByUserIdQueryVariables>;
export const ListReservedMaterialsDocument = gql`
    query ListReservedMaterials {
  listReservedMaterials {
    id
    qtty_reserved
    price
    material {
      id
      name
      image
    }
    reservation {
      user {
        id
        firstname
        lastname
      }
      end_date
      start_date
    }
  }
}
    `;

/**
 * __useListReservedMaterialsQuery__
 *
 * To run a query within a React component, call `useListReservedMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListReservedMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListReservedMaterialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListReservedMaterialsQuery(baseOptions?: Apollo.QueryHookOptions<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>(ListReservedMaterialsDocument, options);
      }
export function useListReservedMaterialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>(ListReservedMaterialsDocument, options);
        }
export function useListReservedMaterialsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>(ListReservedMaterialsDocument, options);
        }
export type ListReservedMaterialsQueryHookResult = ReturnType<typeof useListReservedMaterialsQuery>;
export type ListReservedMaterialsLazyQueryHookResult = ReturnType<typeof useListReservedMaterialsLazyQuery>;
export type ListReservedMaterialsSuspenseQueryHookResult = ReturnType<typeof useListReservedMaterialsSuspenseQuery>;
export type ListReservedMaterialsQueryResult = Apollo.QueryResult<ListReservedMaterialsQuery, ListReservedMaterialsQueryVariables>;