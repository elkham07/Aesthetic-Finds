import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] text-black px-6">
      <div className="max-w-3xl text-center animate-fade-in">
        <h1 className="mb-6 text-5xl md:text-7xl font-light tracking-tight">
          Aesthetic Finds
        </h1>
        <p className="mb-10 text-xl text-black leading-relaxed max-w-2xl mx-auto">
          A premium curation of home decor, furniture, and living essentials. Discover pieces that transform your space into a magazine-worthy sanctuary.
        </p>
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-stone-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
        >
          Explore the Edit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
