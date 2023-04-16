import { writable } from "svelte/store";

export function readablestreamStore() {
    const { subscribe, set, update } = writable({ loading: false, text: "" });

    async function request(request: Request) {
        set({ loading: true, text: "" });

        try {
            const result = await fetch(request);

            if (!result.ok) throw new Error(result.statusText);
            if (!result.body) return;

            const reader = result.body.pipeThrough(new TextDecoderStream()).getReader();

            let finaltext = "";
            while (true) {
                const { value: token, done } = await reader.read();

                if (token != undefined) update((val) => {
                   finaltext = val.text + token;
                   return ({ loading: true, text: finaltext });
                });
                if (done) break;
            }

            set({ loading: false, text: "" });

            return finaltext;
        } catch (err: any) {
            set({ loading: false, text: err.toString() });
            throw err;
        }
    }

    return { subscribe, request };
}

