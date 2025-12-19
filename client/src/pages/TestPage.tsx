import { AppwriteException } from "appwrite";
import { useState } from "react";
import { client } from "../api/appwrite";

export default function TestPage() {
    const [status, setStatus] = useState("idle");
    async function sendPing() {
        if (status === "loading") return;
        setStatus("loading");
        try {
            const result = await client.ping();
            const log = {
                date: new Date(),
                method: "GET",
                path: "/v1/ping",
                status: 200,
                response: JSON.stringify(result),
            };
            setStatus("success");
            console.log(log);
        } catch (err) {
            const log = {
                date: new Date(),
                method: "GET",
                path: "/v1/ping",
                status: err instanceof AppwriteException ? err.code : 500,
                response:
                    err instanceof AppwriteException
                        ? err.message
                        : "Something went wrong",
            };
            console.log(log);
        };
        setStatus("error");

    }
    return (
        <>
            <p className="text-3xl">Test Page</p>
            <button onClick={sendPing} disabled={status === "loading"}>
                {status === "loading" ? "Loading..." : "Send Ping"}
            </button>
        </>
    );
}

