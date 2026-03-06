# Дубна — Город Будущего

Premium city showcase сайт для наукограда Дубна с кинематографическим визуалом, WebGL-эффектами и плавными анимациями.

## Технологии

| Технология | Назначение |
|---|---|
| Vite + React 18 + TypeScript | Core стек |
| Three.js + @react-three/fiber | 3D Hero сцена с атомом |
| Framer Motion | Плавные анимации и переходы |
| Lenis | Smooth scroll |
| Tailwind CSS v3 | Стилизация |
| Recharts | Графики статистики |
| react-countup | Анимированные счётчики |

## Секреты и переменные окружения

Проект использует **Яндекс Расписания API** для виджета электричек. Ключ не хранится в репозитории.

### Локальная разработка

1. Скопируйте шаблон: `cp .env.example .env`
2. Получите ключ: [Яндекс Developer](https://developer.tech.yandex.ru/services/72) (бесплатно, до 500 запросов/день)
3. В `.env` укажите: `VITE_YANDEX_RASP_KEY=ваш_ключ`

### Секреты в GitHub (CI / деплой)

Для сборки или деплоя через GitHub Actions добавьте в репозитории:

**Settings → Secrets and variables → Actions → New repository secret**

| Имя секрета | Обязательный | Описание |
|-------------|--------------|----------|
| `VITE_YANDEX_RASP_KEY` | Нет | Ключ API Яндекс Расписания (для виджета электричек) |
| `SSH_PRIVATE_KEY` | Да (для деплоя) | Приватный SSH-ключ для доступа к серверу (содержимое `id_rsa`) |
| `SSH_HOST` | Да (для деплоя) | Хост сервера (IP или домен) |
| `SSH_USER` | Да (для деплоя) | Пользователь SSH на сервере |
| `DEPLOY_PATH` | Да (для деплоя) | Каталог на сервере, куда выгружать сайт (например `/var/www/dubna`) |
| `SSH_PORT` | Нет | Порт SSH (по умолчанию 22) |

После пуша в ветку `main` запускается пайплайн **Deploy**: сборка и выгрузка `dist/` на сервер через rsync по SSH. Деплой можно запустить вручную: **Actions → Deploy → Run workflow**.

#### Настройка сервера для деплоя

1. Создайте пользователя для деплоя (или используйте существующего) и каталог для сайта:
   ```bash
   sudo mkdir -p /var/www/dubna
   sudo chown YOUR_USER:YOUR_USER /var/www/dubna
   ```

2. Добавьте на сервер публичный ключ, соответствующий `SSH_PRIVATE_KEY`: в `~/.ssh/authorized_keys` пользователя `SSH_USER`.

3. На сервере должен быть веб-сервер (nginx/apache), отдающий статику из `DEPLOY_PATH`. Для SPA нужна выдача `index.html` на все маршруты. Пример для nginx:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/dubna;
       index index.html;
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать для production
npm run build

# Просмотр production сборки
npm run preview
```

## Структура проекта

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav с blur backdrop + scroll progress
│   │   └── Footer.tsx          # 3-колоночный footer с декором
│   ├── sections/
│   │   ├── Hero.tsx            # Three.js сцена + типографика
│   │   ├── About.tsx           # Анатомия города — 3 блока
│   │   ├── Stats.tsx           # Счётчики + RadarChart + AreaChart
│   │   ├── Attractions.tsx     # Masonry grid достопримечательностей
│   │   ├── Science.tsx         # ОИЯИ — timeline + периодическая таблица
│   │   ├── Architecture.tsx    # Галерея с lightbox
│   │   ├── Climate.tsx         # Сезонный виджет + LineChart
│   │   └── Map.tsx             # SVG-карта города
│   └── ui/
│       └── CustomCursor.tsx    # Кастомный курсор (только desktop)
├── hooks/
│   ├── useScrollProgress.ts    # Прогресс прокрутки страницы
│   └── useInView.ts            # IntersectionObserver хук
├── data/
│   └── dubna.ts                # Типизированные данные о городе
└── styles/
    └── globals.css             # CSS переменные, шрифты, базовые стили
```

## Секции сайта

1. **Hero** — Three.js сцена с вращающимся икосаэдром, орбитальными частицами и звёздным полем
2. **О городе** — История, наука и природа в трёх карточках
3. **Статистика** — 6 анимированных счётчиков + радар-чарт + график роста населения
4. **Достопримечательности** — Masonry grid с hover-анимациями
5. **Атомное сердце** — Timeline синтеза элементов + интерактивная таблица 104–118
6. **Архитектура** — Галерея сталинского ампира с lightbox
7. **Климат** — Сезонный виджет с табами + температурный LineChart
8. **Карта** — SVG-карта расположения города

## Цветовая палитра "Ядерная ночь"

```css
--bg-primary: #07090f;       /* Почти чёрный, холодный */
--accent-primary: #4fc3f7;   /* Ice blue — наука, вода */
--accent-secondary: #e8b84b; /* Золотой — история, СССР */
--accent-tertiary: #7ecb7e;  /* Зелёный — природа */
```

## Требования

- Node.js 18+
- npm 9+
