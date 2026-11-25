// Hotel photos in this guide are destination photos, not pictures of the property itself.
// The caption says so, and hotels without a matching city photo get a neutral placeholder.
export default function HotelImage({ hotel, className, style, caption = true }) {
  if (!hotel.image) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          background: 'linear-gradient(135deg, #3a1f0d 0%, #7a4a1e 55%, #c9973a 100%)',
          color: 'rgba(255,255,255,0.92)', textAlign: 'center', minHeight: 200,
        }}
        role="img"
        aria-label={`${hotel.name}, ${hotel.city}`}
      >
        <div style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>🏨</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700 }}>{hotel.city}</div>
      </div>
    )
  }
  return (
    <>
      <img src={hotel.image} alt={`${hotel.city} — destination photo`} className={className} style={style} loading="lazy" />
      {caption && (
        <span style={{ position: 'absolute', top: 52, right: 12, fontSize: '0.62rem', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.45)', padding: '0.1rem 0.45rem', borderRadius: 6, zIndex: 4, pointerEvents: 'none' }}>
          Photo: {hotel.city}
        </span>
      )}
    </>
  )
}
