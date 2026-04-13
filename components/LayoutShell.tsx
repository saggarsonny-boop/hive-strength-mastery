import Link from "next/link";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-sm tracking-tight">Hive Strength Mastery</Link>
        <nav className="flex gap-4 text-sm text-gray-500">
          <Link href="/exercise">Exercise</Link>
          <Link href="/session">Session</Link>
          <Link href="/check-in">Check in</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
