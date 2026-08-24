import { z } from 'zod';

/**
 * 予約投稿の公開日時。ISO 8601 で、タイムゾーンオフセット（+09:00 または Z）を必須とする。
 *
 * ビルドは UTC 環境（GitHub Actions）で走る。オフセットの無い "2026-06-24T12:00" を
 * 許すと、日本時間のつもりで書いた時刻が9時間ずれて解釈されるため許可しない。
 */
const PUBLISH_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * 実在する日時かを確かめる。書式が正しくても中身が正しいとは限らない。
 *
 * Date.parse は "2026-02-30T12:00+09:00" を 3月2日へ繰り上げて解釈してしまい
 * NaN を返さない。書かれた暦日そのものを突き合わせる必要がある。
 */
function isRealDateTime(value: string): boolean {
  if (Number.isNaN(Date.parse(value))) return false;

  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return day >= 1 && day <= daysInMonth;
}

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  /** 執筆日。内部的な記録であり、読者には表示しない。 */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  /** 公開日時。この時刻を過ぎるまで記事はサイト上に存在しない。省略時は公開済み扱い。 */
  publish: z
    .string()
    .regex(
      PUBLISH_DATETIME_PATTERN,
      'publish must be ISO 8601 with a timezone offset, e.g. 2026-06-24T12:00+09:00'
    )
    .refine(isRealDateTime, 'publish must be a date and time that actually exists')
    .optional(),
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
