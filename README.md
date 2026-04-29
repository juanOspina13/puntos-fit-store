# Puntos Fit Store

Transforma tu cuerpo y tu energía en 90 días.

Puntos Fit Store es una tienda construida con Next.js donde la propuesta principal es un sistema de suplementos inteligentes por objetivos:

- Ganar musculo
- Quemar grasa
- Dormir mejor
- Reducir estres
- Mejorar bienestar general

La oferta central vive en los packs de Paquetes cargados desde `public/data/products.json`. Tambien se mantiene el paquete personalizado por monto para usuarios que quieren total flexibilidad.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Ejecutar en local:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
npm start
```

## Rutas clave

- `/`: Home con propuesta de valor y packs destacados
- `/paquetes`: Packs por objetivo + paquete personalizado por monto
- `/products`: Catalogo de productos individuales para complementar el plan
- `/checkout`: Flujo de compra

## Fuente de datos

Toda la oferta comercial esta en:

- `public/data/products.json`

Secciones principales del JSON:

- `categories`
- `products`
- `subscriptions`
