import { ButtonProps } from "./types"
import style from "./styles.module.css"
import arrow from "../../assets/Arrow.png"
// import arrowLeft from "@/assets/ArrowLeft.png"
import Image from "next/image";
import { useRouter } from "next/router";

export function Button({ title, icon, path = "/", backPath, disabled }: ButtonProps) {

  return (
    <div className={style.contaneirButton}>

      <button
        className={style.button}
        disabled={disabled}
        rel="noreferrer"
        onClick={() => {
          // router.push(path)
        }}
      >
        {title}
        <Image src={arrow} alt="" className={style.arrowIcon} />
      </button >

    </div>
  )
}