import { X } from "./Icons";
import { useToastStore } from "../store/toastStore";

// Shows the small messages ("Post saved") at the bottom of the screen.
export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span>{toast.message}</span>
          <button type="button" className="toast__close" onClick={() => removeToast(toast.id)} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
