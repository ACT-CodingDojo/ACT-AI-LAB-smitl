export interface Wine {
  id: number
  name: string
  region: string
  type: 'rosso' | 'bianco' | 'rosato' | 'bianco dolce' | 'bianco spumante'
  body: 'light' | 'medium' | 'full'
  acidity: 'low' | 'medium' | 'high'
  tannins?: 'none' | 'low' | 'medium' | 'high'
  tasting_notes: string
  typical_pairings: string[]
  seasons: string[]
  description: string
}

export interface WineDatabase {
  wines: Wine[]
}

let wineDatabase: WineDatabase | null = null

export async function loadWines(): Promise<Wine[]> {
  if (wineDatabase) {
    return wineDatabase.wines
  }

  try {
    const response = await fetch('/wines.json')
    if (!response.ok) {
      throw new Error(`Failed to load wines.json: ${response.statusText}`)
    }
    wineDatabase = await response.json()
    return validateWineDatabase(wineDatabase).wines
  } catch (error) {
    console.error('Error loading wine database:', error)
    return []
  }
}

export function validateWineDatabase(data: unknown): WineDatabase {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid wine database: not an object')
  }

  const db = data as Record<string, unknown>
  if (!Array.isArray(db.wines)) {
    throw new Error('Invalid wine database: missing wines array')
  }

  db.wines.forEach((wine, index) => {
    if (!wine || typeof wine !== 'object') {
      throw new Error(`Invalid wine at index ${index}: not an object`)
    }
    const w = wine as Record<string, unknown>
    if (typeof w.id !== 'number' || typeof w.name !== 'string') {
      throw new Error(`Invalid wine at index ${index}: missing required fields`)
    }
  })

  return db as unknown as WineDatabase
}

export function getWineById(wines: Wine[], id: number): Wine | undefined {
  return wines.find((w) => w.id === id)
}

export function filterWinesByType(wines: Wine[], type: string): Wine[] {
  return wines.filter((w) => w.type === type)
}

export function filterWinesBySeason(wines: Wine[], season: string): Wine[] {
  return wines.filter((w) => w.seasons.includes(season))
}

export function filterWinesByOccasion(wines: Wine[], occasion: string): Wine[] {
  const occasionToWineType: Record<string, string[]> = {
    'formal dinner': ['rosso', 'bianco', 'bianco spumante'],
    'casual lunch': ['bianco', 'rosato'],
    'date night': ['rosso', 'bianco spumante'],
    'celebration': ['bianco spumante', 'rosso'],
    aperitivo: ['bianco spumante', 'rosato', 'bianco'],
  }

  const types = occasionToWineType[occasion.toLowerCase()] || []
  return wines.filter((w) => types.includes(w.type))
}
