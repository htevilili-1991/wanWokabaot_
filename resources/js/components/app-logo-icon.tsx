import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#00d27a" />
            <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">W</text>
        </svg>
    );
}
