export function LandingGlowBackground(): React.JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-36">
      <div className="absolute inset-0 blur-[250px]">
        <div className="absolute left-0 top-0 h-[1024px] w-[1440px] bg-[#9200FF] blur-[2.75px]" />
        <div className="absolute left-[91.43px] top-[72.11px] h-[836.51px] w-[1177.14px] bg-[#2E005B] blur-[2.75px]" />
        <div className="absolute left-[154.29px] top-[113.69px] h-[657.95px] w-[929.37px] bg-[#2D00F3] blur-[2.75px]" />
        <div className="absolute left-[285.71px] top-[230.76px] h-[158.65px] w-[228.57px] bg-[#7593E9] blur-[2.75px]" />
      </div>
    </div>
  )
}
