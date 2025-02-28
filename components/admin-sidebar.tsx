import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import logo from "../assests/company-logo.png"
interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  return (
    <div className="relative overflow-hidden border-r border-gray-300 w-64 bg-[white] min-h-screen p-6 flex flex-col">
      <div className="mb-12 z-10">
        <Image src={logo} width={120} alt='Logo' />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/admin" className="pl-2 block py-2 font-semibold text-black hover:text-gray-700">
              Leads
            </Link>
          </li>
          <li>
            <Link href="/admin" className="pl-2 block py-2 font-normal text-[gray-300] hover:text-gray-700">
              Settings
            </Link>
          </li>
        </ul>
        <div className="absolute top-0 left-[-2px] w-64 h-[120px] bg-gradient-to-b from-[#f9fdd1] to-[#ffffff] z-auto">

        </div>
      </nav>
      
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
            <span className="font-semibold">A</span>
          </div>
          <div>
            <p className="font-semibold">Admin</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}