import { atom } from "recoil";

type AuthModalState = {
  isOpen: boolean;
  activeModal: "signIn" | "signUp" | "forgotPassword";
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  activeModal: "signIn",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: initialAuthModalState,
});
