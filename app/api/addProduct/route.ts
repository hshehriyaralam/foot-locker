// import { createClient } from '@/utils/supabase/server'
// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const supabase = await createClient()
  
//   // Parse the incoming JSON body
//   const { name, description, price } = await request.json()

//   // Insert into the 'products' table
//   const { data, error } = await supabase
//     .from('products')
//     .insert([{ name, description, price }])
//     .select()

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 })
//   }

//   return NextResponse.json({ data }, { status: 201 })
// }