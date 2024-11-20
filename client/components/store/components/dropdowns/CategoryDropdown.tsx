import { GetAllCategoryByStoreId } from '@/services/category';
import { CategoryData } from '@/types/category';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query';
import { AngleDown } from 'flowbite-react-icons/outline'
import { useState } from 'react';

interface CategoryDropdownProps {
    setRequest: Function
}

export default function CategoryDropdown({ setRequest }: CategoryDropdownProps) {

    const { data, error } = useQuery<CategoryData[] | null, Error>({
        queryKey: ["store_category"],
        queryFn: () => GetAllCategoryByStoreId({ id: 1 }),
    });

    const [label, setLabel] = useState<string>('Category');

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {label}
                    <AngleDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>
            {data && (
                <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        {data.map((item, i) => {
                            return (
                                <MenuItem key={i}>
                                    <p
                                        onClick={() => {
                                            setLabel(item.name);
                                            setRequest((prev: any) => ({
                                                ...prev,
                                                category_id: item.id
                                            }));
                                        }}
                                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        {item.name}
                                    </p>
                                </MenuItem>
                            )
                        })}
                    </div>
                </MenuItems>
            )}

        </Menu>
    )
}
