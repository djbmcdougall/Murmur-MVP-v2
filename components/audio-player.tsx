"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Dynamic import for WaveSurfer to avoid SSR issues
let WaveSurfer: any = null
if (typeof window !== "undefined") {
  import("wavesurfer.js").then((module) => {
    WaveSurfer = module.default
  })
}

interface AudioPlayerProps {
  audioUrl: string
  waveformHeight?: number
  showVolumeControl?: boolean
  showDuration?: boolean
  className?: string
}

export default function AudioPlayer({ 
  audioUrl, 
  waveformHeight = 44, 
  showVolumeControl = true, 
  showDuration = true,
  className 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  
  const waveformRef = useRef<HTMLDivElement>(null)
  const fallbackAudioRef = useRef<HTMLAudioElement>(null)

  // Initialize WaveSurfer
  useEffect(() => {
    if (!WaveSurfer || !waveformRef.current || !audioUrl) return

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgba(123, 145, 201, 0.3)',
      progressColor: 'rgba(123, 145, 201, 0.8)',
      cursorColor: 'rgba(123, 145, 201, 1)',
      barWidth: 2,
      barRadius: 1,
      height: waveformHeight,
      normalize: true,
      backend: 'WebAudio',
      responsive: true,
      interact: true,
    })

    // Load audio with fallback for placeholder
    if (audioUrl.includes('placeholder')) {
      // Generate a realistic waveform pattern for placeholder
      const peaks = Array.from({ length: 800 }, (_, i) => {
        const base = Math.sin(i / 50) * 0.5
        const noise = (Math.random() - 0.5) * 0.3
        const decay = 1 - (i / 800) * 0.2
        return (base + noise) * decay
      })
      
      ws.load('', peaks)
      setDuration(180) // 3 minutes placeholder
      setIsLoading(false)
    } else {
      ws.load(audioUrl)
    }

    // Event listeners
    ws.on('ready', () => {
      setDuration(ws.getDuration())
      setIsLoading(false)
    })

    ws.on('audioprocess', () => {
      setCurrentTime(ws.getCurrentTime())
    })

    ws.on('finish', () => {
      setIsPlaying(false)
    })

    setWavesurfer(ws)

    return () => {
      if (ws) {
        ws.destroy()
      }
    }
  }, [audioUrl, waveformHeight])

  // Fallback audio element for cases where WaveSurfer fails
  useEffect(() => {
    if (!audioUrl || audioUrl.includes('placeholder')) return

    const audio = fallbackAudioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const handlePlayPause = useCallback(() => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.pause()
      } else {
        wavesurfer.play()
      }
      setIsPlaying(!isPlaying)
    } else if (fallbackAudioRef.current) {
      // Fallback for placeholder audio
      if (isPlaying) {
        fallbackAudioRef.current.pause()
      } else {
        fallbackAudioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [wavesurfer, isPlaying])

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    
    if (wavesurfer) {
      wavesurfer.setVolume(newVolume)
    }
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.volume = newVolume
    }
  }, [wavesurfer])

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    
    if (wavesurfer) {
      wavesurfer.setVolume(newMuted ? 0 : volume)
    }
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.volume = newMuted ? 0 : volume
    }
  }, [wavesurfer, isMuted, volume])

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Hidden fallback audio element */}
      <audio ref={fallbackAudioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          onClick={handlePlayPause}
          size="icon"
          className="relative h-12 w-12 rounded-full bg-gradient-to-r from-accent-blue to-accent-lavender hover:from-accent-blue/90 hover:to-accent-lavender/90 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          disabled={isLoading}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Waveform Container */}
        <div className="flex-1 relative">
          <div 
            ref={waveformRef} 
            className="w-full cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ height: `${waveformHeight}px` }}
          />
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          )}
        </div>

        {/* Volume Control */}
        {showVolumeControl && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleMute}
              className="h-8 w-8 text-muted-foreground hover:text-accent"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.1}
              className="w-16"
              aria-label="Volume control"
            />
          </div>
        )}
      </div>

      {/* Time Display */}
      {showDuration && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}
    </div>
  )
}
