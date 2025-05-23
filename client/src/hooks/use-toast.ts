// Borrowed from shadcn/ui: https://ui.shadcn.com/docs/components/toast
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

type ToastActionProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  altText?: string;
};

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export const useToast = () => {
  const { toast, dismiss, toasts } = useToastOriginal();

  return {
    toast,
    dismiss,
    toasts,
  };
};
