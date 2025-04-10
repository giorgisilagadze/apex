import { create } from "zustand";

const useApexAdmin = create<ApexAdmin>((set, get) => ({
  adminToken: null,
  toast: {
    isVisible: false,
    text: "",
    type: "",
  },
  setToast: (isVisible: boolean, text: string, type: string) => {
    const toast = get().toast;
    set(() => ({
      toast: { ...toast, isVisible: isVisible, text: text, type: type },
    }));
  },
  setAdminToken: (value: string | null) => {
    set(() => ({
      adminToken: value,
    }));
  },
}));

export default useApexAdmin;
