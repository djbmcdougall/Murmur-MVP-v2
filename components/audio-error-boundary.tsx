"use client"

import React from 'react'

interface AudioErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface AudioErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class AudioErrorBoundary extends React.Component<AudioErrorBoundaryProps, AudioErrorBoundaryState> {
  constructor(props: AudioErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AudioErrorBoundaryState {
    // Check if this is an audio-related error
    const isAudioError = error.message.includes('no supported sources') || 
                        error.message.includes('MediaError') ||
                        error.message.includes('audio')
    
    if (isAudioError) {
      console.warn('Audio error caught by boundary:', error.message)
      return { hasError: true, error }
    }
    
    // If it's not an audio error, re-throw it
    throw error
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log audio errors but don't crash the app
    console.warn('Audio component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent-blue to-accent-lavender flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.8l3.583-2.824a1 1 0 011.6-.176z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-10 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Audio preview not available</span>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}