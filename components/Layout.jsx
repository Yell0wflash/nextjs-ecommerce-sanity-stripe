import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className='layout'>
			<Head>
				<title>Trịnh Minh Nhật&apos;s Store</title>
				<link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
			</Head>
			<header>
				<Navbar />
			</header>
			<main className='main-container'>{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
