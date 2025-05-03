import { FileText } from "lucide-react";
import styles from "./utilityTab.module.scss";

export default function UtilityTab() {
  return (
    <div className={styles.container}>
      <button className={styles.iconButton}>
        <FileText />
      </button>
    </div>
  );
}
