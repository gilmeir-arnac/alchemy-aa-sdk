---
outline: deep
head:
  - - meta
    - property: og:title
      content: FordefiSigner • constructor
  - - meta
    - name: description
      content: Overview of the constructor method on FordefiSigner in aa-signers
  - - meta
    - property: og:description
      content: Overview of the constructor method on FordefiSigner in aa-signers
---

# constructor

To initialize a `FordefiSigner`, you must provide a set of parameters detailed below.

## Usage

::: code-group

```ts [example.ts]
import { sepolia } from "@alchemy/aa-core";
import { FordefiSigner } from "@alchemy/aa-signers/fordefi";
import { ChainUniqueId } from "@fordefi/web3-provider";

// instantiates using every possible parameter, as a reference
const fordefiSigner = new FordefiSigner({
  organizationId: "12345678-abcd-1234-abcd-123456789012",
  chainId: ChainUniqueId.evmEthereumSepolia,
  address: "0x1234567890123456789012345678901234567890",
  apiUserToken: process.env.FORDEFI_API_USER_TOKEN!,
  apiPayloadSignKey: process.env.FORDEFI_API_PAYLOAD_SIGNING_KEY!,
});
```

:::

## Returns

### `FordefiSigner`

A new instance of a `FordefiSigner`.

## Parameters

### `params: FordefiProviderConfig | { inner: FordefiWeb3Provider }`

You can either pass in a constructed `FordefiWeb3Provider` object, or directly pass into the `FordefiSigner` the `FordefiProviderConfig` used to construct a `FordefiWeb3Provider` object. These parameters are listed on the [Fordefi repo](https://github.com/FordefiHQ/web3-provider/blob/main/src/types/config.ts) as well.

`FordefiProviderConfig` takes in the following parameters:

- `organizationId: string` -- Fordefi organization ID managing this address' vault.

- `chainId: EvmChainId | EvmChainUniqueId` -- Chain on which the signer acts for the given address.

- `address: Address` -- EVM address.

- `apiUserToken: string` -- Fordefi API User token issued via the [Fordefi Web Console](https://app.fordefi.com).

- `apiPayloadSignKey: string` -- Private key in PEM format used to sign the body of requests sent to the Fordefi API - the content of the private key `.pem`, see [Create a public/private signature key pair for the API client](https://docs.fordefi.com/reference/pair-an-api-client-with-the-api-signer).

- `apiBaseUrl?: string` -- [optional] Base URL for Fordefi API. Defaults to Fordefi's production API url.

- `rpcUrl?: string` -- [optional] Unused. Signing operations are fully implemented by Fordefi and do not require an external JSON-RPC node.
