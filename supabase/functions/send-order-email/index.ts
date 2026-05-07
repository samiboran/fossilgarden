import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  const { order } = await req.json()

  const itemsHtml = order.items.map((i: any) =>
    `<tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.artwork?.title || '—'} — ${i.size}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">x${i.qty}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₺${(i.price * i.qty).toLocaleString('tr-TR')}</td>
    </tr>`
  ).join('')

  // Müşteriye mail (e-posta varsa)
  if (order.email) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'Fossil Garden <onboarding@resend.dev>',
        to: order.email,
        subject: 'Siparişiniz Alındı — Fossil Garden',
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#111">
            <h1 style="font-size:24px;font-weight:300;border-bottom:1px solid #eee;padding-bottom:16px">Fossil Garden</h1>
            <p>Merhaba ${order.name},</p>
            <p>Siparişiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding:12px 8px;font-weight:bold">Toplam</td>
                <td style="padding:12px 8px;text-align:right;font-weight:bold">₺${Number(order.total).toLocaleString('tr-TR')}</td>
              </tr>
            </table>
            <p style="color:#666;font-size:14px">Teslimat adresi: ${order.address}</p>
            <p style="color:#666;font-size:14px">Telefon: ${order.phone}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
            <p style="color:#999;font-size:12px">Fossil Garden · Fine Art Print Studio · İstanbul</p>
          </div>
        `
      })
    })
  }

  // Sana bildirim maili
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: 'Fossil Garden <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🛍 Yeni Sipariş: ${order.name} — ₺${order.total}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#111">
          <h2 style="font-weight:300">Yeni Sipariş Geldi</h2>
          <p><strong>Ad:</strong> ${order.name}</p>
          <p><strong>E-posta:</strong> ${order.email || '—'}</p>
          <p><strong>Telefon:</strong> ${order.phone}</p>
          <p><strong>Adres:</strong> ${order.address}</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding:12px 8px;font-weight:bold">Toplam</td>
              <td style="padding:12px 8px;text-align:right;font-weight:bold">₺${Number(order.total).toLocaleString('tr-TR')}</td>
            </tr>
          </table>
        </div>
      `
    })
  })

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
})