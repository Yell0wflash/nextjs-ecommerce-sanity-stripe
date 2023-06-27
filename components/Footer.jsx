import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
	return (
		<div className='footer-container'>
			<p>{new Date().getFullYear()} <a href="https://github.com/Yell0wflash" rel="noreferrer" target="_blank">Kooya</a> All rights reserved</p>
			<p className='icons'>
				<AiFillInstagram />
				<AiOutlineTwitter />
			</p>
		</div>
	);
};

export default Footer;
