import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType }}>
      {children}
    </ModalContext.Provider>
  );
};
