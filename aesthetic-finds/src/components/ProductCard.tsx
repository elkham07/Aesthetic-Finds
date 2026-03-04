import { ExternalLink, Trash2 } from "lucide-react";

export interface ProductProps {
    id: string;
    title: string;
    image_url: string;
    description: string;
    affiliate_link: string;
    onDelete?: () => void;
}

export function ProductCard({
    title,
    image_url,
    description,
    affiliate_link,
    onDelete,
}: ProductProps) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-fade-up h-full relative">
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm backdrop-blur-md transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Delete product"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            )}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image_url}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-medium leading-snug tracking-tight text-black line-clamp-2">
                    {title}
                </h3>

                <p className="mb-6 text-sm text-black line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto pt-2">
                    <a
                        href={affiliate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full uppercase items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold tracking-wider text-white transition-colors duration-200 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
                    >
                        CHECK THE PRICE
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
