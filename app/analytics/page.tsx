"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import axios from "axios"

export default function AnalyticsPage() {
  const [crowdLoading, setCrowdLoading] = useState(false)
  const [entryLoading, setEntryLoading] = useState(false)
  const [crowdVideoId, setCrowdVideoId] = useState<string | null>(null)
  const [entryVideoId, setEntryVideoId] = useState<string | null>(null)
  const crowdFileRef = useRef<HTMLInputElement>(null)
  const entryFileRef = useRef<HTMLInputElement>(null)

  const handleCrowdUpload = async () => {
    const file = crowdFileRef.current?.files?.[0]
    if (!file) {
      alert("Please select a video")
      return
    }

    setCrowdLoading(true)
    const form = new FormData()
    form.append("file", file)

    try {
        const res = await axios.post("http://172.16.5.48:8000/upload-crowd-video", form)
        const data = res.data
        // console.log(data.video_id)
        setCrowdVideoId(data.video_id)
    } catch (error) {
      console.error("Crowd upload error:", error)
      alert("Upload failed")
    } finally {
      setCrowdLoading(false)
    }
  }

  const handleEntryUpload = async () => {
    const file = entryFileRef.current?.files?.[0]
    if (!file) {
      alert("Please select a video")
      return
    }

    setEntryLoading(true)
    const form = new FormData()
    form.append("file", file)

    try {
      const res = await fetch("http://172.16.5.48:8000/upload-entry-video", {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      setEntryVideoId(data.video_id)
    } catch (error) {
      console.error("Entry upload error:", error)
      alert("Upload failed")
    } finally {
      setEntryLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-slate-900">AI Video Analytics Dashboard</h1>

        {/* Crowd Counting Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
            <span>👥</span> Crowd Counting
          </h2>

          <div className="flex gap-3 mb-6">
            <input
              ref={crowdFileRef}
              type="file"
              accept="video/*"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
            <button
              onClick={handleCrowdUpload}
              disabled={crowdLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-400 transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              {crowdLoading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Video iframe */}
          <div className="bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            {crowdVideoId ? (
              <iframe
                src={`http://172.16.5.48:8000/crowd-stream/${crowdVideoId}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-slate-400">Video will appear here after upload</p>
              </div>
            )}
          </div>
        </div>

        {/* Entry Counting Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
            <span>🚪</span> Entry Counting
          </h2>

          <div className="flex gap-3 mb-6">
            <input
              ref={entryFileRef}
              type="file"
              accept="video/*"
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
            <button
              onClick={handleEntryUpload}
              disabled={entryLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-400 transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              {entryLoading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Video iframe */}
          <div className="bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            {entryVideoId ? (
              <iframe
                src={`http://172.16.5.48:8000/entry-stream/${entryVideoId}?t=${Date.now()}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-slate-400">Video will appear here after upload</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
