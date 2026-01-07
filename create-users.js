// Configuración
const API_URL = 'https://api.sailormentor.com/'; // Ajusta la URL según tu API
const DEFAULT_PASSWORD = 'abc123'; // Contraseña manual (máximo 8 caracteres)

// Función para generar contraseña aleatoria
function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  const length = Math.floor(Math.random() * 3) + 6; // Entre 6 y 8 caracteres
  
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
}

// Función para registrar un usuario
async function registerUser(email, nombre, manualPassword = null) {
  try {
    const password = manualPassword || DEFAULT_PASSWORD || generatePassword();
    
    console.log('\n--- Registrando usuario ---');
    console.log('Email:', email);
    console.log('Nombre:', nombre);
    console.log('Password:', password);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        nombre,
        password
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('✓ Usuario registrado exitosamente');
    console.log('Respuesta:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('✗ Error al registrar usuario:');
    console.error('Error:', error.message);
    return { success: false, error: error.message };
  }
}

// Función para registrar múltiples usuarios
async function registerMultipleUsers(users) {
  console.log(`\n🚀 Iniciando registro de ${users.length} usuario(s)...\n`);
  
  const results = [];
  
  for (const user of users) {
    const result = await registerUser(user.email, user.nombre, user.password);
    results.push({ ...user, ...result });
    
    // Espera 500ms entre cada registro para evitar saturar la API
    if (users.indexOf(user) < users.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Resumen final
  console.log('\n=== RESUMEN ===');
  console.log(`Total: ${results.length}`);
  console.log(`Exitosos: ${results.filter(r => r.success).length}`);
  console.log(`Fallidos: ${results.filter(r => !r.success).length}`);
  
  return results;
}

// Lista de usuarios a registrar
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
  }
];

// Ejecutar el registro
registerMultipleUsers(users);
