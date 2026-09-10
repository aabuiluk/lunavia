import { useState } from "react";
import { Link } from "react-router-dom";

function LunaviaMark() {
  return (
    <span className="relative inline-flex h-[21px] w-[21px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-brand-light">
      <span className="absolute left-[3px] top-[1px] h-[15px] w-[15px] rounded-full bg-[#FAFAF5]" />
      <span className="absolute left-[3px] top-[7px] h-[2px] w-[12px] -rotate-[27deg] rounded-full bg-brand-mint" />
    </span>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left: hero image panel */}
      <div className="relative order-2 flex min-h-[320px] flex-col justify-between overflow-hidden bg-[#17231D] px-6 py-10 sm:px-10 sm:py-14 lg:order-1 lg:min-h-screen lg:flex-1 lg:px-20 lg:py-16">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/16ae332f2e624bf7224ff4ac8b006081d5992590?width=1954"
          alt="Travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/10 to-transparent" />

        <div className="relative flex items-center gap-2">
          <LunaviaMark />
          <span className="text-lg font-extrabold tracking-tight text-[#17231D] sm:text-xl">
            Lunavia
          </span>
        </div>

        <div className="relative mt-16 max-w-[612px] lg:mt-0">
          <p className="text-xs font-extrabold tracking-[0.15em]" style={{ color: "white" }}>
           YOUR ROUTE TO EVERYWHERE
          </p>
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.05] tracking-tight text-black sm:text-[56px] lg:text-[72px]">
            <span className="text-white">A little less planning. </span>
            <span className="text-white">A lot more </span>
            <span className="text-white">going.</span>
          </h1>
        </div>

        <p className="relative mt-10 text-xs font-bold lg:mt-0" style={{ color: '#000000' }}>
          Lunavia · Ukraine to anywhere
        </p>
      </div>

      {/* Right: login form panel */}
      <div className="relative order-1 flex flex-1 flex-col items-center justify-center overflow-hidden bg-brand-tint px-6 py-16 sm:px-10 lg:order-2 lg:px-24">
        <div
          className="pointer-events-none absolute -top-[88px] right-[8%] h-[241px] w-[241px] rounded-full bg-brand-yellow lg:right-[6%]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[6%] right-[-8%] h-[301px] w-[298px] rounded-full border-[25px] border-brand-ring/80 lg:right-[-4%]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[544px]">
          <span className="text-xs font-extrabold tracking-[0.15em] text-brand-light">
            WELCOME BACK
          </span>
          <h2 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#17231D] sm:text-[40px]">
            Ready when you are.
          </h2>
          <p className="mt-4 max-w-[309px] text-sm font-medium leading-relaxed text-black/50">
            Log in to pick up where your travel plans left off.
          </p>

          <form
            className="mt-10 flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white px-4 py-3">
              <span className="text-[10px] font-extrabold tracking-[0.12em] text-black/40">
                EMAIL ADDRESS
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent text-[15px] font-bold text-[#17231D]/90 placeholder:text-[#17231D]/50 outline-none"
              />
            </label>

            <label className="relative flex flex-col gap-1 rounded-2xl border border-black/10 bg-white px-4 py-3">
              <span className="text-[10px] font-extrabold tracking-[0.12em] text-black/40">
                PASSWORD
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent pr-8 text-[15px] font-bold text-[#17231D]/90 placeholder:text-[#17231D]/50 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9f5de6877b93bad9f9180314e11bc7a2ee88cd0d?width=50"
                  alt=""
                  className="h-[25px] w-[25px]"
                />
              </button>
            </label>

            <Link
              to="/forgot-password"
              className="self-end text-xs font-extrabold text-brand-dark"
            >
              Forgot password? Restore it
            </Link>

            <button
              type="submit"
              className="mt-2 flex h-[58px] items-center justify-center gap-2 rounded-2xl bg-brand text-base font-extrabold text-white transition hover:bg-brand-dark"
            >
              Log in
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.69995 8.99998H14.4M9.89995 3.59998L15.3 8.99998L9.89995 14.4"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/10" />
              <span className="whitespace-nowrap text-xs font-extrabold tracking-[0.1em] text-black/35">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-black/10" />
            </div>

            <button
              type="button"
              className="flex h-[58px] items-center justify-center gap-2 rounded-2xl border border-black/15 bg-white transition hover:bg-black/[0.02] mb-5"
            >
              <span className="text-sm font-extrabold text-[#00BC6E]">G</span>
              <span className="text-sm font-medium text-[#17231D]">
                Google
              </span>
            </button>
          </form>

          <p className="mt-6 text-center text-xs">
            <span className="text-black/50">New to Lunavia? </span>
            <Link to="/signup" className="font-extrabold text-brand-dark">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


