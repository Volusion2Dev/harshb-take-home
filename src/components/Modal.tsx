// @src/components/Modal.jsx

import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

import * as api from "../pages/api";
import { Block } from "../types";

interface ModalProps {
    setIsOpen: (flag: boolean) => boolean;
  }

const Modal: React.FunctionComponent<ModalProps> = ({ setIsOpen }) => {

  const [type, setType] = useState("");
  const [blockPosition, setPosition] = useState(null);

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body: Block = { 
        type: type,
        position: blockPosition,
        configData: null
       };

      const blockResult = await api.createBlock(body);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Create a new Block
          </div>
          <form className={styles.formClass} onSubmit={onSubmitForm}>
            <input
              type="text"
              value={type}
              placeholder="name"
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="text"
              value={blockPosition}
              placeholder="position"
              onChange={(e) => setPosition(e.target.value)}
            />

            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Modal;
