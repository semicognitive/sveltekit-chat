<script lang="ts">
    import { readablestreamStore } from "../lib/readablestreamstore";
    import { fly } from "svelte/transition";

    import Typingindicator from "../lib/typingindicator.svelte";

    const response = readablestreamStore();

    let chat_history: { role: "user" | "assistant"; content: string }[] = [];

    async function handleSubmit(this: HTMLFormElement) {
        if ($response.loading) return;

        const formData: FormData = new FormData(this);
        const message = formData.get("message") as string;

        if (message == "") return;

        chat_history = [...chat_history, { role: "user", content: message }];

        try {
            const chats = [{ role: "assistant", content: "Hello! How can I help you today?" }, ...chat_history];
            const answer = response.request(
                new Request("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chats }),
                })
            );

            this.reset();

            chat_history = [...chat_history, { role: "assistant", content: (await answer) as string }];
        } catch (err) {
            chat_history = [...chat_history, { role: "assistant", content: `Error: ${err}` }];
        }
    }
</script>

<main class="flex flex-col space-y-4">
    <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold underline">Chat!</h1>
        <p>Example made for <i><b>Intelligent Svelte</b></i>.</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} method="POST" action="/api/chat" class="flex flex-col space-y-4 md:min-w-[28rem] lg:min-w-[32rem] xl:min-w-[36rem] max-w-6xl">
        <!-- Chat messages -->
        <div class="flex flex-col space-y-2 overflow-y-auto w-full aspect-square text-sm">
            {#await new Promise((res) => setTimeout(res, 400)) then _}
                <div class="flex">
                    <div in:fly={{ y: 50, duration: 400 }} class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                        <p>Hello! How can I help you today?</p>
                    </div>
                </div>
            {/await}

            {#each chat_history as chat}
                {#if chat.role == "user"}
                    <div class="flex justify-end">
                        <div in:fly={{ y: 50, duration: 600 }} class="bg-[#FF3E00] text-white rounded-lg px-4 py-2 max-w-xs">
                            <p>{chat.content}</p>
                        </div>
                    </div>
                {:else}
                    <div class="flex">
                        <div in:fly={{ y: 50, duration: 600 }} class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                            <p>{chat.content}</p>
                        </div>
                    </div>
                {/if}
            {/each}

            {#if $response.loading}
                {#await new Promise((res) => setTimeout(res, 400)) then _}
                    <div class="flex">
                        <div in:fly={{ y: 50, duration: 600 }} class="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                            {#if $response.text == ""}
                                <Typingindicator />
                            {:else}
                                <p>{$response.text}</p>
                            {/if}
                        </div>
                        {#if $response.text != ""}
                            <div class="w-2" />
                            <div class="w-4 m-1">
                                <svg class="animate-spin h-4 w-4 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            </div>
                        {/if}
                    </div>
                {/await}
            {/if}
        </div>

        <div class="h-px bg-gray-200" />

        <span class="flex flex-row space-x-4">
            <input
                type="text"
                placeholder="Type your message..."
                name="message"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" />
            <button
                type="submit"
                class="inline-flex items-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                Send
            </button>
        </span>
    </form>
</main>