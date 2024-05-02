# コーポレートサイト

## 目次
- [外部ドキュメント一覧](#外部ドキュメント一覧)
- [システム構成](#システム構成)
- [使用技術について](#使用技術について)
- [環境構築手順](#環境構築手順)
- [ディレクトリ構成](#ディレクトリ構成)
- [Gitの運用について](#Gitの運用について) 
- [デプロイ](#デプロイ)

## 外部ドキュメント一覧
- [Next.js](https://nextjs.org/docs)
- [Newt（ヘッドレスCMS）](https://www.newt.so/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## システム構成

## 使用技術について
### nodeバージョン
- node v21.7.3
- npm v10.5.0

### フロント
- Next.js with app router v14.2.3
- TypeScript v5

### スタイリング
- Tailwind CSS v3.4.1

### ホスティング
- Cloudflare Pages

### CMS
- Newt

## 環境構築手順

```bash
# パッケージインストール
npm install

# 開発サーバー起動
npm run dev
```

[http://localhost:3000](http://localhost:3000)でWebページを確認できます。

## ディレクトリ構成

## Gitの運用について

## デプロイ
mainブランチに成果物がマージされると、CI/CD で自動的に `Cloudflare Pages` へデプロイされます。
