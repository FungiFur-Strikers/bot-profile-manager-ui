"use client";

import { Button } from "@/components/ui/button";
import { InputLabelComponent } from "@/components/ui/input-label";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { ReactNode } from "react";
import { useBotUpsert } from "../hooks/useBotUpsert";
import { Bot } from "../types";

export interface BotFormComponentProps {
  onRegister?: () => void;
  initialBot?: Bot;
  children: ReactNode;
}

const BotFormComponent = ({
  onRegister,
  initialBot,
  children,
}: BotFormComponentProps) => {
  const { close, isOpen, open } = useModal();

  const {
    mutation: { mutate },
    form: { formState, handleSubmit, register, reset },
  } = useBotUpsert({
    initialBot,
    onSuccess: () => {
      reset();
      close();
      onRegister?.();
    },
  });
  return (
    <div>
      <Button onClick={open} size="sm">
        {children}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          reset();
          close();
        }}
        title="Bot Profile Register"
        content={
          <div className="space-y-4">
            <form onSubmit={handleSubmit((data) => mutate(data))}>
              <div className="flex flex-col gap-2">
                {formState.isSubmitted && !formState.isValid ? (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">
                      {formState.errors.botId?.message ??
                        formState.errors.name?.message ??
                        formState.errors.personality?.message ??
                        formState.errors.avatar?.message}
                    </p>
                  </div>
                ) : null}
                <InputLabelComponent
                  label="Bot Id"
                  {...register("botId")}
                  disabled={!!initialBot?.botId}
                />
                <InputLabelComponent label="Bot Name" {...register("name")} />
                <InputLabelComponent
                  label="personality"
                  {...register("personality")}
                />
                <InputLabelComponent label="avatar" {...register("avatar")} />
              </div>
            </form>
          </div>
        }
        footer={[
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => {
              reset();
              close();
            },
          },
          {
            label: "Submit",
            disabled: formState.isSubmitted && !formState.isValid,
            onClick: () => handleSubmit((data) => mutate(data))(),
          },
        ]}
      />
    </div>
  );
};

export default BotFormComponent;
