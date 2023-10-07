// @ts-nocheck
import { parse } from 'node-html-parser';
import { getHighlighter } from 'shiki';

// https://github.com/rodneylab/sveltekit-shiki-code-highlighting/blob/main/src/lib/utilities/codeHighlighter.mjs
// const THEME = 'css-variables';
// const THEME = 'one-dark-pro';
// 'github-light'

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} code - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
	);
}

/**
 * Parses a comma-separated range string into an array of integers.
 *
 * @param {string} rangeString - The range string to parse, e.g., "1,2,5-7".
 * @returns {number[]} An array of integers representing the parsed range.
 */
function rangeParser(rangeString) {
	const result = [];
	const ranges = rangeString.split(',');
	ranges.forEach((element) => {
		if (element.indexOf('-') === -1) {
			result.push(parseInt(element, 10));
		} else {
			const limits = element.split('-');
			const start = parseInt(limits[0], 10);
			const end = parseInt(limits[1], 10);
			for (let i = start; i <= end; i += 1) {
				result.push(i);
			}
		}
	});
	/** @type {number[]} */
	return result;
}

/**
 * @param html {string} - code to highlight
 * @returns {string} - highlighted html
 */
function makeFocussable(html) {
	const root = parse(html);
	root.querySelector('pre').setAttribute('tabIndex', '0');
	// root.querySelector('pre').removeAttribute('tabIndex');
	return root.toString();
}

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {string} - highlighted html
 */
// async function highlighter(code, lang, meta) {
// 	const shikiHighlighter = await getHighlighter({
// 		theme: THEME
// 	});

// 	let html;
// 	if (!meta) {
// 		html = shikiHighlighter.codeToHtml(code, {
// 			lang
// 		});
// 	} else {
// 		const highlightMeta = /{([\d,-]+)}/.exec(meta)[1];
// 		const highlightLines = rangeParser(highlightMeta);

// 		html = shikiHighlighter.codeToHtml(code, {
// 			lang,
// 			lineOptions: highlightLines.map((element) => ({
// 				line: element,
// 				classes: ['highlight-line']
// 			}))
// 		});
// 	}
// 	html = makeFocussable(html);
// 	return escapeHtml(html);
// }

// function copyText(code) {
// 	navigator.clipboard.writeText(code);
// }

async function highlighter(code, lang, meta) {
	const theme = ['one-dark-pro', 'github-light'];

	let output = '';

	for (const THEME of theme) {
		// console.log('THEME', theme);
		const shikiHighlighter = await getHighlighter({
			theme: THEME
		});

		let html;
		if (!meta) {
			html = shikiHighlighter.codeToHtml(code, {
				lang
			});
		} else {
			const highlightMeta = /{([\d,-]+)}/.exec(meta)[1];
			const highlightLines = rangeParser(highlightMeta);

			html = shikiHighlighter.codeToHtml(code, {
				lang,
				lineOptions: highlightLines.map((element) => ({
					line: element,
					classes: ['highlight-line']
				}))
			});
		}
		html = makeFocussable(html);
		html = escapeHtml(html);

		output += html;
	}
	// let button = `<button class="copyCodeButton" onclick="copyText(${code})">copy</button>`;
	// console.log('code', code);
	// let textareacode = `<textarea class="copyCodeButton">${code}</textarea>`;
	// return textareacode + output;
	return output;
}

export default highlighter;
