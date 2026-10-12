import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import logo from "@/app/micro-clean-logo.png";

type HeaderProps = {
  returnText?: string;
};

export default function Header({ returnText }: HeaderProps) {
  return (
    <header>
      <Link className="brand" href="/" aria-label="MICRO CLEAN home">
        <Image src={logo} alt="MICRO CLEAN Cleaning Services" />
      </Link>
      <div className="header-note">
        <ShieldCheck size={17} aria-hidden="true" />A cleaner space starts here
      </div>
    </header>
  );
}

