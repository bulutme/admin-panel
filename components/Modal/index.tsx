import styles from "./Modal.module.scss";
import Close from "../../assests/images/close.svg";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string | number;
}

const Modal = ({ children, isOpen, title, onClose }: ModalProps) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          {title}
          <span onClick={onClose}>
            <Close />
          </span>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
