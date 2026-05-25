# Rin'ne — API Documentation

## General Information

| Aspect | Value |
|--------|-------|
| **Base URL** | `http://localhost:3001/api` |
| **Auth Method** | JWT (Bearer token) via `Authorization` header or `?token=` query param |
| **Token Expiry** | 24 hours (HS256 algorithm) |
| **Content-Type** | `application/json` (except file uploads) |

All protected endpoints require a valid JWT token. Include it as:

```
Authorization: Bearer <token>
```

---

## Authentication

### POST /api/auth/register

Register a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "min8chars",
  "username": "optional"
}
```

**Response `201`:**
```json
{
  "user": { "id": "uuid", "email": "...", "username": "...", "avatar_url": null },
  "token": "jwt..."
}
```

**Errors:** `400` (validation), `409` (email already registered)

---

### POST /api/auth/login

Authenticate an existing user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

**Response `200`:**
```json
{
  "user": { "id": "uuid", "email": "...", "username": "...", "avatar_url": null },
  "token": "jwt..."
}
```

**Errors:** `401` (invalid credentials)

---

### POST /api/auth/logout

Revoke the current token (authorization required).

**Headers:** `Authorization: Bearer <token>`

**Response `200`:**
```json
{ "message": "Sesión cerrada correctamente" }
```

---

### GET /api/auth/me

Get the authenticated user's profile.

**Response `200`:**
```json
{
  "user": { "id": "uuid", "email": "...", "username": "...", "created_at": "..." }
}
```

---

### PUT /api/auth/profile

Update the user's profile.

**Body:**
```json
{
  "username": "newusername",
  "avatar_url": "https://..."
}
```

**Response `200`:**
```json
{
  "user": { "id": "uuid", "email": "...", "username": "...", "avatar_url": "..." }
}
```

**Errors:** `400` (missing username)

---

## Songs

### GET /api/songs

List the authenticated user's songs.

**Query params:** `?search=query` (optional, filters by title or artist)

**Response `200`:**
```json
{
  "songs": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "title": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "duration_seconds": 0,
      "file_path": "/uploads/songs/uuid.mp3",
      "cover_path": null,
      "file_size": 123456,
      "mime_type": "audio/mpeg",
      "uploaded_at": "2026-05-20T..."
    }
  ]
}
```

---

### POST /api/songs/upload

Upload one or more audio files (multipart/form-data).

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `audio` | File[] | Up to 20 files, max 50MB each |
| `artist` | string | Optional, default `"Unknown Artist"` |
| `album` | string | Optional, default `"Unknown Album"` |

**Allowed MIME types:** `audio/mpeg`, `audio/mp3`, `audio/flac`, `audio/ogg`, `audio/wav`, `audio/x-wav`, `audio/wave`, `audio/x-flac`, `audio/aac`, `audio/mp4`, `video/mp4`, `audio/x-m4a`

**Response `201`:**
```json
{
  "songs": [
    {
      "id": "uuid",
      "title": "filename (without ext)",
      "artist": "...",
      "album": "...",
      "file_path": "/uploads/songs/uuid.mp3",
      "file_size": 123456,
      "mime_type": "audio/mpeg"
    }
  ]
}
```

**Errors:** `400` (no file, invalid format, exceeds size limit)

---

### GET /api/songs/:id/stream

Stream an audio file with HTTP range support.

**Response `206`:** Audio binary stream with `Content-Range` header (partial content).  
**Response `200`:** Full audio binary stream.

**Errors:** `404` (song not found or file missing)

---

### PUT /api/songs/:id

Update a song's title and/or cover.

**Body:**
```json
{
  "title": "New Title",
  "cover_path": "/uploads/images/uuid.jpg"
}
```

**Response `200`:**
```json
{
  "song": { "id": "uuid", "title": "New Title", "cover_path": "..." }
}
```

**Errors:** `400` (missing title), `404` (not found)

---

### DELETE /api/songs/:id

Delete a song (removes file from disk and database).

**Response `200`:**
```json
{ "message": "Canción eliminada correctamente" }
```

**Errors:** `404` (not found)

---

## Favorites

### GET /api/favorites

List all favorited songs.

**Response `200`:**
```json
{
  "songs": [ /* same song objects as /songs */ ]
}
```

---

### GET /api/favorites/check/:songId

Check if a specific song is favorited.

**Response `200`:**
```json
{ "isFavorite": true }
```

---

### POST /api/favorites/:songId

Add a song to favorites (idempotent).

**Response `201`:**
```json
{ "success": true }
```

---

### DELETE /api/favorites/:songId

Remove a song from favorites.

**Response `200`:**
```json
{ "success": true }
```

---

## Playlists

### GET /api/playlists

List all playlists.

**Response `200`:**
```json
{
  "playlists": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "My Playlist",
      "cover_url": null,
      "created_at": "2026-05-20T..."
    }
  ]
}
```

---

### POST /api/playlists

Create a new playlist.

**Body:**
```json
{
  "name": "New Playlist",
  "cover_url": "https://..."
}
```

**Response `201`:**
```json
{
  "playlist": { "id": "uuid", "name": "New Playlist", "cover_url": "..." }
}
```

**Errors:** `400` (missing name)

---

### PUT /api/playlists/:id

Update a playlist's name and/or cover.

**Body:**
```json
{
  "name": "Updated Name",
  "cover_url": "https://..."
}
```

**Response `200`:**
```json
{
  "playlist": { "id": "uuid", "name": "Updated Name", "cover_url": "..." }
}
```

**Errors:** `400` (missing name)

---

### DELETE /api/playlists/:id

Delete a playlist.

**Response `200`:**
```json
{ "success": true }
```

**Errors:** `404` (not found)

---

### GET /api/playlists/:id/songs

List all songs in a playlist.

**Response `200`:**
```json
{
  "songs": [ /* same song objects as /songs */ ]
}
```

**Errors:** `404` (playlist not found)

---

### POST /api/playlists/:id/songs

Add a song to a playlist (idempotent).

**Body:**
```json
{
  "song_id": "uuid"
}
```

**Response `201`:**
```json
{ "success": true }
```

**Errors:** `404` (playlist not found)

---

### DELETE /api/playlists/:id/songs/:songId

Remove a song from a playlist.

**Response `200`:**
```json
{ "success": true }
```

**Errors:** `404` (playlist not found)

---

## Preferences

### GET /api/preferences

Get the user's HUD customization preferences.

**Response `200`:**
```json
{
  "preferences": {
    "background_type": "solid",
    "background_value": "#131315",
    "hud_color": "#00dbe9",
    "hud_opacity": 0.8,
    "particles_type": "none",
    "particles_color": "white",
    "particles_speed": 1,
    "particles_opacity": 0.5,
    "background_size": "cover",
    "background_position": "center",
    "background_repeat": "no-repeat",
    "updated_at": "2026-05-20T..."
  }
}
```

---

### PUT /api/preferences

Update one or more preferences (partial update).

**Body (all fields optional):**
```json
{
  "background_type": "solid" | "image",
  "background_value": "#131315",
  "hud_color": "#00dbe9",
  "hud_opacity": 0.8,
  "particles_type": "none" | "snow" | "particles" | "dots" | "lines",
  "particles_color": "white",
  "particles_speed": 1.0,
  "particles_opacity": 0.5,
  "background_size": "cover",
  "background_position": "center",
  "background_repeat": "no-repeat"
}
```

**Response `200`:**
```json
{
  "preferences": { /* full preferences object */ }
}
```

---

## Image Upload

### POST /api/upload/image

Upload an image file (multipart/form-data, max 5MB).

**Field:** `image` (single file, any `image/*` MIME type)

**Response `200`:**
```json
{
  "url": "http://localhost:3001/uploads/images/uuid.jpg"
}
```

**Errors:** `400` (no file, invalid format)

---

## Health Check

### GET /api/health

Check if the server is running (no auth required).

**Response `200`:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-25T..."
}
```

---

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts (id, email, password_hash, username, avatar_url) |
| `songs` | Audio files metadata (id, user_id, title, artist, album, file_path, etc.) |
| `favorites` | User-song favorite relations (user_id, song_id) |
| `playlists` | Playlist headers (id, user_id, name, cover_url) |
| `playlist_songs` | Playlist-song many-to-many relations |
| `user_preferences` | UI customization per user (background, HUD colors, particles) |
| `revoked_tokens` | Blacklisted JWT tokens (token_jti) |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `DB_USER` | `rinne_user` | Database user |
| `DB_PASSWORD` | `rinne_password_123` | Database password |
| `DB_HOST` | `127.0.0.1` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `rinne_db` | Database name |
| `JWT_SECRET` | `super_secret_jwt_key_para_rinne_aws` | JWT signing secret |
| `FRONTEND_URL` | `*` | CORS allowed origin |
| `MAX_FILE_SIZE` | `52428800` (50MB) | Max upload file size |

---

## Additional Improvements

### Standard HTTP Response Codes

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created successfully |
| 204 | No content |
| 400 | Validation or bad request error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Conflict |
| 500 | Internal server error |

### Common Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Authentication Flow

1. User registers or logs into the application
2. Backend validates credentials
3. JWT token is generated using HS256
4. Client stores token locally
5. Protected routes require the token in the Authorization header
6. Middleware validates the token before processing the request

### Backend Structure

```
src/
├── controllers/
├── routes/
├── middleware/
├── services/
├── database/
├── utils/
├── uploads/
├── config/
└── app.ts
```

### Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| TypeScript | Strong typing and scalability |
| PostgreSQL | Relational database |
| Docker | Database containerization |
| JWT | Authentication |
| Multer | File uploads |
| PM2 | Process manager |
| Nginx | Reverse proxy |
| AWS EC2 | Cloud deployment |

### Security Features

- JWT authentication
- Password hashing using bcrypt
- Protected API routes
- File MIME type validation
- File upload size limits
- CORS configuration
- Token revocation system
- HTTP Range support for streaming

### Example CURL Requests

#### Login
```bash
curl -X POST http://3.22.170.210:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email":"user@example.com",
  "password":"mypassword"
}'
```

#### Get Songs
```bash
curl -X GET http://3.22.170.210:3000/api/songs \
-H "Authorization: Bearer YOUR_TOKEN"
```

### Deployment

The Rin'ne API is deployed on AWS using:
- AWS EC2 Ubuntu Server
- Nginx reverse proxy
- PM2 process manager
- Dockerized PostgreSQL database

### AWS Services Used

| AWS Service | Purpose |
|---|---|
| EC2 | Application hosting |
| Security Groups | Firewall and port access |
| Elastic IP | Static public IP |
| IAM | Access management |

### Environment Variables (Secure Example)

| Variable | Example |
|---|---|
| PORT | 3000 |
| DB_USER | rinne_user |
| DB_PASSWORD | <hidden> |
| DB_HOST | 127.0.0.1 |
| DB_PORT | 5432 |
| DB_NAME | rinne_db |
| JWT_SECRET | <hidden> |
| FRONTEND_URL | * |

### File Upload Restrictions

| Type | Limit |
|---|---|
| Audio files | 50MB |
| Images | 5MB |
| Max simultaneous uploads | 20 files |

### Future Improvements

- HTTPS with SSL certificates
- Amazon S3 for file storage
- CI/CD pipeline
- Redis caching
- API rate limiting
- API versioning
- Swagger/OpenAPI integration

---
