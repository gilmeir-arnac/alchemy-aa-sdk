import {
  getContract,
  encodeFunctionData,
  encodeAbiParameters,
  type Address,
  type GetContractReturnType,
  type HttpTransport,
  type Transport,
  type GetFunctionArgs,
} from "viem";
import { type Plugin } from "../types.js";
import {
  type PublicErc4337Client,
  type UserOperationOverrides,
  type SupportedTransports,
  type ISmartAccountProvider,
} from "@alchemy/aa-core";
import { type IMSCA } from "../../types.js";
import { installPlugin as installPlugin_ } from "../../plugin-manager/installPlugin.js";
import { type FunctionReference } from "../../account-loupe/types.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6900PluginGen: This file is auto-generated by plugingen
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type InstallArgs = [{ type: "address[]" }];
export type InstallMultiOwnerPluginParams = {
  args: Parameters<typeof encodeAbiParameters<InstallArgs>>[1];
  pluginAddress?: Address;
  dependencyOverrides?: FunctionReference[];
};

const addresses = {
  11155111: "0xB76734F322b9f2C8F1dA934252dED3bC3C25b109" as Address,
} as Record<number, Address>;

const MultiOwnerPlugin_ = {
  meta: {
    name: "Multi Owner Plugin",
    version: "1.0.0",
    addresses,
  },
  getContract: (
    rpcClient:
      | PublicErc4337Client<HttpTransport>
      | PublicErc4337Client<Transport>,
    address?: Address
  ): GetContractReturnType<
    typeof MultiOwnerPluginAbi,
    typeof rpcClient,
    undefined,
    Address
  > =>
    getContract({
      address: address || addresses[rpcClient.chain.id],
      abi: MultiOwnerPluginAbi,
      publicClient: rpcClient,
    }),
  accountMethods: (account: IMSCA<any, any, any>) => ({
    encodeUpdateOwnersData: ({
      args,
    }: GetFunctionArgs<
      typeof MultiOwnerPluginExecutionFunctionAbi,
      "updateOwners"
    >) => {
      return encodeFunctionData({
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "updateOwners",
        args,
      });
    },

    encodeEip712DomainData: () => {
      return encodeFunctionData({
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "eip712Domain",
      });
    },

    readEip712Domain: async () => {
      return account.rpcProvider.readContract({
        address: await account.getAddress(),
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "eip712Domain",
      });
    },

    encodeIsValidSignatureData: ({
      args,
    }: GetFunctionArgs<
      typeof MultiOwnerPluginExecutionFunctionAbi,
      "isValidSignature"
    >) => {
      return encodeFunctionData({
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "isValidSignature",
        args,
      });
    },

    readIsValidSignature: async ({
      args,
    }: GetFunctionArgs<
      typeof MultiOwnerPluginExecutionFunctionAbi,
      "isValidSignature"
    >) => {
      return account.rpcProvider.readContract({
        address: await account.getAddress(),
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "isValidSignature",
        args,
      });
    },
  }),
  providerMethods: <
    TTransport extends SupportedTransports,
    P extends ISmartAccountProvider<TTransport> & {
      account: IMSCA<TTransport>;
    }
  >(
    provider: P
  ) => ({
    updateOwners: (
      {
        args,
      }: GetFunctionArgs<
        typeof MultiOwnerPluginExecutionFunctionAbi,
        "updateOwners"
      >,
      overrides?: UserOperationOverrides
    ) => {
      const callData = encodeFunctionData({
        abi: MultiOwnerPluginExecutionFunctionAbi,
        functionName: "updateOwners",
        args,
      });

      return provider.sendUserOperation(callData, overrides);
    },

    installMultiOwnerPlugin: (
      params: InstallMultiOwnerPluginParams,
      overrides?: UserOperationOverrides
    ) => {
      const chain = provider.rpcClient.chain;
      const dependencies = params.dependencyOverrides ?? [];
      const pluginAddress =
        params.pluginAddress ??
        (MultiOwnerPlugin_.meta.addresses[chain.id] as Address | undefined);

      if (!pluginAddress) {
        throw new Error(
          "missing MultiOwnerPlugin address for chain " + chain.name
        );
      }

      return installPlugin_(
        provider,
        {
          pluginAddress,
          pluginInitData: encodeAbiParameters(
            [{ type: "address[]" }],
            params.args
          ),
          dependencies,
        },
        overrides
      );
    },
  }),
};

export const MultiOwnerPlugin: Plugin<
  ReturnType<(typeof MultiOwnerPlugin_)["accountMethods"]>,
  ReturnType<(typeof MultiOwnerPlugin_)["providerMethods"]>,
  typeof MultiOwnerPluginAbi
> = MultiOwnerPlugin_;

export const MultiOwnerPluginExecutionFunctionAbi = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ownersToAdd", internalType: "address[]", type: "address[]" },
      { name: "ownersToRemove", internalType: "address[]", type: "address[]" },
    ],
    name: "updateOwners",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "digest", internalType: "bytes32", type: "bytes32" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
] as const;

export const MultiOwnerPluginAbi = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "message", internalType: "bytes", type: "bytes" },
    ],
    name: "encodeMessageData",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "message", internalType: "bytes", type: "bytes" },
    ],
    name: "getMessageHash",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "ownerToCheck", internalType: "address", type: "address" },
    ],
    name: "isOwnerOf",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "digest", internalType: "bytes32", type: "bytes32" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "onInstall",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    name: "onUninstall",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "ownersOf",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "pluginManifest",
    outputs: [
      {
        name: "",
        internalType: "struct PluginManifest",
        type: "tuple",
        components: [
          { name: "interfaceIds", internalType: "bytes4[]", type: "bytes4[]" },
          {
            name: "dependencyInterfaceIds",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "executionFunctions",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "permittedExecutionSelectors",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "permitAnyExternalAddress",
            internalType: "bool",
            type: "bool",
          },
          { name: "canSpendNativeToken", internalType: "bool", type: "bool" },
          {
            name: "permittedExternalCalls",
            internalType: "struct ManifestExternalCallPermission[]",
            type: "tuple[]",
            components: [
              {
                name: "externalAddress",
                internalType: "address",
                type: "address",
              },
              { name: "permitAnySelector", internalType: "bool", type: "bool" },
              { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
            ],
          },
          {
            name: "userOpValidationFunctions",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "runtimeValidationFunctions",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "preUserOpValidationHooks",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "preRuntimeValidationHooks",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "executionHooks",
            internalType: "struct ManifestExecutionHook[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "preExecHook",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
              {
                name: "postExecHook",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "pluginMetadata",
    outputs: [
      {
        name: "",
        internalType: "struct PluginMetadata",
        type: "tuple",
        components: [
          { name: "name", internalType: "string", type: "string" },
          { name: "version", internalType: "string", type: "string" },
          { name: "author", internalType: "string", type: "string" },
          {
            name: "permissionDescriptors",
            internalType: "struct SelectorPermission[]",
            type: "tuple[]",
            components: [
              {
                name: "functionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "permissionDescription",
                internalType: "string",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "preExecHookData", internalType: "bytes", type: "bytes" },
    ],
    name: "postExecutionHook",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "preExecutionHook",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "preRuntimeValidationHook",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      {
        name: "userOp",
        internalType: "struct UserOperation",
        type: "tuple",
        components: [
          { name: "sender", internalType: "address", type: "address" },
          { name: "nonce", internalType: "uint256", type: "uint256" },
          { name: "initCode", internalType: "bytes", type: "bytes" },
          { name: "callData", internalType: "bytes", type: "bytes" },
          { name: "callGasLimit", internalType: "uint256", type: "uint256" },
          {
            name: "verificationGasLimit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "preVerificationGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "maxFeePerGas", internalType: "uint256", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "paymasterAndData", internalType: "bytes", type: "bytes" },
          { name: "signature", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "userOpHash", internalType: "bytes32", type: "bytes32" },
    ],
    name: "preUserOpValidationHook",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "runtimeValidationFunction",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ownersToAdd", internalType: "address[]", type: "address[]" },
      { name: "ownersToRemove", internalType: "address[]", type: "address[]" },
    ],
    name: "updateOwners",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      {
        name: "userOp",
        internalType: "struct UserOperation",
        type: "tuple",
        components: [
          { name: "sender", internalType: "address", type: "address" },
          { name: "nonce", internalType: "uint256", type: "uint256" },
          { name: "initCode", internalType: "bytes", type: "bytes" },
          { name: "callData", internalType: "bytes", type: "bytes" },
          { name: "callGasLimit", internalType: "uint256", type: "uint256" },
          {
            name: "verificationGasLimit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "preVerificationGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "maxFeePerGas", internalType: "uint256", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "paymasterAndData", internalType: "bytes", type: "bytes" },
          { name: "signature", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "userOpHash", internalType: "bytes32", type: "bytes32" },
    ],
    name: "userOpValidationFunction",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "addedOwners",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
      {
        name: "removedOwners",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
    ],
    name: "OwnerUpdated",
  },
  { type: "error", inputs: [], name: "AlreadyInitialized" },
  { type: "error", inputs: [], name: "EmptyOwnersNotAllowed" },
  { type: "error", inputs: [], name: "InvalidAction" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "InvalidOwner",
  },
  { type: "error", inputs: [], name: "NotAuthorized" },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "NotContractCaller",
  },
  {
    type: "error",
    inputs: [
      { name: "selector", internalType: "bytes4", type: "bytes4" },
      { name: "functionId", internalType: "uint8", type: "uint8" },
    ],
    name: "NotImplemented",
  },
  { type: "error", inputs: [], name: "NotInitialized" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnerDoesNotExist",
  },
] as const;
