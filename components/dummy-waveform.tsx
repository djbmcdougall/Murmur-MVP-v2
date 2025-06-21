"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DummyWaveformProps {
  audioUrl: string
  height: number
  isPlaying: boolean
  onTimeUpdate: (time: number) => void
  onDurationChange: (duration: number) => void
  onLoadingChange: (loading: boolean) => void
}

// Predefined waveform patterns for different users
const waveformPatterns = {
  'sarah-coffee': [0.3, 0.7, 0.9, 0.6, 0.8, 0.5, 0.7, 0.9, 0.4, 0.6, 0.8, 0.7, 0.5, 0.9, 0.6, 0.4, 0.7, 0.8, 0.5, 0.6, 0.9, 0.7, 0.4, 0.8, 0.6, 0.5, 0.7, 0.9, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6, 0.4, 0.8, 0.7, 0.5, 0.6],
  'mike-hiking': [0.4, 0.5, 0.6, 0.7, 0.5, 0.6, 0.4, 0.5, 0.7, 0.6, 0.5, 0.4, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.7, 0.6],
  'emily-book': [0.2, 0.8, 0.4, 0.9, 0.3, 0.7, 0.5, 0.8, 0.2, 0.9, 0.4, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.2, 0.8, 0.4, 0.6, 0.7, 0.3, 0.9, 0.5, 0.8, 0.2, 0.7, 0.4, 0.9, 0.3, 0.6, 0.8, 0.5, 0.7, 0.2, 0.9, 0.4, 0.8, 0.6],
  'david-tech': [0.2, 0.3, 0.4, 0.3, 0.2, 0.4, 0.3, 0.2, 0.4, 0.3, 0.2, 0.3, 0.4, 0.2, 0.3, 0.4, 0.3, 0.2, 0.4, 0.3, 0.2, 0.3, 0.4, 0.2, 0.3, 0.4, 0.3, 0.2, 0.4, 0.3, 0.2, 0.3, 0.4, 0.2, 0.3, 0.4, 0.3, 0.2, 0.4, 0.3],
  'default': [0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.7, 0.5, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.7, 0.5, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5, 0.8, 0.3]
}

export default function DummyWaveform({
  audioUrl,
  height,
  isPlaying,
  onTimeUpdate,
  onDurationChange,
  onLoadingChange
}: DummyWaveformProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  // Determine which pattern to use based on audioUrl
  const getPattern = () => {
    if (audioUrl.includes('sarah')) return waveformPatterns['sarah-coffee']
    if (audioUrl.includes('mike')) return waveformPatterns['mike-hiking'] 
    if (audioUrl.includes('emily')) return waveformPatterns['emily-book']
    if (audioUrl.includes('david')) return waveformPatterns['david-tech']
    return waveformPatterns['default']
  }

  const pattern = getPattern()
  const duration = 180 // 3 minutes

  // Set duration immediately
  useEffect(() => {
    onDurationChange(duration)
    onLoadingChange(false)
  }, [duration, onDurationChange, onLoadingChange])

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= duration) {
            return 0
          }
          const newProgress = newTime / duration
          setProgress(newProgress)
          onTimeUpdate(newTime)
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, duration, onTimeUpdate])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = clickX / rect.width
    const newTime = newProgress * duration
    
    setProgress(newProgress)
    setCurrentTime(newTime)
    onTimeUpdate(newTime)
  }

  return (
    <div 
      className="w-full cursor-pointer hover:opacity-80 transition-all duration-200"
      style={{ height: `${height}px` }}
      onClick={handleClick}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${pattern.length * 4} ${height}`}
        className="overflow-visible"
      >
        {pattern.map((amplitude, index) => {
          const x = index * 4
          const barHeight = amplitude * height * 0.8
          const y = (height - barHeight) / 2
          const barProgress = index / pattern.length
          const isPlayed = barProgress <= progress

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={2}
              height={barHeight}
              rx={1}
              className="transition-all duration-200"
              fill={isPlayed ? 'url(#playedGradient)' : 'url(#unplayedGradient)'}
            />
          )
        })}
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="playedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B91C9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9F9BC8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="unplayedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B91C9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9F9BC8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Progress line */}
        {progress > 0 && (
          <line
            x1={progress * pattern.length * 4}
            y1={0}
            x2={progress * pattern.length * 4}
            y2={height}
            stroke="#7B91C9"
            strokeWidth={2}
            opacity={0.8}
          />
        )}
      </svg>
    </div>
  )
}