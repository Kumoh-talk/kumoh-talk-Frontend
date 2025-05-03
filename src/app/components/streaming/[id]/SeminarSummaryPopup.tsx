import React, { useState, useRef, useEffect } from "react";
import styles from "./SeminarSummaryPopup.module.scss";

interface SeminarSummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export default function SeminarSummaryPopup({
  isOpen,
  onClose,
  content,
}: SeminarSummaryPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;
      setPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;
    setDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={modalRef}
        onMouseDown={handleMouseDown}
        className={styles.modal}
        style={{ left: position.x, top: position.y }}
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="닫기"
        >
          ✕
        </button>
        <h2 className={styles.title}>세미나 요약</h2>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}
