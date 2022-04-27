import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
	return (
		<div className='footer-container'>
			<p>{new Date().getFullYear()} TMN Headphones All rights reserved</p>
			<p className='icons'>
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
};

export default Footer;
