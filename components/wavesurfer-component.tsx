"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AudioData {
  duration: number
  sampleRate: number
  peaks: number[]
  metadata: {
    title: string
    speaker: string
    emotion: string
    topics: string[]
    sentiment: string
  }
}

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
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const animationRef = useRef<number>()

  // Load audio data from JSON files or generate deterministic waveform
  useEffect(() => {
    const loadAudioData = async () => {
      // Map audio URLs to JSON data files
      const audioDataMap: { [key: string]: string } = {
        '/placeholder.mp3': '/audio/sarah-coffee-recommendation.json',
      }

      // Try to determine which JSON file to load based on context
      let jsonUrl = audioDataMap[audioUrl]
      
      // If no specific mapping, try to infer from URL or generate deterministic data
      if (!jsonUrl) {
        if (audioUrl.includes('placeholder')) {
          // Generate deterministic waveform based on audioUrl
          const generateWaveform = (url: string) => {
            const data = []
            for (let i = 0; i < 200; i++) {
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
          onDurationChange(180) // 3 minutes default
          setIsLoading(false)
          onLoadingChange(false)
          return
        }
      }

      // Try to load JSON data
      if (jsonUrl) {
        try {
          const response = await fetch(jsonUrl)
          if (response.ok) {
            const data: AudioData = await response.json()
            setAudioData(data)
            setWaveformData(data.peaks)
            onDurationChange(data.duration)
            setIsLoading(false)
            onLoadingChange(false)
            return
          }
        } catch (error) {
          console.warn('Failed to load audio data:', error)
        }
      }

      // Fallback to deterministic generation
      const generateWaveform = (url: string) => {
        const data = []
        for (let i = 0; i < 200; i++) {
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
      onDurationChange(180)
      setIsLoading(false)
      onLoadingChange(false)
    }

    loadAudioData()
  }, [audioUrl, onDurationChange, onLoadingChange])

  // Initialize WaveSurfer only on client
  useEffect(() => {
    if (waveformData.length === 0) return

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

        // Load with our waveform data
        ws.load('', waveformData)

        // Event listeners
        ws.on('ready', () => {
          // WaveSurfer is ready
        })

        ws.on('audioprocess', () => {
          const time = ws.getCurrentTime()
          setCurrentTime(time)
          onTimeUpdate(time)
        })

        ws.on('seek', (progress: number) => {
          const time = progress * (audioData?.duration || 180)
          setCurrentTime(time)
          onTimeUpdate(time)
        })

        ws.on('finish', () => {
          setCurrentTime(0)
          onTimeUpdate(0)
        })

        ws.on('error', (error: any) => {
          console.warn('WaveSurfer error:', error)
        })

        setWavesurfer(ws)

        return () => {
          if (ws) {
            ws.destroy()
          }
        }
      } catch (error) {
        console.warn('Failed to load WaveSurfer:', error)
      }
    }

    initWaveSurfer()
  }, [waveformData, height, audioData, onTimeUpdate])

  // Simulate audio playback for placeholder files
  useEffect(() => {
    if (!isPlaying || !audioData) return

    const duration = audioData.duration
    const startTime = Date.now()
    const initialTime = currentTime

    const updateTime = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const newTime = initialTime + elapsed
      
      if (newTime >= duration) {
        setCurrentTime(0)
        onTimeUpdate(0)
        return
      }
      
      setCurrentTime(newTime)
      onTimeUpdate(newTime)
      animationRef.current = requestAnimationFrame(updateTime)
    }

    animationRef.current = requestAnimationFrame(updateTime)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, audioData, currentTime, onTimeUpdate])

  // Handle play/pause
  useEffect(() => {
    if (!wavesurfer) return

    if (isPlaying) {
      // For placeholder files, we'll simulate playback
      if (audioUrl.includes('placeholder')) {
        // Simulation is handled above
        return
      }
      wavesurfer.play()
    } else {
      if (audioUrl.includes('placeholder')) {
        // Simulation is handled above
        return
      }
      wavesurfer.pause()
    }
  }, [wavesurfer, isPlaying, audioUrl])

  // Enhanced fallback canvas waveform
  const renderFallbackWaveform = () => {
    const progress = audioData ? currentTime / audioData.duration : 0

    return (
      <div className="w-full flex items-end justify-center gap-0.5" style={{ height: `${height}px` }}>
        {waveformData.slice(0, 100).map((amplitude, index) => {
          const barProgress = index / 100
          const isPlayed = barProgress <= progress

          return (
            <div
              key={index}
              className={cn(
                "rounded-sm transition-all duration-200",
                isPlayed 
                  ? "bg-gradient-to-t from-accent-blue to-accent-lavender opacity-80" 
                  : "bg-gradient-to-t from-accent-blue to-accent-lavender opacity-30"
              )}
              style={{
                height: `${amplitude * height * 0.8}px`,
                width: '2px',
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="w-full relative">
      <div 
        ref={waveformRef} 
        className="w-full cursor-pointer transition-all duration-200 hover:opacity-80"
        style={{ height: `${height}px` }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const progress = clickX / rect.width
          const duration = audioData?.duration || 180
          const newTime = progress * duration
          
          setCurrentTime(newTime)
          onTimeUpdate(newTime)
          
          if (wavesurfer) {
            wavesurfer.seekTo(progress)
          }
        }}
      />
      
      {/* Enhanced fallback waveform when WaveSurfer is not available */}
      {!wavesurfer && !isLoading && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const progress = clickX / rect.width
            const duration = audioData?.duration || 180
            const newTime = progress * duration
            
            setCurrentTime(newTime)
            onTimeUpdate(newTime)
          }}
        >
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