import { UserCartStore } from "@/types/cart";
import { useConvertRupiah } from "@/utils/useConvertRupiah";
import { Store } from "flowbite-react-icons/solid";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { DotsVertical } from "flowbite-react-icons/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCartItem } from "@/services/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CartStoreProps {
    data: UserCartStore;
}

export default function CartStore({
    data
}: CartStoreProps) {

    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: DeleteCartItem,
        onSuccess: () => {
            toast.success('Product deleted', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        },
    });

    const handleDelete = (body: { id: number }) => {
        mutation.mutate(body);
    }

    return (
        <div className="pb-5 pt-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center justify-start gap-1">
                    <Store />
                    <h1 className="mt-1">{data.store_name}</h1>
                </div>
                <h1 className="text-primary font-bold">{useConvertRupiah(data.price)} {`(${data.quantity})`}</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-5 pt-5 px-2">
                {data.products.map((item, i) => {
                    return (
                        <div key={i} className="relative flex gap-4">
                            <Image
                                src={item.image_url}
                                alt="product"
                                width={100}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                            <div className="flex flex-col items-start mt-1">
                                <h1 className="text-lg font-bold">{item.product_name}</h1>
                                <h1 className="mt-1 text-xs text-black bg-white shadow-md text-center rounded-md px-2">{item.product_variant_name}</h1>
                                <h1 className="mt-3 text-md font-bold text-center rounded-md">{useConvertRupiah(item.price)}</h1>
                            </div>
                            <button
                                onClick={() => {
                                    router.push(`/checkout?product_id=${item.product_id}&product_variant_id=${item.product_variant_id}`)
                                }}
                                className="absolute bottom-0 right-2 bg-primary rounded-full px-2 py-1 text-white text-sm shadow-md">
                                Checkout
                            </button>
                            <div className="absolute top-1 right-0">
                                <Menu>
                                    <MenuButton>
                                        <DotsVertical className="text-black w-7 h-7" />
                                    </MenuButton>
                                    <MenuItems
                                        anchor="bottom end"
                                        transition
                                        className="origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                    >
                                        <MenuItem>
                                            <div
                                                onClick={() => {
                                                    handleDelete({
                                                        id: item.id
                                                    })
                                                }}
                                                className="block bg-white px-3 py-1 rounded-lg border cursor-pointer data-[focus]:bg-gray-100">
                                                Delete
                                            </div>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
