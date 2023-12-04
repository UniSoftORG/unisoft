import { DefaultModalType } from "@/types";
import { create } from "zustand";

export interface SimpleModal {
  activeComponent: DefaultModalType | boolean;
  onOpen: (component: DefaultModalType | boolean | undefined) => void;
  onClose: () => void;
}

const useModal = create<SimpleModal>((set) => ({
  activeComponent: false,
  onOpen: (component: DefaultModalType | boolean | undefined) =>
    set({ activeComponent: component }),
  onClose: () => set({ activeComponent: false }),
}));

export default useModal;
