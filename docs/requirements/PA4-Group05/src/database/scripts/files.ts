import fs from 'fs'
import path from 'path'

export function readFiles(dir: string, fn: (basename: string, path: string) => boolean): { basename: string, path: string }[] {
    const result = [] as { basename: string, path: string }[]
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            result.push(...readFiles(fullPath, fn))
        } else if (file.isFile()) {
            const basename = path.basename(file.name)

            if (fn(basename, fullPath)) result.push({basename, path: fullPath})
        }
    }
    return result;
}