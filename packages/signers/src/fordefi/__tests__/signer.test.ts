import {
  FordefiWeb3Provider,
  type Method,
  type MethodReturnType,
  type RequestArgs,
} from "@fordefi/web3-provider";
import type { Hex, TypedDataDefinition } from "viem";
import { FordefiSigner } from "../signer.js";

const fakeAddress: Hex = "0x1234567890123456789012345678901234567890";
const fakeMessage = "test";
const fakeSignedMessage: Hex = "0xtest";

describe("Fordefi Signer Tests", () => {
  it("should correctly get address", async () => {
    const signer = await givenSigner();

    const address = await signer.getAddress();
    expect(address).toMatchInlineSnapshot(`"${fakeAddress}"`);
  });

  it("should correctly fail to get address if unauthenticated", async () => {
    const signer = await givenSigner(false);

    const address = signer.getAddress();
    await expect(address).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Not authenticated"'
    );
  });

  it("should correctly get auth details", async () => {
    const signer = await givenSigner();

    const details = await signer.getAuthDetails();
    expect(details).toMatchInlineSnapshot(`
      {
        "addresses": [
          "${fakeAddress}",
        ],
      }
    `);
  });

  it("should correctly fail to get auth details if unauthenticated", async () => {
    const signer = await givenSigner(false);

    const details = signer.getAuthDetails();
    await expect(details).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Not authenticated"'
    );
  });

  it("should correctly sign message if authenticated", async () => {
    const signer = await givenSigner();

    const signMessage = await signer.signMessage(fakeMessage);
    expect(signMessage).toMatchInlineSnapshot(`"${fakeSignedMessage}"`);
  });

  it("should correctly fail to sign message if unauthenticated", async () => {
    const signer = await givenSigner(false);

    const signMessage = signer.signMessage(fakeMessage);
    await expect(signMessage).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Not authenticated"'
    );
  });

  it("should correctly sign typed data if authenticated", async () => {
    const signer = await givenSigner();

    const typedData = {
      types: {
        Request: [{ name: "hello", type: "string" }],
      },
      primaryType: "Request",
      message: {
        hello: "world",
      },
    } satisfies TypedDataDefinition;
    const signTypedData = await signer.signTypedData(typedData);
    expect(signTypedData).toMatchInlineSnapshot(`"${fakeSignedMessage}"`);
  });
});

const givenSigner = async (auth = true) => {
  const inner = new FordefiWeb3Provider({
    address: "0x1234567890123456789012345678901234567890",
    organizationId: "fakeOrganizationId",
    rpcUrl: "fakeRpcUrl",
    apiUserToken: "fakeApiUserToken",
    apiPayloadSignKey: "fakeApiKey",
    chainId: 11155111,
  });

  inner.request = vi.fn((async <M extends Method>(args: RequestArgs<M>) => {
    switch (args.method) {
      case "eth_accounts":
        return Promise.resolve([fakeAddress]) as Promise<
          MethodReturnType<"eth_accounts">
        >;
      case "personal_sign":
        return Promise.resolve(fakeSignedMessage) as Promise<
          MethodReturnType<"personal_sign">
        >;
      case "eth_signTypedData_v4":
        return Promise.resolve(fakeSignedMessage) as Promise<
          MethodReturnType<"eth_signTypedData_v4">
        >;
      default:
        return Promise.reject(new Error("Method not found"));
    }
  }) as FordefiWeb3Provider["request"]);

  const signer = new FordefiSigner({ inner });

  if (auth) {
    await signer.authenticate();
  }

  return signer;
};
