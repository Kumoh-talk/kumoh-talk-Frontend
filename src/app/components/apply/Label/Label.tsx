import styles from './label.module.scss';

const Label = ({ ...props }) => <label className={styles.label} {...props} />;

export default Label;
