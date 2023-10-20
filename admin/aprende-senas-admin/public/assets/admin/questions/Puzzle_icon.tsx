import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#6C5CE7", ...props }: LiveIconProps) => (
    <svg width="74" height="82" viewBox="0 0 74 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="&#240;&#159;&#166;&#134; icon &#34;puzzle&#34;">
            <path id="Vector" d="M2 48.6666V65.7777C2 67.0665 3.04467 68.1111 4.33333 68.1111H25.3333" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_2" d="M60.3334 48.6666V65.7777C60.3334 67.0665 59.2888 68.1111 58 68.1111H40.8889" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_3" d="M40.8889 13.6666H58C59.2888 13.6666 60.3334 14.7113 60.3334 16V33.1111" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_4" d="M2 33.1111V16C2 14.7113 3.04467 13.6666 4.33333 13.6666H25.3333" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_5" d="M40.8888 68.1111V72C40.8888 76.2956 37.4067 79.7778 33.111 79.7778C28.8154 79.7778 25.3333 76.2956 25.3333 72V68.1111" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_6" d="M2 33.1111H5.88889C10.1844 33.1111 13.6667 36.5932 13.6667 40.8889C13.6667 45.1845 10.1844 48.6666 5.88889 48.6666H2" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_7" d="M60.3333 33.1111H64.2221C68.5178 33.1111 71.9999 36.5932 71.9999 40.8889C71.9999 45.1845 68.5178 48.6666 64.2221 48.6666H60.3333" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path id="Vector_8" d="M40.8888 13.6667V9.77778C40.8888 5.48223 37.4067 2 33.111 2C28.8154 2 25.3333 5.48223 25.3333 9.77778V13.6667" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>

);

const Memo = memo(SvgComponent);
export default Memo;
