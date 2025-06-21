"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface WaveSurferComponentProps {
  audioUrl: string
  height: number
  isPlaying: boolean
  onPlayPause: () => void
  onTimeUpdate: (time: number) => void
  onDurationChange: (duration: number) => void
  onLoadingChange: (loading: boolean) => void
}

export default function WaveSurferComponent({
  audioUrl,
  height,
  isPlaying,
  onPlayPause,
  onTimeUpdate,
  onDurationChange,
  onLoadingChange
}: WaveSurferComponentProps) {
  const waveformRef = useRef<HTMLDivElement>(null)
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [waveformData, setWaveformData] = useState<number[]>([])

  // Generate deterministic waveform data to prevent hydration issues
  useEffect(() => {
    // Create deterministic waveform based on audioUrl to avoid random numbers
    const generateWaveform = (url: string) => {
      const data = []
      for (let i = 0; i < 200; i++) {
        // Use a simple hash of the URL and index for deterministic values
        const hash = (url + i).split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0)
          return a & a
        }, 0)
        const normalized = (Math.abs(hash) % 100) / 100
        const value = Math.sin(i * 0.1) * 0.3 + normalized * 0.4 + 0.2
        data.push(Math.max(0.1, Math.min(0.9, value)))
      }
      return data
    }

    const data = generateWaveform(audioUrl)
    setWaveformData(data)
  }, [audioUrl])

  // Initialize WaveSurfer only on client
  useEffect(() => {
    const initWaveSurfer = async () => {
      try {
        const WaveSurfer = (await import("wavesurfer.js")).default
        
        if (!waveformRef.current) return

        const ws = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'rgba(123, 145, 201, 0.3)',
          progressColor: 'rgba(123, 145, 201, 0.8)',
          cursorColor: 'rgba(123, 145, 201, 1)',
          barWidth: 2,
          barRadius: 1,
          height: height,
          normalize: true,
          responsive: true,
          interact: true,
        })

        // Load audio with proper fallback
        if (audioUrl.includes('placeholder')) {
          // For placeholder, use our generated waveform data
          ws.load('', waveformData)
          onDurationChange(180) // 3 minutes placeholder
          setIsLoading(false)
          onLoadingChange(false)
        } else {
          ws.load(audioUrl)
        }

        // Event listeners
        ws.on('ready', () => {
          onDurationChange(ws.getDuration())
          setIsLoading(false)
          onLoadingChange(false)
        })

        ws.on('audioprocess', () => {
          onTimeUpdate(ws.getCurrentTime())
        })

        ws.on('finish', () => {
          // Audio finished
        })

        ws.on('error', (error: any) => {
          console.warn('WaveSurfer error:', error)
          setIsLoading(false)
          onLoadingChange(false)
        })

        setWavesurfer(ws)

        return () => {
          if (ws) {
            ws.destroy()
          }
        }
      } catch (error) {
        console.warn('Failed to load WaveSurfer:', error)
        setIsLoading(false)
        onLoadingChange(false)
      }
    }

    initWaveSurfer()
  }, [audioUrl, height, waveformData, onDurationChange, onLoadingChange, onTimeUpdate])

  // Handle play/pause
  useEffect(() => {
    if (!wavesurfer) return

    if (isPlaying) {
      wavesurfer.play()
    } else {
      wavesurfer.pause()
    }
  }, [wavesurfer, isPlaying])

  // Fallback canvas waveform for when WaveSurfer fails
  const renderFallbackWaveform = () => {
    return (
      <div className="w-full flex items-end justify-center gap-0.5" style={{ height: `${height}px` }}>
        {waveformData.slice(0, 100).map((amplitude, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-accent-blue to-accent-lavender opacity-30 rounded-sm"
            style={{
              height: `${amplitude * height * 0.8}px`,
              width: '2px',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full relative">
      <div 
        ref={waveformRef} 
        className="w-full cursor-pointer transition-all duration-200 hover:opacity-80"
        style={{ height: `${height}px` }}
        onClick={() => {
          // If WaveSurfer is not available, just toggle play
          if (!wavesurfer) {
            onPlayPause()
          }
        }}
      />
      
      {/* Fallback waveform when WaveSurfer is not available */}
      {!wavesurfer && !isLoading && (
        <div className="absolute inset-0">
          {renderFallbackWaveform()}
        </div>
      )}
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted/30 rounded-lg flex items-center justify-center">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      )}
    </div>
  )
}