import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  variant = 'default',
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-white/10">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {variant === 'destructive' && (
              <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            )}
            <AlertDialogTitle className="text-white text-lg">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white/20 hover:bg-white/5 text-white hover:text-white">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              variant === 'destructive'
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-primary hover:bg-primary/90 text-black"
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
