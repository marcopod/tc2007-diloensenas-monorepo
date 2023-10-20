import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-fuull flex justify-center items-center">
      <Link href={"/admin"}>
        <Image src={"/assets/landing/dilo_en_señas_logo.jpg"} alt="logo" layout='fill'
          className="w-full" />
      </Link>
    </div>
  )
}
