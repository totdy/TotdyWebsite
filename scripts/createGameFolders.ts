import fs from 'fs'
import path from 'path'

// Paths
const dataPath = path.resolve(
  './public/assets/data/games.json'
)

const assetsDir = path.resolve(
  './public/assets/img/screenshots'
)

// Read JSON
const raw = fs.readFileSync(dataPath, 'utf-8')
const json = JSON.parse(raw)

// Safety check
if (!json || !Array.isArray(json)) {
  console.error('Invalid games.json structure')
  process.exit(1)
}

// Create folders
json.forEach(game => {
  const uid = game.uid

  if (!uid) return

  const folderPath = path.join(assetsDir, uid)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(`Created: ${folderPath}`)
  } else {
    console.log(`Exists: ${folderPath}`)
  }
})

console.log('Folder sync complete.')