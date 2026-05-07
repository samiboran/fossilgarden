# Fossil Garden — Claude için Proje Notu

## Proje Nedir?
Türkiye'de sanatçı ürünleri satan fine art e-ticaret sitesi.
Hahnemühle fine art baskı ve orijinal eserler satılıyor.

## Canlı Site
https://samiboran.github.io/fossilgarden/

## GitHub
https://github.com/samiboran/fossilgarden

## Stack
- React + Vite
- react-router-dom (sayfa yönlendirme)
- @supabase/supabase-js (henüz bağlanmadı)
- gh-pages (deploy)

## Klasör Yapısı
```
src/
  components/
    Navbar.jsx        → Üst menü, arama kutusu
    ArtCard.jsx       → Galeri kartı
  pages/
    Gallery.jsx       → Ana sayfa, arama + filtre + grid
    ProductDetail.jsx → Ürün detay sayfası
  lib/
    artworks.js       → Şimdilik hardcoded ürün verisi
    makeSVG.js        → Placeholder SVG görseller
    supabase.js       → Supabase client
  styles/
    global.css        → CSS variables, font, reset
```
## Deploy
```bash
npm run deploy
```
Bu komut build alır ve gh-pages branch'ine push eder.
GitHub Pages gh-pages branch'inden yayınlıyor.

## Yapılanlar ✅
- React + Vite kurulumu
- Galeri sayfası (arama + tag filtre + grid)
- Ürün detay sayfası (boyut seçici, accordion, etiketler)
- GitHub Pages'e deploy
- Placeholder SVG görseller (her ürün için benzersiz)

## Yapılacaklar 🔲
- [ ] Footer (telif, iletişim, sosyal medya)
- [ ] Mobil menü
- [ ] Favoriler sayfası
- [ ] 404 sayfası
- [ ] Sepet sidebar
- [ ] Supabase bağlantısı (ürün tablosu, görsel upload)
- [ ] Auth (kayıt / giriş)
- [ ] Satın alım akışı
- [ ] Otomatik mail (Resend)
- [ ] Özel admin panel

## Tasarım Kararları
- Renk: Beyaz (#ffffff) zemin, gold (#9a7a4a) vurgu, ink (#111010) metin
- Font: Cormorant Garamond (serif başlık) + DM Sans (body)
- Kenar boşluğu: 2rem sol/sağ
- Grid: auto-fill minmax(260px, 1fr)
- Stil: Minimal galeri estetiği, Artfinder benzeri

## Önemli Notlar
- vite.config.js'de base: '/fossilgarden/' var — kaldırma!
- main.jsx'de BrowserRouter basename="/fossilgarden" var — kaldırma!
- artworks.js şimdilik Türkçe karakter sorunu olabilir, Supabase'e geçince düzelir
- node_modules, *.exe, *.msi .gitignore'da