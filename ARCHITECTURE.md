# 🏗️ Arquitetura Artemis POS - Microserviços

## 📋 Visão Geral

Sistema de PDV (Point of Sale) baseado em microserviços com padrão BFF (Backend for Frontend) e CQRS (Command Query Responsibility Segregation).

## 🎯 Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                 │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │   Web Client     │              │   Mobile App X   │         │
│  └────────┬─────────┘              └────────┬─────────┘         │
└───────────┼──────────────────────────────────┼──────────────────┘
            │                                  │
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BFF LAYER                               │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │    BFF Web       │              │    BFF App X     │         │
│  │  Port: 3001      │              │  Port: 3002      │         │
│  └────────┬─────────┘              └────────┬─────────┘         │
└───────────┼──────────────────────────────────┼──────────────────┘
            │                                  │
            └──────────────┬───────────────────┘
                           │
            ┌──────────────┴───────────────┐
            │     API Gateway / Router      │
            └──────────────┬───────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES LAYER                          │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │  Auth Service   │  │ Catalog Sync    │  │ Order Service  │   │
│  │  Port: 3101     │  │ Service         │  │ Port: 3104     │   │
│  │                 │  │ Port: 3102      │  │                │   │
│  │ • Users         │  │                 │  │ • Orders       │   │
│  │ • Tenants       │  │ • Products      │  │ • OrderItems   │   │
│  │ • Units         │  │ • SKUs          │  │ • Payments     │   │
│  │ • Profiles      │  │ • Categories    │  │ • Discounts    │   │
│  │ • Actions       │  │ • Sync Jobs     │  │ • Customers    │   │
│  │ • ABAC          │  │ • Write Ops     │  │ • Taxes        │   │
│  └────────┬────────┘  └────────┬────────┘  │ • Coupons      │   │
│           │                    │           └────────┬───────┘   │
│           │                    │                    │           │
│           │                    ▼                    │           │
│           │           ┌─────────────────┐           │           │
│           │           │ Catalog Search  │           │           │
│           │           │ Service         │           │           │
│           │           │ Port: 3103      │           │           │
│           │           │                 │           │           │
│           │           │ • Search API    │           │           │
│           │           │ • Read Only     │           │           │
│           │           │ • Optimized     │           │           │
│           │           │ • Cached        │           │           │
│           │           └────────┬────────┘           │           │
│           │                    │                    │           │
└───────────┼────────────────────┼────────────────────┼───────────┘
            │                    │                    │
            ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              PostgreSQL 17 (Multi-Schema)               │   │
│  │              Port: 5432                                 │   │
│  │                                                         │   │
│  │  • auth_schema      (user: auth_user)                  │   │
│  │  • catalog_schema   (user: catalog_user)               │   │
│  │  • order_schema     (user: order_user)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │  Redis          │  │  MinIO X        │  │  MailHog X     │ │
│  │  Port: 6379     │  │  (S3 Storage)   │  │  (SMTP Test)   │ │
│  │                 │  │  Port: 9000/1   │  │  Port: 1025/   │ │
│  │  • Cache        │  │                 │  │       8025     │ │
│  │  • Sessions     │  │  • Images       │  │                │ │
│  │  • Pub/Sub      │  │  • Documents    │  │  • Email Test  │ │
│  └─────────────────┘  │  • Buckets      │  │  • Web UI      │ │
│                       └─────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Serviços

### 1. **BFF Web** (Port: 3001)
- **Responsabilidade**: Backend otimizado para aplicações web
- **Funcionalidades**:
  - Agregação de dados de múltiplos serviços
  - Cache de respostas
  - Transformação de dados para UI web
  - Rate limiting por usuário
- **Stack**: NestJS + Fastify

### 2. **BFF App** (Port: 3002)
- **Responsabilidade**: Backend otimizado para aplicações mobile
- **Funcionalidades**:
  - Payload reduzido para mobile
  - Sync offline support
  - Push notifications
  - Compressão agressiva
- **Stack**: NestJS + Fastify

### 3. **Auth Service** (Port: 3101)
- **Responsabilidade**: Autenticação e Autorização ABAC
- **Entidades**:
  - `User` - Usuários do sistema
  - `Tenant` (Client) - Clientes/Empresas
  - `Unit` (Store) - Lojas/Unidades
  - `UserUnit` - Relação usuário-loja
  - `Action` - Ações do sistema (GET, POST, PUT, DELETE)
  - `Profile` - Perfis de acesso
  - `ProfileAction` - Ações permitidas por perfil
  - `UserProfile` - Perfis atribuídos ao usuário
- **ABAC**: Controle baseado em `VERB:ROUTE` (ex: `GET:/products`)
- **Stack**: NestJS + Fastify + JWT + Prisma
- **Database**: PostgreSQL (auth_schema, user: auth_user)

### 4. **Catalog Sync Service** (Port: 3102)
- **Responsabilidade**: Gerenciamento e sincronização do catálogo (WRITE)
- **Entidades**:
  - `Product` - Produtos
  - `Sku` - Variações de produtos
  - `SkuImage` - Imagens dos SKUs
  - `SkuPrice` - Preços dos SKUs
  - `SkuStock` - Estoque dos SKUs
  - `Warehouse` - Armazéns
  - `PriceList` - Tabelas de preços
  - `Category` - Categorias
  - `Branch` - Filiais
- **Funcionalidades**:
  - CRUD de produtos
  - Sincronização com ERPs externos
  - Validações de negócio
  - Eventos de alteração (pub/sub)
- **Stack**: NestJS + Fastify + Prisma + Redis (pub/sub)
- **Database**: PostgreSQL (catalog_schema, user: catalog_user)

### 5. **Catalog Search Service** (Port: 3103)
- **Responsabilidade**: Busca e consulta de catálogo (READ)
- **Entidades**: Mesmas do Catalog Sync (read-only)
- **Funcionalidades**:
  - Busca full-text otimizada
  - Filtros avançados
  - Paginação
  - Cache agressivo (Redis)
  - Índices específicos para leitura
- **Stack**: NestJS + Fastify + Prisma + Redis (cache)
- **Database**: PostgreSQL (catalog_schema - read-only)
- **Sync**: Escuta eventos do Catalog Sync via Redis pub/sub

### 6. **Order Service** (Port: 3104)
- **Responsabilidade**: Gestão de pedidos e cálculos
- **Entidades**:
  - `Order` - Pedidos
  - `OrderItem` - Itens do pedido
  - `OrderPayment` - Pagamentos
  - `OrderDiscount` - Descontos aplicados
  - `OrderTax` - Impostos
  - `Customer` - Clientes
  - `Coupon` - Cupons de desconto
- **Funcionalidades**:
  - Criação de pedidos
  - Cálculo de totais, impostos e descontos
  - Validação de cupons
  - Controle de status
  - Integração com pagamentos
- **Stack**: NestJS + Fastify + Prisma + Redis (cache)
- **Database**: PostgreSQL (order_schema, user: order_user)

## 🗄️ Banco de Dados - Multi-Schema

### PostgreSQL - Schemas Separados

Cada serviço usa seu próprio schema e usuário, garantindo isolamento:

```sql
-- Auth Service
CREATE USER auth_user WITH PASSWORD 'auth_pass';
CREATE SCHEMA auth_schema AUTHORIZATION auth_user;
GRANT ALL ON SCHEMA auth_schema TO auth_user;

-- Catalog Service (Sync + Search)
CREATE USER catalog_user WITH PASSWORD 'catalog_pass';
CREATE SCHEMA catalog_schema AUTHORIZATION catalog_user;
GRANT ALL ON SCHEMA catalog_schema TO catalog_user;

-- Order Service
CREATE USER order_user WITH PASSWORD 'order_pass';
CREATE SCHEMA order_schema AUTHORIZATION order_user;
GRANT ALL ON SCHEMA order_schema TO order_user;
```

### Variáveis de Ambiente (.env)

```bash
# Auth Service
AUTH_DB_URL="postgresql://auth_user:auth_pass@postgres:5432/artemis_pos?schema=auth_schema"

# Catalog Sync Service
CATALOG_SYNC_DB_URL="postgresql://catalog_user:catalog_pass@postgres:5432/artemis_pos?schema=catalog_schema"

# Catalog Search Service (Read-Only)
CATALOG_SEARCH_DB_URL="postgresql://catalog_user:catalog_pass@postgres:5432/artemis_pos?schema=catalog_schema"

# Order Service
ORDER_DB_URL="postgresql://order_user:order_pass@postgres:5432/artemis_pos?schema=order_schema"
```

## 🔧 Infraestrutura

### Redis (Port: 6379)
- **Cache global**: Sessões, tokens, dados frequentes
- **Pub/Sub**: Comunicação entre serviços
- **Rate limiting**: Controle de requisições

### MinIO (Ports: 9000/9001)
- **Object Storage**: Armazenamento de imagens e documentos
- **S3-Compatible**: API compatível com Amazon S3
- **Buckets**:
  - `products` - Imagens de produtos (público)
  - `skus` - Imagens de SKUs (público)
  - `users` - Fotos de perfil (privado)
  - `documents` - Documentos gerais (privado)
- **Console UI**: http://localhost:9001

### MailHog (Ports: 1025/8025)
- **SMTP Test Server**: Captura emails sem enviar
- **Web UI**: http://localhost:8025
- **Desenvolvimento**: Testa fluxos de email sem configuração complexa

## 🔄 Comunicação entre Serviços

### Síncrona (HTTP/REST)
- BFFs → Microserviços
- Timeout configurado
- Circuit breaker

### Assíncrona (Redis Pub/Sub)
- Catalog Sync → Catalog Search (eventos de alteração)
- Order Service → Outros serviços (eventos de pedido)

## 🔐 Segurança

### Autenticação
- JWT tokens gerados pelo Auth Service
- Refresh tokens armazenados no Redis
- Expiração configurável

### Autorização ABAC
- Validação por rota e verbo HTTP
- Exemplo: `GET:/products`, `POST:/orders`
- Profiles com múltiplas actions
- User pode ter múltiplos profiles

## 📊 Padrões de Design

### CQRS (Command Query Responsibility Segregation)
- **Write**: Catalog Sync Service
- **Read**: Catalog Search Service
- Benefícios: Performance, escalabilidade, cache

### BFF (Backend for Frontend)
- Agregação de dados
- Otimização por plataforma
- Redução de requisições do cliente

### Event-Driven
- Eventos de alteração via Redis Pub/Sub
- Sincronização assíncrona
- Desacoplamento de serviços

## 🚀 Escalabilidade

### Horizontal
- Cada serviço pode ter múltiplas instâncias
- Load balancer (Nginx/Traefik)
- Redis compartilhado

### Vertical
- Catalog Search: mais memória (cache)
- Order Service: mais CPU (cálculos)

## 📦 Deploy

### Docker Compose (Desenvolvimento)
```bash
docker compose up -d
```

### Kubernetes (Produção)
- Cada serviço em seu próprio pod
- HPA (Horizontal Pod Autoscaler)
- Persistent volumes para PostgreSQL

## 🧪 Testes

### Unitários
- Cada serviço independente
- Jest

### Integração
- Testes entre serviços
- Docker Compose

### E2E
- Fluxos completos
- BFF → Microserviços

## 📈 Monitoramento

### Health Checks
- Endpoint `/health` em cada serviço
- Verifica: DB, Redis, dependências

### Logs
- Structured logging (JSON)
- Níveis: error, warn, info, debug
- Centralizado no Loki

### Métricas
- Response time
- Error rate
- Throughput

## 🔄 CI/CD

### Pipeline
1. Lint + Format
2. Tests (unit + integration)
3. Build Docker images
4. Push to registry
5. Deploy (staging → production)

## 📝 Convenções

### Portas
- BFFs: 3001-3099
- Microserviços: 3101-3199
- Infraestrutura:
  - PostgreSQL: 5432
  - Redis: 6379
  - MinIO API: 9000
  - MinIO Console: 9001
  - MailHog SMTP: 1025
  - MailHog UI: 8025

### Nomenclatura
- Serviços: `kebab-case`
- Schemas: `snake_case`
- Variáveis: `UPPER_SNAKE_CASE`

### Versionamento
- API: `/api/v1/`
- Semver: MAJOR.MINOR.PATCH
