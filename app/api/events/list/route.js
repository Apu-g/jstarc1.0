import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const eventsDir = path.join(process.cwd(), 'public', 'events');

    try {
        if (!fs.existsSync(eventsDir)) {
            return NextResponse.json({ events: [] });
        }

        const folders = fs.readdirSync(eventsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        const events = folders.map((folder, index) => {
            const folderPath = path.join(eventsDir, folder);
            let image = "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=800&auto=format&fit=crop";
            
            try {
                const files = fs.readdirSync(folderPath);
                const imageFile = files.find(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
                if (imageFile) {
                    image = `/events/${folder}/${imageFile}`;
                }
            } catch (e) {
                console.error(`Error reading folder ${folder}:`, e);
            }

            // Generate title from folder name
            const title = folder
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            // Extract year
            const yearMatch = folder.match(/\d{4}/);
            const date = yearMatch ? `Year ${yearMatch[0]}` : "Recent Event";

            return {
                id: `auto-${index}-${folder}`,
                title: title,
                date: date,
                location: "JStarc Event",
                category: "Gallery",
                image: image,
                folder: folder
            };
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error listing events:', error);
        return NextResponse.json({ error: 'Failed to list events' }, { status: 500 });
    }
}
