import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#6C5CE7", ...props }: LiveIconProps) => (
    <svg width="74" height="51" viewBox="0 0 74 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="&#240;&#159;&#166;&#134; icon &#34;eye empty&#34;">
            <path id="Vector" d="M37 33.1111C41.2957 33.1111 44.7778 29.629 44.7778 25.3333C44.7778 21.0377 41.2957 17.5555 37 17.5555C32.7043 17.5555 29.2222 21.0377 29.2222 25.3333C29.2222 29.629 32.7043 33.1111 37 33.1111Z" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_2" d="M72 25.3333C64.6554 36.965 51.4601 48.6667 37 48.6667C22.5399 48.6667 9.3444 36.965 2 25.3333C10.9388 14.2821 21.4119 2 37 2C52.5882 2 63.0614 14.2819 72 25.3333Z" stroke={strokeColor} stroke-width="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
