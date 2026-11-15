export function ArchClipDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* 3:4 Gothic Lancet Clip — exact Pythagorean 11–60–61 circular tangent arc (rx=0.61, ry=0.4575) */}
        <clipPath id="monolith-lancet-3x4" clipPathUnits="objectBoundingBox">
          <path d="M 0 1 L 0 0.45 A 0.61 0.4575 0 0 1 0.5 0 A 0.61 0.4575 0 0 1 1 0.45 L 1 1 Z" />
        </clipPath>

        {/* 2:3 Tall Gothic Lancet Clip — exact Pythagorean 11–60–61 circular tangent arc (rx=0.61, ry=0.4067) */}
        <clipPath id="monolith-lancet-2x3" clipPathUnits="objectBoundingBox">
          <path d="M 0 1 L 0 0.40 A 0.61 0.4067 0 0 1 0.5 0 A 0.61 0.4067 0 0 1 1 0.40 L 1 1 Z" />
        </clipPath>

        {/* 3:4 Monumental / Romanesque Semicircular Barrel Arch (rx=0.500, ry=0.375) */}
        <clipPath id="monolith-romanesque-3x4" clipPathUnits="objectBoundingBox">
          <path d="M 0 1 L 0 0.375 A 0.500 0.375 0 0 1 1 0.375 L 1 1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
