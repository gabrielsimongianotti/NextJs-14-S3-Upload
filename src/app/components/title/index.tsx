import { TitleProps } from "./types";
import styles from "./styles.module.css"
export default function title({ text }: TitleProps) {
    return (
        <h1 className={styles.title}>{text}</h1>
    )
}