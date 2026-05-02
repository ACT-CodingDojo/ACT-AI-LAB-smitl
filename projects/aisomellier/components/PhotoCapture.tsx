'use client'

import React, { useRef, useState } from 'react'
import { Card, CardBody, Button } from '@/components'

interface PhotoCaptureProps {
  onPhotoCapture: (file: File, preview: string) => void
  onError: (error: string) => void
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  onPhotoCapture,
  onError,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      onError(
        'Unable to access camera. Please check permissions or use photo upload instead.'
      )
      setIsCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setIsCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)

        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
            const reader = new FileReader()
            reader.onload = (e) => {
              const dataUrl = e.target?.result as string
              setPreview(dataUrl)
              onPhotoCapture(file, dataUrl)
              stopCamera()
            }
            reader.readAsDataURL(file)
          }
        }, 'image/jpeg')
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        onError('Invalid file type. Please use JPEG, PNG, or WebP.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        onError('File size too large. Maximum 5MB.')
        return
      }

      const reader = new FileReader()
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string
        setPreview(dataUrl)
        onPhotoCapture(file, dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const retake = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (preview) {
    return (
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Photo Preview</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Captured food"
            className="w-full rounded-lg mb-4 max-h-96 object-cover"
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={retake} className="flex-1">
              Retake
            </Button>
            <Button disabled className="flex-1">
              Use This Photo ✓
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        {isCameraActive ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Frame Your Dish</h3>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg mb-4 bg-black"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={stopCamera}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={capturePhoto} className="flex-1">
                📸 Capture
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Upload a Food Photo</h3>
            <p className="text-gray-600 mb-6">
              Take a photo with your camera or upload from your gallery
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={startCamera} fullWidth>
                📷 Open Camera
              </Button>
              <Button variant="secondary" fullWidth>
                <label htmlFor="file-upload" className="cursor-pointer w-full">
                  📁 Choose from Gallery
                </label>
              </Button>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}
