import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainNav from "@/components/MainNav/MainNav";
import { MockedProvider } from "@apollo/client/testing";
import { LIST_MATERIALS } from "@/requests/queries/materials.queries";
import { LIST_CATEGORIES } from "@/requests/queries/categories.queries";
import { USER_INFOS } from "@/requests/queries/auth.queries";
import AuthProvider from "@/context/authProvider";


jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: "/",
  }),
}));

describe("MainNav", () => {
  it("rendu du titre dans la navbar", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: LIST_MATERIALS,
            },
            result: {
              data: {
                listMaterials: [],
              },
            },
          },
          {
            request: {
              query: LIST_CATEGORIES,
            },
            result: {
              data: {
                listCategories: [],
              },
            },
          },
        ]}
      >
        <MainNav />
      </MockedProvider>
    );

    const titre = await screen.findByText(
      "Louez le matériel adapté à votre sport de montagne !"
    );

    expect(titre).toBeInTheDocument();
  });

    it("mock d'un faux utilisateur connecté", async () => {
        render(
            <MockedProvider
            mocks={[
                {
                  request: {
                    query: LIST_MATERIALS,
                  },
                  result: {
                    data: {
                      listMaterials: [],
                    },
                  },
                },
                {
                  request: {
                    query: LIST_CATEGORIES,
                  },
                  result: {
                    data: {
                      listCategories: [],
                    },
                  },
                },
                    {
                        request: {
                            query: USER_INFOS,
                        },
                        result: {
                            data: {
                                userInfos: {
                                    id: "123",
                                    firstname: "admin",
                                    lastname: "adminer",
                                    email: "test@myoros.com",
                                    role: "ADMIN",
                                },
                            },
                        },
                    },
                ]}
            >
                <AuthProvider>
                    <MainNav />
                </AuthProvider>
            </MockedProvider>
        );

        const adminLink = await screen.findByTestId("admin-link");

        expect(adminLink).toBeInTheDocument();
    });
});
