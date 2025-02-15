"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export interface ModalButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  footer: ModalButton[];
}

export function Modal({ isOpen, onClose, title, content, footer }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold leading-none tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">{content}</div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          {footer.map((button, index) => (
            <Button
              key={index}
              {...button}
              variant={button.variant || "default"}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
