import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const incQty = () => {
		setQty(preQty => preQty + 1);
	};

	const decQty = () => {
		setQty(preQty => {
			if (preQty - 1 < 1) {
				return 1;
			}

			return preQty - 1;
		});
	};

	const onAddToCart = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			item => item._id === product._id
		);

		setTotalPrice(
			preTotalPrice => preTotalPrice + product.price * quantity
		);
		setTotalQuantities(preTotalQuantities => preTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map(cartProduct => {
				if (cartProduct._id === product._id) {
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
				}
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemove = product => {
		foundProduct = cartItems.find(item => item._id === product._id);
		const newCartItems = cartItems.filter(item => item._id !== product._id);

		setTotalPrice(preTotalPrice => preTotalPrice - foundProduct.price * foundProduct.quantity);
		setTotalQuantities(preTotalQuantities => preTotalQuantities - foundProduct.quantity);
		setCartItems(newCartItems);
	}

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find(item => item._id === id);
		index = cartItems.findIndex(product => product._id === id);
		const newCartItems = cartItems.filter(item => item._id !== id);

		if (value === 'inc') {
			setCartItems([
				...newCartItems,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);
			setTotalPrice(
				prevTotalPrice => prevTotalPrice + foundProduct.price
			);
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice(
					prevTotalPrice => prevTotalPrice - foundProduct.price
				);
				setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
			}
		}
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAddToCart,
				onRemove,
				toggleCartItemQuantity,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default StateContext;
export const useStateContext = () => useContext(Context);
