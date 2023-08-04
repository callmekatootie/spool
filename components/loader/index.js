import styles from "./index.module.css";

export default function Loader() {
  return (
    <div className="h-full flex justify-center items-center">
      <span className={styles.loader}></span>
    </div>
  );
}
