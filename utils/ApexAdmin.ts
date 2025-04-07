import { create } from "zustand";

const useApexAdmin = create<ApexAdmin>((set, get) => ({
  adminToken: null,
  setAdminToken: (value: string | null) => {
    set(() => ({
      adminToken: value,
    }));
  },
}));

export default useApexAdmin;
