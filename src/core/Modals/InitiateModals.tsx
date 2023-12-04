"use client";
import Modal from "@/components/Organisms/Modal";
import useModal from "@/core/Modals/hooks/useModal";
import LoginModal from "@/predefined/JSX/Modals/Login";
import RegisterModal from "@/predefined/JSX/Modals/Register";
import { DefaultModalType, INextAuth } from "@/types";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type ModalComponentType = ReactElement | null;

export const Modals: { [K in DefaultModalType]: React.FC<any> | null } = {
  [DefaultModalType.LOGIN]: LoginModal,
  [DefaultModalType.REGISTER]: RegisterModal,
};

type ModalProps = {
  requestHandler?: (data: any) => void;
  session?: INextAuth | null;
};

export const InitiateModals: React.FC<ModalProps> = ({
  requestHandler,
  session,
}) => {
  const { activeComponent, onOpen, onClose } = useModal();

  const [Component, setComponent] = useState<ModalComponentType>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [currentModal, setCurrentModal] = useState<
    DefaultModalType | boolean | undefined
  >(undefined);

  const handleSubmit = useCallback((componentKey: DefaultModalType) => {
    const ModalComponent = Modals[componentKey];
    if (ModalComponent) {
      setComponent(<ModalComponent />);
    }
  }, []);

  useEffect(() => {
    if (
      activeComponent &&
      session &&
      (activeComponent === DefaultModalType.LOGIN ||
        activeComponent === DefaultModalType.REGISTER)
    ) {
      toast.error("You are already logged in");
    } else if (
      activeComponent &&
      typeof activeComponent === "string" &&
      Modals[activeComponent]
    ) {
      if (typeof currentModal === "undefined") {
        handleSubmit(activeComponent);
        setCurrentModal(activeComponent);
      } else if (activeComponent && activeComponent !== currentModal) {
        setCurrentModal(false);
        timeoutRef.current = setTimeout(() => {
          handleSubmit(activeComponent);
          setCurrentModal(activeComponent);
        }, 300);
        return () => clearInterval(timeoutRef.current);
      }
    } else {
      setCurrentModal(undefined);
    }
  }, [activeComponent]);

  return (
    <Modal
      title={"Title"}
      onClose={() => {
        setCurrentModal(undefined);
        onOpen(false);
      }}
      activeComponent={currentModal}
      onSubmit={() => console.log()}
      body={Component}
    />
  );
};
