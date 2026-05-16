import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const preferencesSchema = z.object({
  background_type: z.enum(['solid', 'gradient', 'image']).optional(),
  background_value: z.string().max(255).optional(),
  hud_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color HEX inválido').optional(),
});

// GET /api/preferences - Get user preferences
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user!;
    const result = await query(
      'SELECT * FROM user_preferences WHERE user_id = $1',
      [user.id]
    );

    if (result.rows.length === 0) {
      return res.json({
        preferences: {
          background_type: 'solid',
          background_value: '#1a1a2e',
          hud_color: '#e94560',
        },
      });
    }

    res.json({ preferences: result.rows[0] });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Error al obtener preferencias' });
  }
});

// PUT /api/preferences - Update user preferences
router.put('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user!;
    const parsed = preferencesSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const { background_type, background_value, hud_color } = parsed.data;

    const result = await query(
      `INSERT INTO user_preferences (user_id, background_type, background_value, hud_color, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         background_type = COALESCE($2, user_preferences.background_type),
         background_value = COALESCE($3, user_preferences.background_value),
         hud_color = COALESCE($4, user_preferences.hud_color),
         updated_at = NOW()
       RETURNING *`,
      [user.id, background_type, background_value, hud_color]
    );

    res.json({ preferences: result.rows[0] });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Error al actualizar preferencias' });
  }
});

export default router;
