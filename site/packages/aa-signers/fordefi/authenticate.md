---
outline: deep
head:
  - - meta
    - property: og:title
      content: FordefiSigner • authenticate
  - - meta
    - name: description
      content: Overview of the authenticate method on FordefiSigner
  - - meta
    - property: og:description
      content: Overview of the authenticate method on FordefiSigner
---

# authenticate

`authenticate` is a method on the `FordefiSigner` which leverages the `Fordefi` provider to authenticate a user.

You must call this method before accessing the other methods available on the `FordefiSigner`, such as signing messages or typed data or accessing user details.

## Usage

::: code-group

```ts [example.ts]
// [!code focus:99]
import { FordefiSigner } from "@alchemy/aa-signers/fordefi";
import { ChainUniqueId } from "@fordefi/web3-provider";

const fordefiSigner = new FordefiSigner({
  organizationId: "12345678-abcd-1234-abcd-123456789012",
  chainId: ChainUniqueId.evmEthereumSepolia,
  address: "0x1234567890123456789012345678901234567890",
  apiUserToken: process.env.FORDEFI_API_USER_TOKEN!,
  apiPayloadSignKey: process.env.FORDEFI_API_PAYLOAD_SIGNING_KEY!,
});

await fordefiSigner.authenticate();
```

:::

## Returns

### `Promise<FordefiUserInfo>`

A Promise containing the `FordefiUserInfo`, an object with the following fields:

- `addresses: Address[]` -- an array with a single EOA address accessible via the Signer.
