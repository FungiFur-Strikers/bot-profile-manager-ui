# Bot Profile Manager UI

Bot Profile Manager を UI で操作する Web アプリケーション

## 機能

- ボットプロファイルの登録・編集・削除
- ダークモード対応

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) (v13.5.1)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **UI ライブラリ**:
  - [React](https://reactjs.org/) (v18.2.0)
  - [Radix UI](https://www.radix-ui.com/)
- **スタイリング**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **状態管理**:
  - [Zustand](https://zustand-demo.pmnd.rs/)
  - [TanStack Query](https://tanstack.com/query/latest)
- **フォーム管理**:
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/)
- **認証**: [jose](https://github.com/panva/jose)

## セットアップ

1. bot-profile-manager をクローン

```bash
git close https://github.com/FungiFur-Strikers/bot-profile-manager
cd bot-profile-manager
```

2. リポジトリのクローン:

```bash
git clone https://github.com/FungiFur-Strikers/bot-profile-manager-ui ./src/ui
```

3. コンテナを起動

```bash
docker compose up -d
```

詳細の手順は [bot-profile-manager](https://github.com/FungiFur-Strikers/bot-profile-manager)の手順を確認

## 開発

VSCode のリモートコンテナを使用してコンテナ内で作業

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - リンターの実行

### プロジェクト構造

```
src/ui/
├── app/                 # アプリケーションのルートディレクトリ
├── components/          # 再利用可能なUIコンポーネント
├── features/           # 機能ごとのコンポーネントとロジック
├── hooks/              # カスタムフック
└── lib/                # ユーティリティ関数とスキーマ
```
