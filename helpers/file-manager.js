import fs from 'fs/promises'

/**
 * Reads a file and returns the contents.
 * @param {string} filename The filename of the file to read from.
 * @returns The file contents.
 */
export async function readFile(filename) {
    return await fs.readFile(filename)
}

/**
 * Writes data to a file
 * @param {Any} data The serializable data to write to a file.
 * @param {string} filename The filename to write the data to.
 */
export async function writeFile(data, filename) {
    await fs.writeFile(filename, data)
}