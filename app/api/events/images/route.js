import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) {
        return NextResponse.json({ error: 'Folder name required' }, { status: 400 });
    }

    // Ensure we only access public/events to prevent traversal (basic sanitization)
    const safeFolder = folder.replace(/[^a-zA-Z0-9\-_]/g, '');
    const directoryPath = path.join(process.cwd(), 'public', 'events', safeFolder);

    try {
        if (!fs.existsSync(directoryPath)) {
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(directoryPath);
        const images = files.filter(file => 
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        ).map(file => `/events/${safeFolder}/${file}`);

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error reading event images:', error);
        return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
    }
}
