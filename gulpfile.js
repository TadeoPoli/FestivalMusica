import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { glob } from 'glob';
import { dest, series, src, watch } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import sharp from 'sharp';

const sass = gulpSass(dartSass);
const sourceImages = 'src/img/**/*.{jpg,jpeg,png}';
const sourceImagesWithoutThumbnails = [
    sourceImages,
    '!src/img/gallery/thumb/**/*.{jpg,jpeg,png}'
];

// Minifica el JavaScript que utiliza el sitio.
export function js() {
    return src('src/js/app.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('build/js', { sourcemaps: '.' }));
}

// Compila SCSS y genera su mapa de fuentes para desarrollo.
export function css() {
    return src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(dest('build/css', { sourcemaps: '.' }));
}

// Genera miniaturas JPEG desde las imágenes completas de la galería.
export async function crop() {
    const inputFolder = 'src/img/gallery/full';
    const outputFolder = 'src/img/gallery/thumb';
    const images = await glob(`${inputFolder}/*.{jpg,jpeg,png}`);

    await mkdir(outputFolder, { recursive: true });

    await Promise.all(images.map(async (file) => {
        const fileName = `${path.basename(file, path.extname(file))}.jpg`;

        await sharp(file)
            .resize(250, 180, { fit: 'cover', position: 'centre' })
            .jpeg({ quality: 80 })
            .toFile(path.join(outputFolder, fileName));
    }));
}

// Convierte cada imagen fuente a JPEG, WebP y AVIF para servirla en el sitio.
export async function images() {
    const files = await glob(sourceImages);

    await Promise.all(files.map(processImage));
}

async function processImage(file) {
    const relativePath = path.relative('src/img', path.dirname(file));
    const outputDirectory = path.join('build/img', relativePath);
    const fileName = path.basename(file, path.extname(file));
    const image = sharp(file);

    await mkdir(outputDirectory, { recursive: true });

    await Promise.all([
        image.clone().jpeg({ quality: 80 }).toFile(path.join(outputDirectory, `${fileName}.jpg`)),
        image.clone().webp({ quality: 80 }).toFile(path.join(outputDirectory, `${fileName}.webp`)),
        image.clone().avif({ quality: 60 }).toFile(path.join(outputDirectory, `${fileName}.avif`))
    ]);
}

// Mantiene los recursos actualizados durante el desarrollo local.
export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch(sourceImagesWithoutThumbnails, series(crop, images));
}

// Construcción reproducible completa para publicación o despliegue.
export const build = series(crop, js, css, images);

export default series(build, dev);
