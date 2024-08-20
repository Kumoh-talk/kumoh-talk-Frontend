import styles from "@/app/components/common/modifyBubble/modifyBubble.module.scss";

export default function WriteSvg() {
  return (
    <svg className={styles.modifyText} width="18" height="18" viewBox="0 0 18 18" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M9 15H16" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M12.2504 2.47176C12.5524 2.1697 12.9621 2 13.3893 2C13.6008 2 13.8103 2.04166 14.0057 2.12261C14.2011 2.20355 14.3787 2.32219 14.5282 2.47176C14.6778 2.62133 14.7964 2.79889 14.8774 2.99431C14.9583 3.18972 15 3.39917 15 3.61069C15 3.82221 14.9583 4.03166 14.8774 4.22708C14.7964 4.42249 14.6778 4.60006 14.5282 4.74962L5.03715 14.2407L2 15L2.75929 11.9629L12.2504 2.47176Z"
        stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};