import type { Result } from "@utils/error-handling/result";

export interface IWalletProvider {
	getAccounts: () => Promise<Result<string[]>>;
	getBalance: () => Promise<Result<string>>;
	getChainId: () => Promise<Result<number>>;
	signMessage: (message: string) => Promise<Result<any>>;
}
