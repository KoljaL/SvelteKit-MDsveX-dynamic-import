import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
console.log('\n\n\n\n\n******************NEW**************\n\n\n\n');

export const load = (async ({ params }) => {
	const slug = params.article;
	const ArticlesMeta: any = await getArticlesMeta();
	const ArticleMeta = ArticlesMeta.find((article: any) => {
		return article.slug === slug;
	});
	const ArticlePath = ArticleMeta.path;

	// console.log('page.server.ts load', params);
	// console.log('page.server.ts ArticlesMeta', ArticlesMeta);
	// console.log('page.server.ts Article', Article);
	// console.log('page.server.ts ArticlePath', ArticlePath);
	if (ArticlePath) {
		return {
			ArticlePath,
			ArticlesMeta,
			ArticleMeta
		};
	} else {
		throw error(404, {
			message: `Article "${slug}" not found`
		});
	}
}) satisfies PageServerLoad;

/**
 * @description get articles metadata
 *
 * @returns {Promise<ArticleMetadata[]>}
 */
async function getArticlesMeta() {
	const articlesFiles = import.meta.glob('/src/articles/**/+page.md');
	const postPromises: Promise<ArticleMetadata>[] = [];

	for (const [path, resolver] of Object.entries(articlesFiles)) {
		const post: any = await resolver();
		const slug = slugFromTitle(post.metadata.title);
		// const slug = slugFromPath(path);
		postPromises.push({
			slug,
			path,
			...post.metadata
		});
	}

	let articles: ArticleMetadata[] = await Promise.all(postPromises);
	// articles.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	// articles.forEach((article) => {
	// 	article.date = formatDate(article.date);
	// });
	// articles = sortByDate(articles);
	// console.log('articles', JSON.stringify(articles, null, 2));
	return articles;
}
/**
 *
 * @description get slug from title
 * @param {string} title
 *
 * @returns {string} slug
 */
function slugFromTitle(title: string): string {
	return (
		title
			// .toLowerCase()
			.trim()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-')
	);
}
