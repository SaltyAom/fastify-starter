import { transformFile, minify } from '@swc/core'

import { readdir, mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { sync as rmdir } from 'rimraf'

export const transform = (path: string) =>
    transformFile(path, {
        outputPath: 'build',
        root: 'src',
        module: {
            type: 'commonjs'
        },
        jsc: {
            baseUrl: 'src',
            paths: {
                '@modules': ['modules/index.ts'],
                '@modules/*': ['modules/*'],
                '@services': ['services/index.ts'],
                '@services/*': ['services/*'],
                '~': ['index.ts'],
                '~/*': ['*']
            },
            target: 'es2019',
            parser: {
                syntax: 'typescript'
            },
            minify: {
                mangle: true,
                compress: true
            }
        },
        env: {
            targets: {
                node: 14
            }
        }
    }).then(({ code }) => minify(code))

export const read = async (dir: string): Promise<string[]> => {
    const dirents = await readdir(dir, { withFileTypes: true })

    const files = await Promise.all(
        dirents.map((dirent) => {
            const res = resolve(dir, dirent.name)

            return dirent.isDirectory() ? read(res) : res
        })
    )

    return files.flat()
}

export const handleDir = async (path: string) => {
    let paths = path.split('/')
    paths = paths.slice(0, paths.length - 1)

    await mkdir(paths.join('/'), { recursive: true })
}

export const mapBasepath = (files: string[]) =>
    files
        .filter((file) => !file.match(/(.*).(spec|test).(j|t)s$/))
        .map((file) => file.replace(`${process.cwd()}/`, ''))

interface Transform {
    from: string
    to: string
}

export const _create = async (path: string, { from, to }: Transform) => {
    const [{ code }] = await Promise.all([
        transform(path),
        handleDir(path.replace(from, to))
    ])

    writeFile(path.replace(from, to).replace('.ts', '.js'), code)
}

export const create = async (
    files: string | string[],
    config: Transform = {
        from: 'src',
        to: 'build'
    }
) => {
    rmdir(config.to)

    if (Array.isArray(files))
        await Promise.all(files.map((path) => _create(path, config)))
    else await _create(files, config)
}
