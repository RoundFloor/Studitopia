import { ListNode } from "./node.js"
import { PostgresClient } from "./sql.js"

const restores = process.argv.slice(2) as string[]
if (restores.length != 1) 
    throw new Error("Can restore only one node at once!")
const key = restores[0]!

const client = new PostgresClient()
await client.connect()
const listnode = ListNode.read("./build/tree.md")
await listnode.restore(key, async (node) => {
    return await client.run(node.path)
})
listnode.write("./build/tree.md")
listnode.mermaid("./build/mermaid.md")
client.dispose()
// const list = new Map<string, string>(root.filter(i => i.reverse != undefined).map(value => [value.key, root.get(value.reverse!)!.path]))

// if (!list.has(key)) {
//     console.log(`Failed to reverse Node ${key}!`)
//     console.log(`Reversable nodes: [${[...list.keys()].join(' ')}]`)
// }
// else {
// }
