"use client";

import { Button } from "@/components/ui/button";
import { InputLabelComponent } from "@/components/ui/input-label";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { useBotUpsert } from "../hooks/useBotUpsert";

export interface BotRegiterComponentProps {
  onRegister?: () => void;
}

const BotRegiterComponent = ({ onRegister }: BotRegiterComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    mutation: { mutate },
    form: { formState, handleSubmit, register, reset },
  } = useBotUpsert({
    onSuccess: () => {
      onRegister?.();
      reset();
      setIsModalOpen(false);
    },
  });
  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)} size="sm">
        Register
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          reset();
          setIsModalOpen(false);
        }}
        title="Bot Profile Register"
        content={
          <div className="space-y-4">
            <form onSubmit={handleSubmit((e) => mutate(e))}>
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
                <InputLabelComponent label="Bot Id" {...register("botId")} />
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
              setIsModalOpen(false);
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

export default BotRegiterComponent;
