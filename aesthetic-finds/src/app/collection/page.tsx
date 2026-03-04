"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { ProductCard, type ProductProps } from "@/components/ProductCard";

const INITIAL_PRODUCTS: ProductProps[] = [
    {
        id: "1",
        title: "Linen Duvet Cover Set in Oat",
        image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop",
        description: "Experience the ultimate comfort with this premium 100% French flax linen duvet set. Breathable, durable, and gets softer with every wash.",
        affiliate_link: "https://example.com/linen-duvet",
    },
    {
        id: "2",
        title: "Ceramic Table Lamp with Pleated Shade",
        image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2787&auto=format&fit=crop",
        description: "A beautiful statement piece featuring a handcrafted ceramic base and a classic pleated shade that diffuses light softly.",
        affiliate_link: "https://example.com/lamp",
    },
    {
        id: "3",
        title: "Solid Wood Nightstand with Rattan Detail",
        image_url: "https://images.unsplash.com/photo-1595514535415-3cc28bfeb5ae?q=80&w=2692&auto=format&fit=crop",
        description: "Bring a touch of organic warmth to your bedside. This nightstand combines solid oak with woven rattan drawer fronts.",
        affiliate_link: "https://example.com/nightstand",
    },
    {
        id: "4",
        title: "Textured Throw Pillow Cover",
        image_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2574&auto=format&fit=crop",
        description: "Add dimension and cozy texture to your sofa or bed. Woven from a blend of cotton and wool with subtle geometric patterns.",
        affiliate_link: "https://example.com/pillow",
    },
];

export default function CollectionPage() {
    const [products, setProducts] = useState<ProductProps[]>(INITIAL_PRODUCTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Form State
    const [photoUrl, setPhotoUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        const savedProducts = localStorage.getItem("aesthetic-finds-products");
        if (savedProducts) {
            try {
                setProducts(JSON.parse(savedProducts));
            } catch (err) {
                console.error("Failed to parse products from local storage", err);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("aesthetic-finds-products", JSON.stringify(products));
        }
    }, [products, isLoaded]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setPhotoUrl(url);
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: ProductProps = {
            id: Date.now().toString(),
            title,
            image_url: photoUrl,
            description,
            affiliate_link: link,
        };
        setProducts([newProduct, ...products]);
        setIsModalOpen(false);
        // Reset form
        setPhotoUrl("");
        setTitle("");
        setDescription("");
        setLink("");
    };

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#faf9f6]">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-stone-200 bg-[#faf9f6]/80 px-6 py-4 backdrop-blur-md">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Home
                </Link>
                {/* Right side elements later per instructions */}
                <div></div>
            </nav>

            <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
                {/* Editorial Header */}
                <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in relative">
                    <span className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-black uppercase">
                        Admin View
                    </span>
                    <h1 className="mb-6 text-4xl md:text-5xl xl:text-6xl font-light tracking-tight text-black">
                        Product Collections
                    </h1>
                    <p className="mb-8 text-lg md:text-xl leading-relaxed text-black">
                        Manage and curate your recommended products here.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-stone-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </button>
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20 text-black">
                        <p>No products added yet. Click &quot;Add Product&quot; to begin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <div key={product.id} className="animate-fade-up">
                                <ProductCard
                                    {...product}
                                    onDelete={() => handleDeleteProduct(product.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200 relative animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
                            <h2 className="text-lg font-medium text-black">Add New Product</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-black transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Photo (URL or Upload)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="flex-1 rounded-xl border border-stone-200 px-4 py-2 text-sm focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                                    />
                                    <label className="flex cursor-pointer items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm font-medium text-black hover:bg-stone-100 transition-colors whitespace-nowrap">
                                        <span>Upload</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {photoUrl && (
                                    <div className="mt-3 relative h-24 w-24 overflow-hidden rounded-lg border border-stone-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={photoUrl} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Product Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Linen Duvet Cover Set"
                                    className="w-full rounded-xl border border-stone-200 px-4 py-2 text-sm focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief details about the product..."
                                    className="w-full resize-none rounded-xl border border-stone-200 px-4 py-2 text-sm focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-1">
                                    Amazon Affiliate Link
                                </label>
                                <input
                                    required
                                    type="url"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="https://amazon.com/..."
                                    className="w-full rounded-xl border border-stone-200 px-4 py-2 text-sm focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                                />
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
                                >
                                    Publish Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
