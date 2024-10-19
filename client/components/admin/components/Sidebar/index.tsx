import Image from "next/image"
import logo from "../../../../public/assets/images/logo.svg";
import { ArrowsRepeat, Cart, ChartMixed, ClapperboardPlay, Euro, Landmark, ObjectsColumn, Store, User } from "flowbite-react-icons/outline";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen px-5 py-3 w-[17rem] border-r border-r-slate-200">
            <div className="flex items-center">
                <Image src={logo} width={24} height={24} alt="logo" />
                <div className="p-4 text-xl font-bold mt-1">Guitarhub CMS</div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <Landmark className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1:">Dashboard</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <ChartMixed className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Reports</p>
                </div>
            </div>
            <div className="mt-8 flex items-center gap-5">
                <p className="text-xs text-greyMain">Manage</p>
                <hr className="w-full " />
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <Link
                    href={'/admin/stores'}
                    className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <Store className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Stores</p>
                </Link>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <ObjectsColumn className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Products</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <ClapperboardPlay className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Banners</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <ArrowsRepeat className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Transactions</p>
                </div>
            </div>
            <div className="mt-8 flex items-center gap-5">
                <p className="text-xs text-greyMain">Users</p>
                <hr className="w-full " />
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <User className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Users</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <Cart className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Carts</p>
                </div>
                <div className="flex items-center gap-4 cursor-pointer transition-all hover:translate-x-1">
                    <Euro className="text-greySecondary w-6 h-6" />
                    <p className="text-sm text-greySecondary font-medium mt-1">Payments</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar