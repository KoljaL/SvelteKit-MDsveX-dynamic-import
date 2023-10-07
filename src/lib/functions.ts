import type { ArticleMetadata } from '../types.d';

//[plugin:vite:import-glob] Invalid glob import syntax: Could only use literals
// import { PUBLIC_ARTICLE_PATH } from '$env/static/public';
// const articlesFiles = import.meta.glob(PUBLIC_ARTICLE_PATH);

/**
 * @description get articles metadata
 *
 * @returns {Promise<ArticleMetadata[]>}
 */
export async function getArticlesMeta() {
	const articlesFiles = import.meta.glob('/src/articles/**/index.md');
	const postPromises: Promise<ArticleMetadata>[] = [];

	for (const [path, resolver] of Object.entries(articlesFiles)) {
		const post: any = await resolver();
		// const slug = slugFromTitle(post.metadata.title);
		const slug = slugFromPath(path);
		postPromises.push({
			slug,
			path,
			...post.metadata
		});
	}

	let articles: ArticleMetadata[] = await Promise.all(postPromises);
	// articles.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	articles.forEach((article) => {
		article.date = formatDate(article.date);
	});
	articles = sortByDate(articles);
	// console.log('articles', JSON.stringify(articles, null, 2));
	return articles;
}

/**
 *
 * @description gets the slug from the path
 * @param {string} path
 *
 * @returns {string} slug
 */
function slugFromPath(path: string): string {
	const pathParts = path.split('/');
	const slug = pathParts[pathParts.length - 2];
	return slug;
}

/**
 *
 * @description sort articles by date
 * @param {ArticleMetadata[]} metadata
 *
 * @returns {ArticleMetadata[]}
 */
function sortByDate(metadata: ArticleMetadata[]) {
	return metadata.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
/**
 *
 * @description format date to dd.mm.yyyy
 * @param {string} date
 * @param {string} locale
 *
 * @returns {string} dd.mm.yyyy
 */
export function formatDate(date: string, locale = 'en-US') {
	return new Date(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
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
/**
 * @description Dispatch event on click outside of node
 * @example <div use:clickOutside on:click_outside={handleClickOutside}>
 *
 * @param {HTMLElement} node
 *
 * @returns {object} destroy
 */
export function clickOutside(node: HTMLElement, handler: () => void): { destroy: () => void } {
	const onClick = (event: MouseEvent) =>
		node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler();
	document.addEventListener('click', onClick, true);
	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}

/**
 * @description format datetime to dd.mm.yyyy hh:mm
 *
 * @param {string} datetime
 *
 * @returns {string} dd.mm.yyyy hh:mm
 *
 */
export function formatDatetime(datetime: string) {
	const d = new Date(datetime);
	const year = d.getFullYear();
	const month = ('0' + (d.getMonth() + 1)).slice(-2);
	const day = ('0' + d.getDate()).slice(-2);
	const hour = ('0' + d.getHours()).slice(-2);
	const minute = ('0' + d.getMinutes()).slice(-2);
	return `${day}.${month}.${year} ${hour}:${minute}`;
}

/**
 *
 *
 *
 *
 *
 *
 */
// --------------------------------
// utility functions
// --------------------------------

function getFileNames(files: any) {
	const slugs = Object.entries(files);
	return slugs.map(([path]) => {
		const filename = path.split('/').pop();
		if (!filename) return;
		const slug = filename.slice(0, -3);
		return slug;
	});
}

function getFileName(path: string) {
	const filename = path.split('/').pop();
	if (!filename) return;
	const slug = filename.slice(0, -3);
	return slug;
}

function getParentFolderNames(files: any) {
	const fileNames = Object.entries(files);
	return fileNames.map(([path]) => {
		const parentFilename = path.split('/').at(-2);
		return parentFilename;
	});
}

function getParentFolderName(path: string) {
	const parentFilename = path.split('/').at(-2);
	return parentFilename;
}

function titleToSlug(title: string) {
	let titleslug = title.replace(/\s+/g, '-').toLowerCase();
	return titleslug;
}
