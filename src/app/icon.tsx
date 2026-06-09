import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          borderRadius: 3,
        }}
      >
        <span
          style={{
            color: '#f5f5f0',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          DR
        </span>
      </div>
    ),
    { ...size }
  )
}
