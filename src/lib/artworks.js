import { supabase } from './supabase'

export async function fetchArtworks({ tag, search } = {}) {
  let query = supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,artist.ilike.%${search}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('Fetch hatası:', error.message)
    return []
  }
  return data
}

export async function fetchArtworkBySlug(slug) {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Slug hatası:', error.message)
    return null
  }
  return data
}