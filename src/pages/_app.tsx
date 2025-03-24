import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppProps } from "next/app";



export default function MyApp({ Component, pageProps }: AppProps) {
const [queryClient] = useState(() => new QueryClient());

const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })], // Conecta ao backend
});

return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
    </trpc.Provider>
);
}
