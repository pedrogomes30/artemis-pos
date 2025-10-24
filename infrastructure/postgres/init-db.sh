#!/bin/bash
set -e

# Lê variáveis do ambiente ou usa defaults
POSTGRES_DB="${POSTGRES_DB:-artemis_pos}"

AUTH_DB_USER="${AUTH_DB_USER:-auth_user}"
AUTH_DB_PASSWORD="${AUTH_DB_PASSWORD:-auth_pass_secure_2025}"
AUTH_DB_SCHEMA="${AUTH_DB_SCHEMA:-auth_schema}"

CATALOG_DB_USER="${CATALOG_DB_USER:-catalog_user}"
CATALOG_DB_PASSWORD="${CATALOG_DB_PASSWORD:-catalog_pass_secure_2025}"
CATALOG_DB_SCHEMA="${CATALOG_DB_SCHEMA:-catalog_schema}"

ORDER_DB_USER="${ORDER_DB_USER:-order_user}"
ORDER_DB_PASSWORD="${ORDER_DB_PASSWORD:-order_pass_secure_2025}"
ORDER_DB_SCHEMA="${ORDER_DB_SCHEMA:-order_schema}"

echo "🔧 Configurando database: $POSTGRES_DB"
echo "📋 Schemas: $AUTH_DB_SCHEMA, $CATALOG_DB_SCHEMA, $ORDER_DB_SCHEMA"

# Conecta ao database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- ============================================
    -- Artemis POS - Multi-Schema Database Setup
    -- ============================================

    -- Enable required extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    CREATE EXTENSION IF NOT EXISTS "btree_gin";
    CREATE EXTENSION IF NOT EXISTS "btree_gist";

    -- ============================================
    -- AUTH SERVICE SCHEMA
    -- ============================================

    -- Create user for auth service
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$AUTH_DB_USER') THEN
            CREATE USER $AUTH_DB_USER WITH PASSWORD '$AUTH_DB_PASSWORD';
        END IF;
    END
    \$\$;

    -- Create schema
    CREATE SCHEMA IF NOT EXISTS $AUTH_DB_SCHEMA AUTHORIZATION $AUTH_DB_USER;

    -- Grant permissions
    GRANT ALL PRIVILEGES ON SCHEMA $AUTH_DB_SCHEMA TO $AUTH_DB_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA $AUTH_DB_SCHEMA TO $AUTH_DB_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA $AUTH_DB_SCHEMA TO $AUTH_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $AUTH_DB_SCHEMA GRANT ALL PRIVILEGES ON TABLES TO $AUTH_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $AUTH_DB_SCHEMA GRANT ALL PRIVILEGES ON SEQUENCES TO $AUTH_DB_USER;

    -- ============================================
    -- CATALOG SERVICE SCHEMA
    -- ============================================

    -- Create user for catalog service (sync + search)
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$CATALOG_DB_USER') THEN
            CREATE USER $CATALOG_DB_USER WITH PASSWORD '$CATALOG_DB_PASSWORD';
        END IF;
    END
    \$\$;

    -- Create schema
    CREATE SCHEMA IF NOT EXISTS $CATALOG_DB_SCHEMA AUTHORIZATION $CATALOG_DB_USER;

    -- Grant permissions
    GRANT ALL PRIVILEGES ON SCHEMA $CATALOG_DB_SCHEMA TO $CATALOG_DB_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA $CATALOG_DB_SCHEMA TO $CATALOG_DB_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA $CATALOG_DB_SCHEMA TO $CATALOG_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $CATALOG_DB_SCHEMA GRANT ALL PRIVILEGES ON TABLES TO $CATALOG_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $CATALOG_DB_SCHEMA GRANT ALL PRIVILEGES ON SEQUENCES TO $CATALOG_DB_USER;

    -- ============================================
    -- ORDER SERVICE SCHEMA
    -- ============================================

    -- Create user for order service
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$ORDER_DB_USER') THEN
            CREATE USER $ORDER_DB_USER WITH PASSWORD '$ORDER_DB_PASSWORD';
        END IF;
    END
    \$\$;

    -- Create schema
    CREATE SCHEMA IF NOT EXISTS $ORDER_DB_SCHEMA AUTHORIZATION $ORDER_DB_USER;

    -- Grant permissions
    GRANT ALL PRIVILEGES ON SCHEMA $ORDER_DB_SCHEMA TO $ORDER_DB_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA $ORDER_DB_SCHEMA TO $ORDER_DB_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA $ORDER_DB_SCHEMA TO $ORDER_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $ORDER_DB_SCHEMA GRANT ALL PRIVILEGES ON TABLES TO $ORDER_DB_USER;
    ALTER DEFAULT PRIVILEGES IN SCHEMA $ORDER_DB_SCHEMA GRANT ALL PRIVILEGES ON SEQUENCES TO $ORDER_DB_USER;

    -- ============================================
    -- AUDIT & LOGGING
    -- ============================================

    -- Create audit table for tracking changes across schemas
    CREATE TABLE IF NOT EXISTS public.audit_log (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        schema_name VARCHAR(50) NOT NULL,
        table_name VARCHAR(100) NOT NULL,
        operation VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
        user_id VARCHAR(100),
        changed_at TIMESTAMP DEFAULT NOW(),
        old_data JSONB,
        new_data JSONB,
        ip_address INET,
        user_agent TEXT
    );

    -- Create index for better query performance
    CREATE INDEX IF NOT EXISTS idx_audit_log_schema_table ON public.audit_log(schema_name, table_name);
    CREATE INDEX IF NOT EXISTS idx_audit_log_changed_at ON public.audit_log(changed_at DESC);
    CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);

    -- Grant read access to audit log for all service users
    GRANT SELECT ON public.audit_log TO $AUTH_DB_USER, $CATALOG_DB_USER, $ORDER_DB_USER;

EOSQL

echo "✅ Database setup completed successfully!"
echo "📋 Schemas created: $AUTH_DB_SCHEMA, $CATALOG_DB_SCHEMA, $ORDER_DB_SCHEMA"
echo "👥 Users created: $AUTH_DB_USER, $CATALOG_DB_USER, $ORDER_DB_USER"
echo "🔧 Extensions enabled: uuid-ossp, pg_trgm, btree_gin, btree_gist"
