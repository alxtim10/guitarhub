import Image from "next/image"
import logo from '../../public/assets/images/logo.svg'

const Navbar = () => {
  return (
    <section className="p-4">
        <Image src={logo} width={35} height={35} alt="logo" />

    </section>
  )
}

export default Navbar