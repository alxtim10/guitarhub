'use client'
import { useSearchParams } from "next/navigation"

export default function TransactionTimeline() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id') || 0;
    return (
        <div>TransactionTimeline</div>
    )
}
