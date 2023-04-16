import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'

import rehypeShiki from '@stefanprobst/rehype-shiki'
import * as shiki from 'shiki-es'


let markdown_processor;

export async function markdownParser(markdown: string) {
    markdown_processor ??= unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' })
        .use(rehypeShiki, { highlighter: await shiki.getHighlighter({ theme: 'github-light' }) })
        .use(rehypeStringify)

    const res = (await markdown_processor.process(markdown)).toString();

    return res;
}