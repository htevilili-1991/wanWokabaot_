import { SVGAttributes } from 'react';

interface ApplicationLogoProps extends SVGAttributes<SVGElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
}

export function ApplicationLogo({
    size = 'md',
    showText = true,
    className = '',
    ...props
}: ApplicationLogoProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Cooperative Logo/Icon */}
            <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 ${sizeClasses[size]} flex-shrink-0`}>
                <svg
                    {...props}
                    className={`text-white ${sizeClasses[size]}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Custom cooperative icon - could be replaced with actual logo */}
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            </div>

            {/* Cooperative Name */}
            {showText && (
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        MAG Cooperative
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Member Services
                    </span>
                </div>
            )}
        </div>
    );
}

// Alternative version with just the logo
export function ApplicationLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
        >
            {/* Cooperative Shield/Logo Design */}
            <rect
                x="8"
                y="8"
                width="24"
                height="24"
                rx="4"
                fill="currentColor"
                opacity="0.1"
            />
            <path
                d="M12 16L16 20L28 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="20"
                cy="20"
                r="12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
            />
            <path
                d="M14 14L18 18L26 10"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}