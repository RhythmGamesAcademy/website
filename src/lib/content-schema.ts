import { z } from 'zod';

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  excerpt: z.string().optional().default(''),
});
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export const pageFrontmatterSchema = z.object({
  title: z.string(),
  effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'effectiveDate must be YYYY-MM-DD').optional(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedAt must be YYYY-MM-DD').optional(),
  contactEmail: z.string().email().optional(),
  reviewCycle: z.string().optional(),
  description: z.string().optional(),
});
export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

export const heroSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  image: z
    .string()
    .regex(/^\/images\//, 'image must be a path under /images/ (no external URLs)'),
  linkUrl: z.string().optional(),
  order: z.number().int().nonnegative(),
  alt: z.string().optional().default(''),
  decorative: z.boolean().optional().default(true),
});
export type HeroSlideData = z.infer<typeof heroSlideSchema>;

export const heroSlidesSchema = z.array(heroSlideSchema);

export class ContentSchemaError extends Error {
  constructor(filePath: string, cause: z.ZodError) {
    super(`Invalid content in ${filePath}: ${cause.message}`);
    this.name = 'ContentSchemaError';
  }
}

export function parseOrThrow<T>(
  schema: z.ZodType<T>,
  data: unknown,
  filePath: string
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContentSchemaError(filePath, result.error);
  }
  return result.data;
}
