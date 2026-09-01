import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'public/images/Fotos');
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(dirPath);
    const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
