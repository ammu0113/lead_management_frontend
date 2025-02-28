import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FileIco from "../../assests/file.jpg"
import Image from 'next/image';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex flex-col items-center mb-8">
        <div className="p-4 rounded-full mb-0">
          <Image src={FileIco} alt="File" width={60} />
        </div>
          <h1 className="text-3xl font-bold mb-4">Thank You</h1>
          <p className="text-black font-bold mb-8">
            Your information was submitted to our team of immigration attorneys. 
            Expect an email from hello@tryalma.ai.
          </p>
          <Link href="/">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 h-[60px]">
              Go Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}