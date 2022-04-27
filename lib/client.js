import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
	projectId: 't7ua6w4t',
	dataset: 'production',
	apiVersion: 'v1',
	useCdn: true,
	token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
