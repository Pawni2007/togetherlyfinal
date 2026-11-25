import { create } from "zustand";

let nextId = 1;

// A small global store made with Zustand. Any component can show a toast with
// useToastStore((state) => state.showToast) and the ToastContainer displays it.
export const useToastStore = create((set) => ({
  toasts: [],

  showToast: (message, type = "success") => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    // Remove it automatically after 3 seconds.
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 3000);
  },

  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
