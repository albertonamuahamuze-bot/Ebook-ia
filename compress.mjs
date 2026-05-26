import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const dirs = ['public', 'public/avatars'];

for(const dir of dirs){
  let files;
  try{ files = readdirSync(dir) }catch{ continue }

  for(const file of files){
    const ext = extname(file).toLowerCase();
    if(!['.png','.jpg','.jpeg'].includes(ext)) continue;

    const input  = join(dir, file);
    const output = join(dir, basename(file, ext) + '.webp');

    const stat = statSync(input);
    console.log(`A comprimir: ${input} (${Math.round(stat.size/1024)}kb)`);

    await sharp(input)
      .webp({ quality: 82 })
      .toFile(output);

    const statOut = statSync(output);
    console.log(`✓ ${output} → ${Math.round(statOut.size/1024)}kb`);
  }
}
console.log('Concluído.');
