"use client"
import { cn } from "@/lib/utils"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link2, AlertTriangle, Copy, Maximize2, Minimize2 } from "lucide-react"
// useRef is not strictly needed here as we are not logging multiple steps in the same way

interface HashTableEntry {
  key: string
  value: string
  id: string // for animation
}

interface Bucket extends Array<HashTableEntry> {}

const TABLE_SIZE = 7 // Keep it small for visualization

// Simple hash function (sum of char codes modulo table size)
const simpleHash = (key: string, size: number): number => {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * (i + 1)) % size // Multiply by i+1 for better distribution
  }
  return Math.abs(hash) // Ensure positive
}

export default function HashingConceptualVisualizer() {
  const [keyInput, setKeyInput] = useState<string>("")
  const [valueInput, setValueInput] = useState<string>("")
  const [hashTable, setHashTable] = useState<Bucket[]>(() =>
    Array(TABLE_SIZE)
      .fill(null)
      .map(() => []),
  )
  const [lastHashedKey, setLastHashedKey] = useState<string | null>(null)
  const [lastHashedIndex, setLastHashedIndex] = useState<number | null>(null)
  const [collision, setCollision] = useState<boolean>(false)
  const [isStatusExpanded, setIsStatusExpanded] = useState(false)
  const [copyStatusText, setCopyStatusText] = useState("Copy Status")

  const handleCopyStatus = async () => {
    let statusToCopy = ""
    if (lastHashedKey && lastHashedIndex !== null) {
      statusToCopy += `Key: ${lastHashedKey}\n`
      statusToCopy += `Hash Function: sum(charCodes * (idx+1)) % ${TABLE_SIZE}\n`
      statusToCopy += `Computed Index: ${lastHashedIndex}\n`
      if (collision) {
        statusToCopy += `Collision occurred! Added to chain.`
      }
    } else {
      statusToCopy = "No current hash operation status to copy."
    }

    try {
      await navigator.clipboard.writeText(statusToCopy)
      setCopyStatusText("Copied!")
      setTimeout(() => setCopyStatusText("Copy Status"), 2000)
    } catch (err) {
      console.error("Failed to copy status: ", err)
      setCopyStatusText("Failed!")
      setTimeout(() => setCopyStatusText("Copy Status"), 2000)
    }
  }

  const handleInsert = () => {
    if (!keyInput) return
    const index = simpleHash(keyInput, TABLE_SIZE)
    setLastHashedKey(keyInput)
    setLastHashedIndex(index)

    const newTable = hashTable.map((bucket) => [...bucket]) // Deep copy buckets

    const existingKeyIndex = newTable[index].findIndex((entry) => entry.key === keyInput)

    if (existingKeyIndex !== -1) {
      // Key already exists, update value
      newTable[index][existingKeyIndex].value = valueInput || `val_of_${keyInput}`
      setCollision(false) // Not a collision in terms of new slot, but an update
    } else {
      // New key
      if (newTable[index].length > 0) {
        setCollision(true) // Collision: bucket is not empty and key is new
      } else {
        setCollision(false)
      }
      newTable[index].push({
        key: keyInput,
        value: valueInput || `val_of_${keyInput}`,
        id: `${keyInput}-${hashTable.flat().length}`,
      })
    }

    setHashTable(newTable)
    setKeyInput("")
    setValueInput("")
  }

  const handleRemove = (keyToRemove: string) => {
    const index = simpleHash(keyToRemove, TABLE_SIZE)
    const newTable = hashTable.map((bucket) => bucket.filter((entry) => entry.key !== keyToRemove))
    setHashTable(newTable)
    if (lastHashedKey === keyToRemove) {
      setLastHashedKey(null)
      setLastHashedIndex(null)
      setCollision(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-slate-800 text-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400">Hashing (Conceptual with Chaining)</h2>
      <div className="flex space-x-2 w-full max-w-md">
        <Input
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Enter Key (e.g., 'apple')"
          className="bg-slate-700 border-slate-600"
        />
        <Input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Enter Value (optional)"
          className="bg-slate-700 border-slate-600"
        />
        <Button onClick={handleInsert} className="bg-cyan-500 hover:bg-cyan-600">
          Insert
        </Button>
      </div>

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-medium text-slate-300">Current Hash Operation Status:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyStatus}
              className="text-cyan-400 hover:text-cyan-300 px-2 py-1 h-auto"
              disabled={!lastHashedKey}
            >
              <Copy className="mr-1.5 h-3.5 w-3.5" /> {copyStatusText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsStatusExpanded(!isStatusExpanded)}
              className="text-cyan-400 hover:text-cyan-300 px-2 py-1 h-auto"
              disabled={!lastHashedKey}
            >
              {isStatusExpanded ? (
                <Minimize2 className="mr-1.5 h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
              )}
              {isStatusExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "text-center p-4 bg-slate-700 rounded-md flex flex-col justify-center transition-all duration-300 ease-in-out",
            isStatusExpanded ? "min-h-[150px]" : "min-h-[100px]", // Adjusted height for status
          )}
        >
          {lastHashedKey && lastHashedIndex !== null ? (
            <>
              <p>
                Key: <span className="font-semibold text-cyan-300">{lastHashedKey}</span>
              </p>
              <p>
                Hash Function:{" "}
                <span className="italic text-sm text-slate-400">sum(charCodes * (idx+1)) % {TABLE_SIZE}</span>
              </p>
              <p>
                Computed Index: <span className="font-semibold text-cyan-300">{lastHashedIndex}</span>
              </p>
              {collision && (
                <p className="text-orange-400 flex items-center justify-center mt-1">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Collision occurred! Added to chain.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-500 italic">Perform a hash operation to see status.</p>
          )}
        </div>
      </div>

      <div className="w-full p-4 border border-slate-700 rounded-md bg-slate-900/50">
        <p className="text-sm text-slate-400 mb-2">Hash Table (Size: {TABLE_SIZE}, Collision Resolution: Chaining)</p>
        <div className="space-y-2">
          {hashTable.map((bucket, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center p-2 rounded min-h-[40px]",
                lastHashedIndex === index ? "bg-cyan-700/50 ring-2 ring-cyan-400" : "bg-slate-700",
              )}
            >
              <div className="w-10 font-mono text-sm text-slate-400 mr-2">{index}:</div>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence>
                  {bucket.map((entry, entryIdx) => (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="bg-cyan-600 p-1.5 rounded text-xs shadow-md flex items-center"
                    >
                      {entryIdx > 0 && <Link2 className="w-3 h-3 mr-1 text-cyan-300" />}
                      <span className="font-semibold">{entry.key}</span>:
                      <span className="italic ml-1 opacity-80">{entry.value}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-5 w-5 p-0 text-red-400 hover:text-red-300"
                        onClick={() => handleRemove(entry.key)}
                      >
                        ✕
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {bucket.length === 0 && <span className="text-xs text-slate-500 italic">empty</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center">
        This is a simplified conceptual visualizer. Real-world hash tables use more complex hash functions and may use
        other collision resolution strategies like open addressing (linear/quadratic probing, double hashing).
      </p>
    </div>
  )
}
