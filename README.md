<img width="1676" alt="image" src="https://user-images.githubusercontent.com/20548516/219210488-1f4cdd52-06e5-4210-a9da-7ae25e2690e0.png">

# sveltekit-modal-stablediffusion

An example SvelteKit project using https://github.com/semicognitive/sveltekit-modal, showing how easy it is to write Python endpoints in SvelteKit.

See the code for the [example `+server.py` route here](src/routes/api/summarize/%2Bserver.py). You'll see it largely mirrors the SvelteKit built-in [`+server.js`](https://kit.svelte.dev/docs/routing#server)!

## This example 
- Includes a frontend written in [TailwindCSS](https://tailwindcss.com)
- Has a `api/summarize` endpoint which takes a PDF upload, and summarizes it with the OpenAI Api! Written in Python with [LangChain](https://langchain.readthedocs.io/en/latest/)
