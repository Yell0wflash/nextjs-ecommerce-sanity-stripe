import { Product, FooterBanner, HeroBanner } from '../components';
import {client } from '../lib/client';

const Home = () => {
	return <>
		<HeroBanner />

		<div className="products-heading">
			<h2>Best Seller Product</h2>
			<p>Speaker of many variations</p>
		</div>

		<div className="products-container">
			{['Product 1', 'Product 2', 'Product 3'].map(product => product)}
		</div>

		<FooterBanner />
	</>;
};

export default Home;
