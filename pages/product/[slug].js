import { useState } from 'react';
import {
    AiFillStar, AiOutlineMinus,
    AiOutlinePlus, AiOutlineStar
} from 'react-icons/ai';
import { Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import {useStateContext} from '../../context/StateContext';

const ProductDetail = ({ product, products }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
    const { incQty, decQty, qty, onAddToCart } = useStateContext();

	return (
		<div>
			<div className='product-detail-container'>
				<div>
					<div className='image-container'>
						<img
							src={urlFor(image && image[index])}
							className='product-detail-image'
							alt='Product detail image'
						/>
					</div>
					<div className='small-images-container'>
						{image?.map((item, key) => (
							<img
								key={key}
								className={
									key === index
										? 'small-image selected-image'
										: 'small-image'
								}
								src={urlFor(item)}
								onMouseEnter={() => setIndex(key)}
								alt='Small image detail'
							/>
						))}
					</div>
				</div>
				<div className='product-detail-desc'>
					<h1>{name}</h1>
					<div className='reviews'>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Detail:</h4>
					<p>{details}</p>
					<p className='price'>${price}</p>
					<div className='quantity'>
						<h3>Quantity</h3>
						<p className='quantity-desc'>
							<span className='minus' onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className='num'>
								{qty}
							</span>
							<span className='plus' onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className='buttons'>
						<button
							type='button'
							className='add-to-cart'
							onClick={() => onAddToCart(product, qty)}
						>
							Add to cart
						</button>
						<button type='button' className='buy-now'>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2>You may also like</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map(product => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticPaths() {
	const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

	const products = await client.fetch(query);

	const paths = products.map(product => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
	const product = await client.fetch(query);

	const productQuery = '*[_type == "product"]';
	const products = await client.fetch(productQuery);

	return {
		props: {
			product,
			products,
		},
	};
};

export default ProductDetail;
