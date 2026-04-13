import Link from "next/link";
import LayoutShell from "@/components/LayoutShell";

export default function Home() {
  return (
    <LayoutShell>
      <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Hive Strength Mastery</h1>
        <p className="text-gray-500 text-lg">
          Strength training from first principles. No shame. No fluff.
        </p>
        <div className="grid gap-4">
          <Link href="/exercise" className="block bg-black text-white px-4 py-3 rounded font-medium text-sm text-center hover:opacity-80">Teach me an exercise</Link>
          <Link href="/session" className="block bg-black text-white px-4 py-3 rounded font-medium text-sm text-center hover:opacity-80">Design my session</Link>
          <Link href="/check-in?tab=form" className="block bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm text-center hover:bg-gray-50">Something feels wrong</Link>
          <Link href="/check-in?tab=setback" className="block bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm text-center hover:bg-gray-50">I fell off</Link>
        </div>
      </div>
    </LayoutShell>
  );
}
