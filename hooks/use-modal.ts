import { useState } from "react";

export const useModal = (initilaState: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initilaState);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const open = () => {
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return {
    isOpen: isModalOpen,
    toggle,
    open,
    close,
  };
};
