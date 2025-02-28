import PublicLeadForm from "@/components/public-lead-form";
import Image from "next/image";
import leftImage from "../assests/top_left_decor.png";
import logo from "../assests/company-logo.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        {/* Hero section with green background */}
        <div className="relative bg-[#d8e0a8] py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-center space-x-6">
            <div className="hidden md:block">
              {/* Left Image */}
              {/* <div className="w-1/3"> */}
              <Image
                src={leftImage}
                alt="Decorative"
                className="absolute left-0 h-full w-[100px] object-cover"
                style={{
                  width: "auto",
                }}
              />
            </div>

            {/* Headline Text */}
            <div className="w-2/3">
              <Image src={logo} width={80} alt="Logo" className="pb-3" />

              <h2 className="text-4xl font-bold text-black leading-tight">
                Get An Assessment <br /> Of Your Immigration Case
              </h2>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <PublicLeadForm />
        </div>
      </div>
    </main>
  );
}
