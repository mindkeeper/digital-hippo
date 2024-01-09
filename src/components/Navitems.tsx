'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useEffect, useMemo, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

export default function Navitems() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const isAnyOpen = useMemo((): boolean => activeIndex !== null, [activeIndex]);

	const navRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(navRef, () => setActiveIndex(null));

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveIndex(null);
			}
		};

		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, []);
	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, index) => {
				const handleOpen = () => (activeIndex === index ? setActiveIndex(null) : setActiveIndex(index));
				const isOpen = activeIndex === index;
				return (
					<NavItem
						key={category.value}
						isAnyOpen={isAnyOpen}
						isOpen={isOpen}
						handleOpen={handleOpen}
						category={category}
					/>
				);
			})}
		</div>
	);
}
