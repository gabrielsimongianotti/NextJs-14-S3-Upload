import styles from './page.module.css'
import S3UploadForm from '../app/components/S3UploadForm'
// import S3UploadForm from '../app/components/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <S3UploadForm />
    </main>
  )
}
