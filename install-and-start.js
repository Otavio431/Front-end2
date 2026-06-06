/**
 * install-and-start.js
 * ----------------------------------------------------
 * Script que roda ANTES do servidor.
 * - Verifica se a pasta node_modules existe
 * - Se NÃO existir (ou estiver vazia), roda automaticamente "npm install"
 * - Depois inicia o server.js
 *
 * Assim, quando alguém clonar este projeto e rodar "npm start",
 * as dependências serão instaladas automaticamente na primeira vez.
 * ----------------------------------------------------
 */

const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const NODE_MODULES = path.join(ROOT, 'node_modules');

function precisaInstalar() {
  // Não existe node_modules
  if (!fs.existsSync(NODE_MODULES)) return true;
  // Existe mas está vazio
  try {
    const itens = fs.readdirSync(NODE_MODULES);
    if (itens.length === 0) return true;
  } catch (e) {
    return true;
  }
  return false;
}

function instalarDependencias() {
  console.log('\n📦  node_modules não encontrado. Instalando dependências (npm install)...\n');
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const result = spawnSync(npmCmd, ['install'], {
    stdio: 'inherit',
    cwd: ROOT,
  });

  if (result.status !== 0) {
    console.error('\n❌  Falha ao executar npm install. Encerrando.');
    process.exit(result.status || 1);
  }
  console.log('\n✅  Dependências instaladas com sucesso!\n');
}

function iniciarServidor() {
  console.log('🚀  Iniciando servidor...\n');
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    cwd: ROOT,
  });

  server.on('close', (code) => process.exit(code));
}

// --- Execução ---
if (precisaInstalar()) {
  instalarDependencias();
}
iniciarServidor();
