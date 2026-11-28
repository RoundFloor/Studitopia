import path from "path";
import fs, { mkdirSync, readFileSync, writeFileSync } from "fs";
import { readFiles } from "./files.js";
export class Node {
  constructor(
    public path: string,
    public key: string,
    public previous: number[],
    public next: number[],
    public index: number,
    public reverse?: number,
    public dump: boolean = false
  ) { }
}
export class ListNode {
  private map: Map<string, number>;
  private list: Node[];
  private reached: number[]
  constructor() { 
    this.map = new Map<string, number>()
    this.list = []
    this.reached = []
  }
  async run(fn: (node: Node) => Promise<boolean>) {
    const initial = this.reached.map((i, index) => [i, index, this.list[index]?.reverse]).filter(i => (i[0]! == 0 && !i[2]!)).map(i => i[1]!)
    this.reached = this.reached.map(i => (i == 0) ? 1 : i)
    await Promise.all(initial.map(i => this.__run__(i, fn, this.reached!)))
  }
  private async __run__(index: number, fn: (node: Node) => Promise<boolean>, reached: number[]) {
    reached[index]!--
    if (reached[index]! > 0) return;
    const node = this.list[index]!;
    await fn(node).then(async (value) => {
      if (value) {
        reached[index]!--
        await Promise.all(node.next.map(i => this.__run__(i, fn, reached)))
      }
    })
  }

  static compile(src: string) {
    const result = new ListNode()
    readFiles(src, (basename, src) => {
        if (basename[0] == '.') {
            console.log(`Ignore hidden file ${src}`)
            return false;
        }
        if (path.extname(basename) != '.sql') {
            console.log(`Ignore ${src} because it isnt sql file!`)
            return false;
        }

        const parts = basename.split('.').slice(0, -1)
        const key = (parts.length == 3) ? parts[1]! : parts[0]!
        if (key.lastIndexOf('_') > 0) {
            console.log(`Ignore ${src} because "_" must be at first if exists!`)
            return false;
        }
      const dependency = ((parts.length == 3) ? parts[2] : parts[1])?.split('_').filter(i => i.trim().length != 0) ?? [];
      if (!result.add(src, key, dependency, (key[0] == '_') ? key.slice(1) : undefined)) {
          console.log(`Ignore ${src} because this key exists!`)
        }
        return true;
    })
    return result
  }
  async restore(key: string, fn: (node: Node) => Promise<boolean>) {
    if (!this.map.has(key) || !this.map.has('_'+key)) {
      console.log(`Reverse node of ${key} does not found!`)
      console.log(`Invertable nodes: [${this.list.filter(i => i.reverse).map(i => i.key.slice(1)).join(', ')}]`)
      return false;
    }
    let index = this.map.get('_'+key)!
    if (this.reached![this.list[index]!.reverse!]! == -1)
      await this.__restore__(index, fn)
  }
  private async __restore__(index: number, fn: (node: Node) => Promise<boolean>) {
    const node = this.list[index]!
    if (!node.reverse) return true;
    if (this.reached![node.reverse]! != -1) return true;
    const results = await Promise.all(node.previous.map(i => this.__restore__(this.list[i]!.reverse!, fn)))
    if (results.every(i => i)) {
      const value = await fn(node)
      if (value) {
        this.__restore_reach__(node.reverse)
        return true;
      }
      return false;
    }
    return false;
  }
  private __restore_reach__(index: number) {
    const reached = this.reached[index]!
    let max = this.list[index]!.previous.length
    this.list[index]!.previous.forEach(i => {
      if (this.reached[i]! == -1) max--;
    })
    this.reached[index]! = max;
    if (reached == -1) {
      this.list[index]!.next.forEach(i => this.__restore_reach__(i))
    }
  }

  add(path: string, key: string, dependency: string[], reverse? :string): boolean {
    let node: Node;
    if (this.map.has(key)) {
      node = this.list[this.map.get(key)!]!
      if (!node.dump) return false;
      node.path = path
    }
    else {
      node = new Node(path, key, [], [], this.list.length)
      this.map.set(key, node.index)
      this.list.push(node)
      this.reached.push(0)

      if (reverse) {
        if (this.map.has(reverse)) {
          node.reverse = this.map.get(reverse)!
        }
        else {
          const rNode = new Node("", reverse!, [], [], this.list.length, undefined, true)
          this.map.set(reverse!, rNode.index)
          this.list.push(rNode)
          this.reached.push(0)
          node.reverse = rNode.index
        }

      }
    }
    dependency.forEach((value) => {
      let parent: Node
      if (!this.map.has(value)) {
        parent = new Node("", value, [], [], this.list.length, undefined, true)
        this.map.set(value, parent.index)
        this.list.push(parent)
        this.reached.push(0)
      }
      else {
        parent = this.list[this.map.get(value)!]!
      }
      parent.next.push(node.index)
      node.previous.push(parent.index)
      this.reached[node.index]!++
    })
    return true;
  }

  write(dst: string) {
    mkdirSync(path.dirname(dst), {recursive: true})
    writeFileSync(dst, JSON.stringify({
      list: this.list,
      trace: this.reached
    }))
  }
  static read(src: string) {
    const result = new ListNode()
    const { list, trace } = JSON.parse(readFileSync(src).toString()) as { list: Node[], trace: number[] | undefined }
    result.list = list
    if (trace) result.reached = trace
    result.map = new Map(result.list.map<[string, number]>(i => [i.key, i.index]));
    return result
  }
  forEach(fn: (node: {index: number, key: string, path: string, parent: string[], reverse: string | undefined}) => void) {
    this.list.forEach((value) => fn({
      index: value.index,
      key: value.key, path: value.path, parent: value.previous.map(i => this.list[i]!.key),
      reverse: (value.reverse) ? this.list[value.reverse!]!.key : undefined
    }))
  }
  mermaid(dst: string) {
      const lines: string[] = ["```mermaid", "flowchart TD"];
        
    let link_number = 0;
      this.list.forEach((node) => {
        if (node.reverse) return;
        lines.push(`    N${node.index}[${node.key}]`)

        if (this.reached) {
          const reached = this.reached[node.index]!
          lines.push(
            (reached == -1)
              ? `    style N${node.index} stroke-width:2px,stroke:#00ff00`
              : `    style N${node.index} stroke-width:2px,stroke:#ff0000`
          )
        }
        node.previous.forEach((parent) => {
          lines.push(`    N${parent} ==> N${node.index}`)
          if (this.reached) {
            const reached = this.reached[parent]!
            lines.push(
              (reached == -1)
                ? `    linkStyle ${link_number} stroke-width:1px,stroke:#00ff00`
                : `    linkStyle ${link_number} stroke-width:1px,stroke:#ff0000`
            )
            link_number++
          }
        })
      })
      lines.push("```")
      const output = lines.join("\n");
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.writeFileSync(dst, output, "utf-8");

      console.log(`Export graph into md file: ${dst}`)
    }
}
