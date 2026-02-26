import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
        >
            <g transform="translate(6, 26) skewY(-18)">
                <rect x="62" y="20" width="24" height="52" rx="4" fill="#1AC4FF" />
                <rect x="35" y="20" width="24" height="52" rx="4" fill="#2E3BC4" />
                <rect x="8" y="20" width="24" height="52" rx="4" fill="#2487FB" />
            </g>
        </svg>
    );
}
