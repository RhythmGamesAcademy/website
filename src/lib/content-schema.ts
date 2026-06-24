import { z } from 'zod';

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  excerpt: z.string().optional().default(''),
  translationStatus: z.enum(['complete', 'placeholder']).optional().default('complete'),
});
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export const policyFrontmatterSchema = z.object({
  title: z.string(),
  updatedAt: z.string().optional(),
  translationStatus: z.enum(['complete', 'placeholder']).optional().default('complete'),
});
export type PolicyFrontmatter = z.infer<typeof policyFrontmatterSchema>;

export const heroSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  image: z.string(),
  linkUrl: z.string(),
  order: z.number().int().nonnegative(),
});
export type HeroSlideData = z.infer<typeof heroSlideSchema>;

export const heroSlidesSchema = z.array(heroSlideSchema);
