"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import dynamic from "next/dynamic"

// Dynamically import WaveSurfer with no SSR to prevent hydration issues
import DummyWaveform from "./dummy-waveform"

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
  const [isMounted, setIsMounted] = useState(false)
  
  // Check if this is a JSON waveform file
  const isJSONWaveform = audioUrl.includes('.json')

  // Ensure component is mounted to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
    
    // For JSON waveform files, set default duration and stop loading
    if (isJSONWaveform) {
      setDuration(180) // 3 minutes default
      setIsLoading(false)
    }
  }, [isJSONWaveform])

  const handlePlayPause = useCallback(() => {
    // For JSON waveforms, just toggle the playing state
    // The WaveSurfer component will handle the actual "playback" simulation
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }, [])

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
  }, [isMuted])

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00"
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 h-11 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
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
          <DummyWaveform
            audioUrl={audioUrl}
            height={waveformHeight}
            isPlaying={isPlaying}
            onTimeUpdate={setCurrentTime}
            onDurationChange={setDuration}
            onLoadingChange={setIsLoading}
          />
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
