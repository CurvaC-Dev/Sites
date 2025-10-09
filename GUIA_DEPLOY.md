# 🚀 Guia Completo de Deploy

## 📋 Índice
1. [Deploy Local](#deploy-local)
2. [Deploy em Servidor (VPS)](#deploy-em-servidor-vps)
3. [Deploy na Vercel](#deploy-na-vercel)
4. [Configuração de Domínio](#configuração-de-domínio)
5. [Troubleshooting](#troubleshooting)

---

## 🏠 Deploy Local

### Pré-requisitos
```bash
# Node.js 20+
node --version

# Yarn
yarn --version

# PostgreSQL
psql --version
```

### Passo a Passo

#### 1. Extrair Arquivos
```bash
# Descompactar o arquivo
unzip promova_se_clone_completo.zip
cd backup_promova_se_clone
```

#### 2. Instalar Dependências
```bash
yarn install
```

#### 3. Configurar Banco de Dados
```bash
# Criar banco PostgreSQL
createdb promova_se

# Configurar .env
cat > .env << EOL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/promova_se?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
EOL

# Aplicar migrations
yarn prisma generate
yarn prisma db push
```

#### 4. Executar
```bash
# Desenvolvimento
yarn dev

# Produção
yarn build
yarn start
```

Acesse: `http://localhost:3000`

---

## 🖥️ Deploy em Servidor (VPS)

### Pré-requisitos no Servidor
- Ubuntu 22.04 ou superior
- Acesso root ou sudo
- Domínio apontado para o servidor

### Instalação no Servidor

#### 1. Atualizar Sistema
```bash
sudo apt update
sudo apt upgrade -y
```

#### 2. Instalar Node.js
```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Yarn
npm install -g yarn
```

#### 3. Instalar PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar banco de dados
sudo -u postgres psql
CREATE DATABASE promova_se;
CREATE USER promova_user WITH PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE promova_se TO promova_user;
\q
```

#### 4. Instalar Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Fazer Upload do Projeto
```bash
# No seu computador, enviar arquivos via SCP
scp promova_se_clone_completo.zip usuario@servidor.com:/home/usuario/

# No servidor, extrair
cd /home/usuario
unzip promova_se_clone_completo.zip
cd backup_promova_se_clone
```

#### 6. Configurar Projeto
```bash
# Instalar dependências
yarn install

# Configurar .env
nano .env
# Adicionar:
DATABASE_URL="postgresql://promova_user:senha_segura@localhost:5432/promova_se?schema=public"
NEXTAUTH_URL="https://seudominio.com"
NEXTAUTH_SECRET="sua_chave_secreta_aqui"

# Aplicar migrations
yarn prisma generate
yarn prisma db push

# Build
yarn build
```

#### 7. Configurar PM2 (Process Manager)
```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar aplicação
pm2 start yarn --name "promova-se" -- start
pm2 save
pm2 startup
```

#### 8. Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/promova-se

# Adicionar:
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Ativar site
sudo ln -s /etc/nginx/sites-available/promova-se /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. Configurar SSL com Let's Encrypt
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# Renovação automática já está configurada
```

---

## ☁️ Deploy na Vercel

### Preparação

#### 1. Criar Conta na Vercel
- Acesse [vercel.com](https://vercel.com)
- Faça login com GitHub

#### 2. Preparar Repositório
```bash
# Inicializar Git (se ainda não tem)
cd backup_promova_se_clone
git init
git add .
git commit -m "Initial commit"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/promova-se.git
git branch -M main
git push -u origin main
```

#### 3. Importar Projeto na Vercel
1. Na Vercel, clique em "Add New Project"
2. Selecione seu repositório GitHub
3. Configure as variáveis de ambiente
4. Clique em "Deploy"

### Variáveis de Ambiente na Vercel
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=sua_chave_secreta
```

### Banco de Dados para Vercel

**Opção 1: Vercel Postgres**
```bash
# Na Vercel Dashboard
1. Vá em Storage
2. Create Database
3. Selecione Postgres
4. Copie a DATABASE_URL
5. Adicione nas Environment Variables
```

**Opção 2: Supabase**
```bash
1. Crie conta em supabase.com
2. Crie novo projeto
3. Copie a Connection String
4. Use como DATABASE_URL
```

**Opção 3: Neon**
```bash
1. Crie conta em neon.tech
2. Crie novo projeto
3. Copie a Connection String
4. Use como DATABASE_URL
```

---

## 🌐 Configuração de Domínio

### DNS Records

#### Para Vercel
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

#### Para Servidor VPS
```
Type    Name    Value
A       @       IP_DO_SERVIDOR
A       www     IP_DO_SERVIDOR
```

### No Painel da Vercel
1. Vá em Project Settings
2. Domains
3. Add Domain
4. Digite seu domínio
5. Siga as instruções de configuração DNS

---

## 🔧 Troubleshooting

### Erro: Cannot connect to database
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Verificar URL de conexão
echo $DATABASE_URL

# Testar conexão
psql $DATABASE_URL
```

### Erro: Port 3000 already in use
```bash
# Encontrar processo usando a porta
sudo lsof -i :3000

# Matar processo
kill -9 PID_DO_PROCESSO

# Ou usar outra porta
PORT=3001 yarn dev
```

### Erro: Prisma Client não encontrado
```bash
# Regenerar cliente
yarn prisma generate

# Se persistir, limpar e reinstalar
rm -rf node_modules .next
yarn install
yarn prisma generate
```

### Erro: NextAuth callback URL mismatch
```bash
# Verificar NEXTAUTH_URL no .env
# Deve corresponder ao domínio atual
NEXTAUTH_URL="https://seudominio.com"
```

### Build falha na Vercel
```bash
# Verificar logs na Vercel
# Geralmente é:
# 1. Variáveis de ambiente faltando
# 2. Erro no Prisma
# 3. Dependências faltando

# Solução:
# 1. Adicionar todas env vars
# 2. Executar: vercel env pull
# 3. Fazer novo deploy
```

---

## 📊 Monitoramento

### Logs do PM2
```bash
# Ver logs
pm2 logs promova-se

# Ver status
pm2 status

# Reiniciar
pm2 restart promova-se
```

### Logs do Nginx
```bash
# Logs de acesso
sudo tail -f /var/log/nginx/access.log

# Logs de erro
sudo tail -f /var/log/nginx/error.log
```

### Analytics na Vercel
- Acesse Vercel Dashboard
- Vá em Analytics
- Veja métricas de performance e uso

---

## 🔐 Segurança

### Checklist de Segurança
- [ ] NEXTAUTH_SECRET é forte e único
- [ ] Banco de dados usa senha forte
- [ ] SSL/HTTPS configurado
- [ ] Variáveis de ambiente não expostas
- [ ] Firewall configurado no servidor
- [ ] Backups automáticos do banco
- [ ] Rate limiting nas APIs

### Configurar Firewall (UFW)
```bash
# Ativar UFW
sudo ufw enable

# Permitir SSH
sudo ufw allow 22/tcp

# Permitir HTTP e HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verificar status
sudo ufw status
```

---

## 📈 Performance

### Otimizações Recomendadas

#### 1. Cache no Nginx
```nginx
# Adicionar ao servidor
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 2. Compressão Gzip
```nginx
# Adicionar ao nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

#### 3. Database Connection Pooling
```typescript
// Em lib/db.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      connect_timeout: 60,
      pool_timeout: 60,
      socket_timeout: 60,
    },
  },
});
```

---

## 🆘 Suporte

### Recursos Úteis
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)

### Comandos de Diagnóstico
```bash
# Verificar versões
node --version
yarn --version
npm --version

# Verificar build
yarn build

# Verificar tipos
yarn type-check

# Limpar cache
rm -rf .next node_modules
yarn install
```

---

**🎉 Parabéns! Seu site está no ar!**
