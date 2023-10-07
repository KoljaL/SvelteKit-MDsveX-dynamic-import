export interface ArticleMetadata {
	layout: string;
	path: string;
	slug: string;
	published: boolean;
	title: string;
	category: string;
	description: string;
	tags: string;
	excerpt: string;
	date: any;
	coverImageUrl: string;
}
export type ArticleGroup = {
	group: string;
	articles: ArticleMetadata[];
};

export type GridShow = 'Recent' | 'Category' | 'Tag' | 'Tags';
