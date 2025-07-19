import { animated } from '@react-spring/web';
import { NotifyProps } from "./Notify";

export function Notify({
  message,
  type,
  color,
  style,
  id,
}: NotifyProps) {
  return (
    <>
      <animated.div
        style={{ ...style }}
        className="w-[18.25rem] pointer-events-none bg-blend-screen z-[9999] bg-gradient-1 border-[0.05rem] border-solid border-white/25 rounded-md flex flex-col pt-[0.75rem] px-[0.54rem] relative pb-[0.75rem]"
      >
        <animated.div
          style={style}
          className="w-full flex items-center gap-[.5125rem]"
        >
          <div
            className="w-[1.99994rem] h-[2rem] flex items-center justify-center rounded-md"
            style={{ backgroundColor: color || '#285DA1' }}
          >
            {IconVariants[type]}
          </div>
          <animated.span
            className="w-[21.25rems] montserrat text-[.6875rem] text-white/65"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </animated.div>
      </animated.div>
    </>
  );
}

const SuccessSvg: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2.8125rem"
    height="2.8125rem"
    fill="none"
    viewBox="0 0 45 45"
  >
    <g filter="url(#filter0_d_584_6353)">
      <path
        fill="white"
        d="M22.5 10.688a11.812 11.812 0 1 1 0 23.624 11.812 11.812 0 0 1 0-23.624M21.029 24.83l-2.625-2.625a1.012 1.012 0 0 0-1.729.716c0 .269.107.526.297.716l3.341 3.342a1.01 1.01 0 0 0 1.433 0l6.918-6.92a1.012 1.012 0 1 0-1.43-1.434z"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_584_6353"
        width="43.625"
        height="43.625"
        x="0.688"
        y="0.688"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.203922 0 0 0 0 0.658824 0 0 0 0 0.32549 0 0 0 0.9 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_584_6353"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_584_6353"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const ErrorSvg: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2.5625rem"
    height="2.5625rem"
    fill="none"
    viewBox="0 0 41 41"
  >
    <g filter="url(#filter0_d_584_6376)">
      <path
        fill="white"
        d="m16.45 25.347 4.05-4.05 4.05 4.05.796-.797-4.05-4.05 4.05-4.05-.796-.796-4.05 4.05-4.05-4.05-.796.796 4.05 4.05-4.05 4.05zm4.053 5.278q-2.1 0-3.948-.797a10.2 10.2 0 0 1-3.217-2.164 10.2 10.2 0 0 1-2.165-3.213 9.85 9.85 0 0 1-.798-3.948q0-2.1.798-3.948a10.2 10.2 0 0 1 2.16-3.217 10.2 10.2 0 0 1 3.215-2.165 9.9 9.9 0 0 1 3.949-.798q2.1 0 3.948.798a10.2 10.2 0 0 1 3.217 2.162q1.368 1.365 2.165 3.214a9.9 9.9 0 0 1 .798 3.948q0 2.1-.797 3.948a10.2 10.2 0 0 1-2.164 3.217 10.3 10.3 0 0 1-3.213 2.165 9.8 9.8 0 0 1-3.948.798"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_584_6376"
        width="40.25"
        height="40.25"
        x="0.375"
        y="0.375"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.913725 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.9 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_584_6376"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_584_6376"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const WarnSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2.5625rem"
    height="1.2625rem"
    fill="none"
    viewBox="0 0 25 24"
  >
    <path
      fill="white"
      d="M12.5 1.5a10.5 10.5 0 1 1 0 21 10.5 10.5 0 0 1 0-21m0 4.5a1.37 1.37 0 0 0-1.365 1.494l.547 6.009a.822.822 0 0 0 1.636 0l.546-6.009A1.37 1.37 0 0 0 12.5 6m0 12a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4"
    />
  </svg>
);

const IconVariants = {
  success: <SuccessSvg />,
  warn: <WarnSvg />,
  error: <ErrorSvg />,
};