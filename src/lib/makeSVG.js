export function makeSVG(id) {
  const w = 400, h = 500
  const palettes = [
    { bg: '#f0ece4', lines: '#c8b89a', accent: '#9a8060', dots: '#d4c4a8' },
    { bg: '#f5f5f5', lines: '#d0d0d0', accent: '#aaaaaa', dots: '#e0e0e0' },
    { bg: '#ece8e0', lines: '#b8a88a', accent: '#7a6a55', dots: '#cfc0a8' },
    { bg: '#eff0f2', lines: '#c0c8d0', accent: '#8898a8', dots: '#d4dce4' },
    { bg: '#f2ede4', lines: '#c4b090', accent: '#907850', dots: '#d8c8a8' },
    { bg: '#eff2ec', lines: '#b8cca8', accent: '#7a9868', dots: '#d0dcc4' },
    { bg: '#f2ece8', lines: '#d0b0a0', accent: '#a07868', dots: '#e0c8b8' },
    { bg: '#f4f4f4', lines: '#b0b0b0', accent: '#606060', dots: '#d4d4d4' },
    { bg: '#eff0eb', lines: '#b8bca8', accent: '#7a8068', dots: '#d0d4c4' },
    { bg: '#f0ebe0', lines: '#c0aa88', accent: '#887060', dots: '#d8c8b0' },
    { bg: '#f0eef4', lines: '#c0b8d4', accent: '#887898', dots: '#d8d0e8' },
    { bg: '#f4f0e4', lines: '#c8b888', accent: '#907838', dots: '#e0d0a4' },
  ]
  const p = palettes[id % palettes.length]
  const seed = id * 137.5
  const r = (n) => ((seed * (n + 1) * 9301 + 49297) % 233280) / 233280

  const patterns = [
    () => {
      let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
        <rect width="${w}" height="${h}" fill="${p.bg}"/>`
      for (let i = 0; i < 8; i++) {
        const x = 40 + r(i) * 320, y1 = h * 0.6 + r(i + 1) * 60, y2 = 20 + r(i + 2) * 80
        s += `<line x1="${x}" y1="${y1}" x2="${x + r(i + 3) * 40 - 20}" y2="${y2}" stroke="${p.lines}" stroke-width="${0.5 + r(i + 4) * 1.5}" opacity="0.7"/>`
        for (let j = 0; j < 4; j++) {
          const lx = x + (r(j) * 20 - 10), ly = y2 + (y1 - y2) * j / 4 + r(j + 1) * 15
          const lw = 8 + r(j + 2) * 18, lh = 4 + r(j + 3) * 8
          s += `<ellipse cx="${lx}" cy="${ly}" rx="${lw}" ry="${lh}" fill="${p.dots}" stroke="${p.accent}" stroke-width="0.4" opacity="0.55" transform="rotate(${r(j + 4) * 60 - 30} ${lx} ${ly})"/>`
        }
      }
      s += `</svg>`
      return s
    },
    () => {
      let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
        <rect width="${w}" height="${h}" fill="${p.bg}"/>`
      const cols = 5, rows = 6
      for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
        const x = c * (w / cols) + r(c * rows + rr) * 8
        const y = rr * (h / rows) + r(c + rr * 10) * 6
        const sw = w / cols * 0.55 + r(c + rr) * w / cols * 0.3
        const sh = h / rows * 0.55 + r(c * 2 + rr) * h / rows * 0.3
        const op = 0.08 + r(c + rr * 3) * 0.18
        s += `<rect x="${x}" y="${y}" width="${sw}" height="${sh}" fill="${p.accent}" opacity="${op}" rx="${r(c * rr + 1) * 3}"/>`
      }
      s += `<circle cx="${w / 2}" cy="${h / 2}" r="${60 + r(1) * 40}" fill="none" stroke="${p.lines}" stroke-width="0.6" opacity="0.4"/>`
      s += `</svg>`
      return s
    },
    () => {
      let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
        <rect width="${w}" height="${h}" fill="${p.bg}"/>`
      for (let i = 0; i < 120; i++) {
        const x = r(i) * w, y = r(i + 1) * h
        const rad = 0.8 + r(i + 2) * 5
        const op = 0.1 + r(i + 3) * 0.4
        s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${i % 3 === 0 ? p.accent : p.lines}" opacity="${op}"/>`
      }
      s += `<line x1="40" y1="${h * 0.62}" x2="${w - 40}" y2="${h * 0.62}" stroke="${p.lines}" stroke-width="0.5" opacity="0.5"/>`
      s += `</svg>`
      return s
    },
    () => {
      let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
        <rect width="${w}" height="${h}" fill="${p.bg}"/>`
      const horizon = h * 0.45 + r(1) * h * 0.15
      s += `<rect width="${w}" height="${horizon}" fill="${p.dots}" opacity="0.3"/>`
      let path = `M0,${horizon}`
      for (let x = 0; x <= w; x += 20) path += ` Q${x + 10},${horizon + r(x) * 20 - 10} ${x + 20},${horizon + r(x + 1) * 8 - 4}`
      s += `<path d="${path} L${w},${h} L0,${h} Z" fill="${p.lines}" opacity="0.25"/>`
      s += `<circle cx="${80 + r(5) * 240}" cy="${horizon - 40 - r(6) * 60}" r="${12 + r(7) * 15}" fill="${p.accent}" opacity="0.35"/>`
      for (let i = 0; i < 5; i++) {
        const tx = 30 + r(i + 10) * 340, ty = horizon + 4
        s += `<line x1="${tx}" y1="${ty}" x2="${tx + r(i + 11) * 6 - 3}" y2="${ty - (20 + r(i + 12) * 60)}" stroke="${p.accent}" stroke-width="${0.6 + r(i) * 0.8}" opacity="0.55"/>`
      }
      s += `</svg>`
      return s
    },
  ]

  return patterns[id % patterns.length]()
}