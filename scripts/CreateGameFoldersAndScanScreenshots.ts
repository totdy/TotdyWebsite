import fs from 'fs'
import path from 'path'

/* ---------------- PATHS ---------------- */

const dataPath = path.resolve(
  './public/assets/data/games.json'
)

const screenshotsRoot = path.resolve(
  './public/assets/img/screenshots'
)

/* ---------------- READ JSON ---------------- */

const raw = fs.readFileSync(dataPath, 'utf-8')
const games = JSON.parse(raw)

/* ---------------- SAFETY CHECK ---------------- */

if (!games || !Array.isArray(games)) {
  console.error('Invalid games.json structure')
  process.exit(1)
}

/* ---------------- PROCESS ---------------- */

games.forEach(game => {
  const uid = game.uid
  if (!uid) return

  const folderPath = path.join(
    screenshotsRoot,
    uid
  )

  /* ---------- CREATE FOLDER ---------- */

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(`Created: ${folderPath}`)

    // No screenshots yet
    game.screenshots = []
    return
  }

  console.log(`Exists: ${folderPath}`)

  /* ---------- READ FILES ---------- */

  const files = fs
    .readdirSync(folderPath)
    .filter(file =>
      /\.(png|jpg|jpeg|webp|gif)$/i.test(file)
    )
    .sort((a, b) => a.localeCompare(b))

  /* ---------- UPDATE JSON ---------- */

  game.screenshots = files
})

/* ---------------- WRITE BACK ---------------- */

fs.writeFileSync(
  dataPath,
  JSON.stringify(games, null, 2),
  'utf-8'
)

console.log('Folder + screenshots sync complete.')