# Crear Usuarios en SailorMentor

Script para registrar uno o múltiples usuarios en una API mediante HTTP POST.

## Descripción

Este script de Node.js permite registrar usuarios en una API REST enviando solicitudes POST con email, nombre y contraseña. Soporta contraseñas manuales, predeterminadas o generadas automáticamente. Puede procesar múltiples usuarios en una sola ejecución.

## Requisitos

- **Node.js v20 o superior** (incluye `fetch` nativo)
- Descarga Node.js v20: [https://nodejs.org/en/download](https://nodejs.org/en/download)

### Verificar versión de Node.js

```sh
node --version
```

Debe mostrar v20.x.x o superior.

## Instalación

**No requiere dependencias externas** - Este script usa `fetch` nativo de Node.js 20+.

## Configuración

Edita las siguientes constantes en [create-users.js](create-users.js):

- `API_URL`: URL del endpoint de registro (por defecto: `https://api.sailormentor.com/`)
- `DEFAULT_PASSWORD`: Contraseña predeterminada (por defecto: `abc123`)

## Uso

### Registrar múltiples usuarios

1. Edita el array `users` al final del archivo con los datos de los usuarios:

```javascript
const users = [
  {
    email: 'usuario1@example.com',
    nombre: 'Juan Perez',
    password: '' // Deja vacío para usar DEFAULT_PASSWORD
  },
  {
    email: 'usuario2@example.com',
    nombre: 'Maria Garcia',
    password: 'custom123' // O especifica una contraseña personalizada
  },
  {
    email: 'usuario3@example.com',
    nombre: 'Pedro Lopez',
    password: '' // Deja vacío para usar DEFAULT_PASSWORD
  }
];
```

2. Ejecuta el script:

```sh
node create-users.js
```

## Funcionalidades

### Generación de Contraseñas

El script ofrece tres opciones para la contraseña de cada usuario:

1. **Manual**: Proporciona una contraseña en el campo `password` del usuario
2. **Predeterminada**: Usa `DEFAULT_PASSWORD` si el campo `password` está vacío
3. **Automática**: Genera una contraseña aleatoria de 6-8 caracteres (letras minúsculas y números)

### Función `registerUser`

```javascript
registerUser(email, nombre, manualPassword)
```

**Parámetros:**
- `email` (string): Email del usuario
- `nombre` (string): Nombre completo del usuario
- `manualPassword` (string, opcional): Contraseña personalizada

**Retorna:**
- Objeto con `success` (boolean) y `data` o `error`

### Función `registerMultipleUsers`

```javascript
registerMultipleUsers(users)
```

**Parámetros:**
- `users` (array): Array de objetos con `email`, `nombre` y `password` (opcional)

**Características:**
- Procesa usuarios secuencialmente
- Delay de 500ms entre cada registro para evitar saturar la API
- Muestra resumen final con estadísticas de éxito/fallo

### Función `generatePassword`

Genera contraseñas aleatorias de 6-8 caracteres usando letras minúsculas (a-z) y números (0-9).

## Ejemplo de Salida

```
🚀 Iniciando registro de 3 usuario(s)...

--- Registrando usuario ---
Email: usuario1@example.com
Nombre: Juan Perez
Password: abc123
✓ Usuario registrado exitosamente
Respuesta: { id: 123, email: 'usuario1@example.com', ... }

--- Registrando usuario ---
Email: usuario2@example.com
Nombre: Maria Garcia
Password: custom123
✓ Usuario registrado exitosamente
Respuesta: { id: 124, email: 'usuario2@example.com', ... }

--- Registrando usuario ---
Email: usuario3@example.com
Nombre: Pedro Lopez
Password: abc123
✓ Usuario registrado exitosamente
Respuesta: { id: 125, email: 'usuario3@example.com', ... }

=== RESUMEN ===
Total: 3
Exitosos: 3
Fallidos: 0
```

