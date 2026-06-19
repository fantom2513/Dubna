# План: доводка Дубна-лендинга до топ-уровня

> Статус: в работе. Оркестратор — основной чат (Opus), исполнители — субагенты (Sonnet).
> Источник: ревью UI + валидация по коду + дизайн-система `ui-ux-pro-max`
> (паттерн **Immersive/Interactive Experience**, стиль **3D & Hyperrealism**).

## Исключено из аудита (намеренно)
- **п.11 контраст `--text-secondary`** — `#8a9bbf` на тёмном фоне даёт ≈6:1, проходит WCAG AA. Реальная проблема — размер (`text-xs`), не цвет.
- **п.14 анимация графиков** — у обёрток уже есть `whileInView`, Recharts анимируется по умолчанию. Недоработка только — отсутствие `Tooltip` у радара.
- **п.21 `ConstellationBackground`** — НЕ dead code, используется в `SharedLayout.tsx:24`.

---

## Фаза 0 — Фундамент (a11y + общий компонент) `[Wave 1 / Agent A]`
1. `globals.css`: `*:focus-visible` ring; `* { cursor: none }` → `body.has-custom-cursor * { cursor: none }`.
2. `CustomCursor.tsx`: добавлять/снимать `document.body.classList` `has-custom-cursor` (только десктоп).
3. `SharedLayout.tsx`: skip-link (`sr-only focus:not-sr-only`) → `#main`; `id="main"` на `<motion.main>`.
4. Новый `SectionHeader.tsx`: eyebrow + H2 на токене `--text-section-title`, корректные `animate`-состояния (без `{}`), пропсы `eyebrow/title/align/accent`. Рефактор 8 секций (About, Stats, Attractions, Science, Architecture, Climate, LiveDashboard, Map). Закрывает пп. 12, 13 + базу монотонности.

## Фаза 1 — Hero `[Wave 1 / Agent B]`
5. Фото `opacity 0.12 → 0.22` (п.6).
6. Подзаголовок → сильный теглайн + теги вторичны (п.7).
7. `«scroll»` → `«прокрутите»` (п.8).
8. `isMobile`: 800 звёзд вместо 3000; `dpr={[1, isMobile?1.5:2]}`; заморозка при reduced-motion (п.9).
9. Skip-кнопка 3D-интро → `#about` (требование immersive-паттерна).

## Фаза 2 — Navbar `[Wave 1 / Agent C]`
10. Дубль `layoutId` → `nav-indicator-center` / `nav-indicator-right` (п.10).
11. `LIVE` → shadcn-Tooltip «Данные обновляются в реальном времени» (п.19).

## Фаза 3 — Ритм страницы `[Wave 2 / Agent E]`
12. `HomePage.tsx`: 9 `SectionDivider` → 2–3 на смысловых границах; остальное — сменой фона.
13. Новый структурный вариант секции (full-bleed / large-number anchor) как ОТДЕЛЬНЫЙ компонент (не трогая About — во избежание конфликта с Wave 2/Agent D).

## Фаза 4 — Полировка компонентов `[Wave 2 / Agent D]`
14. Body карточек `text-sm → text-[15px]` (п.3).
15. Stats: `Tooltip` для радара (п.15); `gap-px` → `divide` (п.20).
16. Attractions: `auto-rows-auto` на мобиле, `md:auto-rows-[240px]` (п.16).
17. Back-to-top кнопка после 50% скролла, reduced-motion-aware (п.17).
18. Footer `© 2024` → `{new Date().getFullYear()}` (п.18).

## Фаза 5 — Моушн-система `[Wave 3 / sequential]`
19. `lib/motion.ts` — токены длительностей/easing/stagger; `useReducedMotion` (framer) в ключевых компонентах.

## Фаза 6 — Верификация `[оркестратор]`
20. `tsc --noEmit`, lint, `build`; ручная проверка 375/768/1440, reduced-motion, Tab-навигация.

---

## Карта волн (непересекающиеся файлы)
| Волна | Агент | Файлы |
|-------|-------|-------|
| 1 | A (Фаза 0) | `globals.css`, `CustomCursor.tsx`, `SharedLayout.tsx`, новый `SectionHeader.tsx`, 8 секций |
| 1 | B (Фаза 1) | `Hero.tsx` |
| 1 | C (Фаза 2) | `Navbar.tsx` |
| 2 | D (Фаза 4) | `Stats.tsx`, `Attractions.tsx`, `About.tsx`, `Footer.tsx`, новый `BackToTop.tsx` |
| 2 | E (Фаза 3) | `HomePage.tsx`, новый структурный компонент |
| 3 | — (Фаза 5) | `lib/motion.ts` + точечно по компонентам (sequential) |

Между волнами: оркестратор делает typecheck + коммит.
