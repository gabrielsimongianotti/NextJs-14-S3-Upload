import { ButtonProps } from "./types"
import style from "./styles.module.css"
import fileUpload from "../../assets/File-upload.png"
import Image from "next/image";

export function Button({ title, icon, path = "/", backPath, disabled, ...rest }: ButtonProps) {

  return (
    <div className={style.contaneirButton}>

      <button
        className={style.button}
        disabled={disabled}
        rel="noreferrer"
        {...rest}
      >
        {title}
        <Image src={fileUpload}
          alt=""
          className={style.arrowIcon} />
      </button >

    </div>
  )
}