# DilGenie Kalite Denetim Raporu

> Otomatik oluşturuldu: 2026-08-20 18:06 UTC
> Model gerektirmez: tsc/eslint dışı statik kontroller (CI ayrıca tsc+eslint koşuyor).

## Özet

- Taranan dosya: **123**
- Emoji/sembol görsel ihlali: **2**
- console.log debug kodu: **19**
- `any` tipi kullanımı: **15**
- 400+ satır dosya: **2**
- TODO/FIXME işareti: **0**

## Emoji / Unicode Sembol İhlalleri (görsel kuralı)

> Kural: emoji ikon olarak KULLANILMAZ — react-native-svg ile ikon componenti yaz.

- `src/components/Listening/Listening.tsx:←`
- `src/components/Videolistening/VideoListening.tsx:📂`

## console.log / console.debug

- `src/pages/Bottom/Profile/index.tsx:64`
- `src/pages/Bottom/Profile/index.tsx:66`
- `src/pages/Bottom/Profile/index.tsx:102`
- `src/pages/Bottom/Profile/index.tsx:129`
- `src/pages/Start/Auth/Login/index.tsx:50`
- `src/pages/Start/Auth/Login/index.tsx:64`
- `src/pages/Start/Auth/Login/index.tsx:75`
- `src/pages/Start/Auth/Register/index.tsx:67`
- `src/pages/Start/Auth/Register/index.tsx:71`
- `src/pages/Start/Splash/index.tsx:46`
- `src/pages/Vocabulary/A1/DragDropQuiz/DragDropQuiz.tsx:55`
- `src/pages/Vocabulary/C1/C1level.tsx:30`
- `src/pages/Vocabulary/C2/C2level.tsx:30`
- `src/pages/games/hangman/Hangman.tsx:188`
- `src/pages/games/quiz/Quiz.tsx:392`
- `src/pages/games/wordsorting/WordSorting.tsx:46`
- `src/routes/ApplicationNavigator.tsx:47`
- `src/services/api/base.tsx:82`
- `src/utils/speech.ts:68`

## 400+ Satır Dosyalar (component mimarisi ihlali adayı)

- `src/pages/Vocabulary/C1/data.tsx (403)`
- `src/pages/games/quiz/Quiz.tsx (477)`

---
_Rapor `scripts/audit/audit.mjs` tarafından üretilir._
