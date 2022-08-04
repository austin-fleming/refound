import type { Nullable } from "@utils/types/nullable";
import type { Web3Auth } from "@web3auth/web3auth";
import type { Account } from "../model/account.model";
import type { IWalletProvider } from "./auth.provider";

export interface AuthState {
	account: Nullable<Account>;
	chain: Nullable<string>;
	connectionStatus: "DISCONNECTED" | "CONNECTING" | "CONNECTED";
	network: Nullable<string>;
	provider: Nullable<IWalletProvider>;
	web3Auth: Nullable<Web3Auth>;

	login: () => Promise<boolean>;
	logout: () => Promise<boolean>;
	// getBalance: IWalletProvider["getBalance"];
	// signMessage: IWalletProvider["signMessage"];
}

export const initialAuthState: AuthState = {
	account: undefined,
	chain: undefined,
	connectionStatus: "DISCONNECTED",
	network: undefined,
	provider: undefined,
	web3Auth: undefined,

	login: async () => false,
	logout: async () => false,
};

type AuthReducerActions =
	| {
			type: "SET_COMMANDS";
			payload: Pick<AuthState, "login" | "logout">;
	  }
	| {
			type: "SET_CONNECTION_STATUS";
			payload: AuthState["connectionStatus"];
	  }
	| {
			type: "SET_PROVIDER";
			payload: Pick<AuthState, "account" | "chain" | "network" | "provider" | "web3Auth">;
	  }
	| {
			type: "RESET";
	  };

export const AuthReducer = (currentState: AuthState, action: AuthReducerActions): AuthState => {
	switch (action.type) {
		case "SET_COMMANDS":
		case "SET_PROVIDER":
			return { ...currentState, ...action.payload };
		case "SET_CONNECTION_STATUS":
			return { ...currentState, connectionStatus: action.payload };
		case "RESET":
			return initialAuthState;
		default:
			// @ts-expect-error: type is cast to never
			throw new Error(`${action.type} is not a valid auth action`);
	}
};
