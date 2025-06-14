import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/Cosmetic", name: "Cosmetic", imageUrl: "/maquillage-bio1.jpg" },
	{ href: "/complement-alimentaire", name: "complement alimentaire", imageUrl: "/2.jpg" },
	{ href: "/skin-care", name: "skin-care", imageUrl: "/87080669_xxl_a2.avif" },
	{ href: "/huile", name: "Huile", imageUrl: "/34383-fotolia_111737274_s.jpg" },
	{ href: "/accessoires", name: "Accessoires", imageUrl: "/hammam-kellycia.jpg" },
	{ href: "/Vegetabals_et_Fruits", name: "Vegetabals and Fruits", imageUrl: "/5.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			{/* New Hero Section: Cosmetics Banner */}
			<div className="w-full min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden pt-0 mt-0">
				<img src="/banner.png" alt="Cosmetics Banner" className="absolute inset-0 w-full h-full object-cover object-center z-0" />
			</div>

			{/* Categories Section */}
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>
				<p className='text-center text-xl text-gray-300 mb-12'>
					You are now registered with us for a free 3-month trial. We’re excited to have you on board! This is your opportunity to explore and enjoy all the great features we offer. Remember, every journey starts with a first step — keep going and make the most of this experience. We're here to support you all the way!
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
			</div>

			{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
		</div>
	);
};
export default HomePage;
