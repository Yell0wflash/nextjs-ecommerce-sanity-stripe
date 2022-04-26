import Link from 'next/link';

const HeroBanner = () => {
	return (
		<div className='hero-banner-container'>
			<div>
				<p className='beat-solo'>small text</p>
				<h3>mid text</h3>
				<img src="" alt="headphones" className='hero-banner-image' />
				<div>
					<Link href='/product/Id'>
						<button type='button'>Button</button>
					</Link>
				</div>
				<div className="desc">
					<h5>Description</h5>
					<p>dis</p>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
