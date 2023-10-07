# Just a test repo for dynamic import in SvelteKit

## This seems to work :-)

[src/routes/[...article]/+page.ts#L33-L35](src/routes/[...article]/+page.ts#L33-L35)
```typescript
	const ArticlePathStripped = ArticlePath.replace('/src/', '../../').replace('.md', '');
	const modules = import.meta.glob('../../articles/**/**/+page.md');
	const ArticleComponent = await modules[`${ArticlePathStripped}.md`]();
```



### double import globe
https://github.com/vitejs/vite/issues/11824#issuecomment-1407392982   
As a temporary solution for SvelteKit users facing this issue, rather than (which currently breaks):

```js
export async load = ({ params }) =>{
  const module = await import(`./index.${params.foo}.js`);
  return module.data;
}
```

do instead:

```js
export async load = ({ params }) =>{
  const modules = import.meta.glob('./index.*.js');
  const module = await modules[`./index.${params.foo}.js`]();
  return module.data;
}
```

---

### @rollup/plugin-dynamic-import-vars
https://stackoverflow.com/a/71350674   
makes no sense, because every route must be defined in the config file. So it's not dynamic.
