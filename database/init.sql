-- ============================================
-- Rin'ne Database Schema
-- PostgreSQL 15
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- Users table
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- Songs table
-- ============================================
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) DEFAULT 'Unknown Artist',
  album VARCHAR(255) DEFAULT 'Unknown Album',
  duration_seconds INTEGER DEFAULT 0,
  file_path VARCHAR(500) NOT NULL,
  cover_path VARCHAR(500),
  file_size BIGINT DEFAULT 0,
  mime_type VARCHAR(100) DEFAULT 'audio/mpeg',
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_songs_user_id ON songs(user_id);
CREATE INDEX idx_songs_title ON songs(title);
CREATE INDEX idx_songs_artist ON songs(artist);

-- ============================================
-- User Preferences table (HUD customization)
-- ============================================
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  background_type VARCHAR(50) DEFAULT 'solid',
  background_value VARCHAR(255) DEFAULT '#1a1a2e',
  hud_color VARCHAR(7) DEFAULT '#e94560',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Revoked tokens table (for logout)
-- ============================================
CREATE TABLE revoked_tokens (
  id SERIAL PRIMARY KEY,
  token_jti VARCHAR(255) UNIQUE NOT NULL,
  revoked_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_revoked_tokens_jti ON revoked_tokens(token_jti);

-- ============================================
-- Auto-create preferences on user insert
-- ============================================
CREATE OR REPLACE FUNCTION create_default_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_preferences
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_preferences();
