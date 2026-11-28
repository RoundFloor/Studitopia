import { ListNode } from "./node.js";
import { PostgresClient } from "./sql.js";

const client = new PostgresClient()
await client.connect()


console.log("\n================================");
console.log(" PostgreSQL SQL File Runner");
console.log("================================\n");
try {
    const listnode = ListNode.read("./build/tree.md")
    await listnode.run(async node => {
        return await client.run(node.path);
    })
    listnode.write("./build/tree.md")
    listnode.mermaid(`./build/mermaid.md`)
    console.log("================================");
    console.log(" All SQL files executed!");
    console.log("================================");
} catch (error) {
    console.error("\nExecution stopped due to an error.");
    console.error(error);
    process.exitCode = 1;
}
client.dispose()