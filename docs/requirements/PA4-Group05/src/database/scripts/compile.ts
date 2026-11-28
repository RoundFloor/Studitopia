import { ListNode } from "./node.js";

const src = process.argv.slice(2)[0] ?? "./src"
const lists = ListNode.compile(src)
lists.write("./build/tree.md")
// const trace = new TraceNode(root)
// trace.exportMermaid("./build/dp.md")
// trace.save("./build/output.json")

const pads = [3, 20, 30, 10, 40]
console.log(['#', 'Keys', 'Dependency', 'IsReverse', 'Src'].map((i, index) => i.padEnd(pads[index]! + 3)).join(' | '))
console.log(''.padEnd(pads.reduce((sum, current) => sum + current + 3, 6), '='))

lists.forEach(node => {
    const part = [node.index.toString(), node.key, node.parent.join(' '), node.reverse ?? "", node.path]
        .map((i, index) => i.slice(0, pads[index]).concat((i.length > pads[index]!) ? '...' : '').padEnd(pads[index]! + 3))
    
    console.log(part.join(' | '))
})
lists.mermaid("./build/mermaid.md")