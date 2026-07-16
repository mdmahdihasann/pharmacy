import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center text-sm text-gray-500">

        <Link href="/">Home</Link>

        <ChevronRight className="mx-2 h-4 w-4" />

        <Link href="/shop">Shop</Link>

        <ChevronRight className="mx-2 h-4 w-4" />

        <span className="font-semibold text-black">
          My Account
        </span>

      </div>
    </section>
  );
}