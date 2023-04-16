import { writable } from "svelte/store";

export function readablestreamStore() {
    const { subscribe, set, update } = writable({ loading: false, text: "" });

    async function request(request: Request) {
        set({ loading: true, text: "" });

        try {
            const result = await fetch(request);

            if (!result.ok) throw new Error(result.statusText);
            if (!result.body) return;
















          
        } catch (err: any) {
            set({ loading: false, text: err.toString() });
            throw err;
        }
    }

    return { subscribe, request };
}

