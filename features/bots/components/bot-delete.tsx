import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { ReactNode } from "react";
import { useBotDeleteApi } from "../hooks/use-bot-delete-api";

export interface BotDeleteProps {
  onDelete?: () => void;
  children: ReactNode;
}

export const BotDeleteComponent = ({ children, onDelete }: BotDeleteProps) => {
  const { isOpen, open, close } = useModal();
  const {} = useBotDeleteApi({
    onSuccess: () => {
      onDelete?.();
      close();
    },
  });
  return (
    <div>
      <Button onClick={open} size="sm" variant="destructive">
        {children}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          close();
        }}
        title="Bot Profile Delete"
        content={
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                Are you sure you want to delete this bot?
              </p>
            </div>
          </div>
        }
        footer={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: close,
          },
          {
            label: "Delete",
            variant: "destructive",
            onClick: () => close(),
          },
        ]}
      />
    </div>
  );
};
