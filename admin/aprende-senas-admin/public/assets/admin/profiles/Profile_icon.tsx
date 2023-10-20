import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#6C5CE7", ...props }: LiveIconProps) => (
    <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 58V54.5C19.5 44.8351 27.335 37 37 37C46.6649 37 54.5 44.8351 54.5 54.5V58" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M37 37.0002C42.7991 37.0002 47.5 32.2994 47.5 26.5002C47.5 20.7013 42.7991 16.0002 37 16.0002C31.2008 16.0002 26.5 20.7013 26.5 26.5002C26.5 32.2994 31.2008 37.0002 37 37.0002Z" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M37 72C56.33 72 72 56.33 72 37C72 17.67 56.33 2 37 2C17.67 2 2 17.67 2 37C2 56.33 17.67 72 37 72Z" stroke={strokeColor} strokeWidth="4" />
    </svg>

);

const Memo = memo(SvgComponent);
export default Memo;
