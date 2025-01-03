import {PrismaClient} from "@prisma/client";
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

prismaClient.$on("error", (e : any) => {
    console.log(e);
})

prismaClient.$on("warn", (e : any) => {
    console.log(e);
})

prismaClient.$on("info", (e : any) => {
    console.log(e);
})

prismaClient.$on("query", (e : any) => {
    console.log(e);
})
