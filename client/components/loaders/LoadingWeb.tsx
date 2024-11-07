import React from 'react'

export default function LoadingWeb() {
    return (
        <div className="h-screen flex-col gap-4 w-full flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-gray-400 text-2xl animate-spin flex items-center justify-center border-t-slate-300 rounded-full"
                ></div>
            </div>
        </div>

    )
}