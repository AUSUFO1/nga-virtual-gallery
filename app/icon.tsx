import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default async function Icon() {
  // Read the logo file
  const logoPath = path.join(process.cwd(), 'public/images/NGA-Logo.png')
  const logoBuffer = fs.readFileSync(logoPath)
  const logoBase64 = logoBuffer.toString('base64')
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          alt="NGA Logo"
          width="32"
          height="32"
        />
      </div>
    ),
    {
      ...size,
    }
  )
}