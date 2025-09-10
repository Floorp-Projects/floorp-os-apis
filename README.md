API schema via Protocol Buffers (source of truth)

Structure

- proto/: .proto files split by domain
  - common.proto
  - browser_info.proto
  - scraper.proto
  - tabs.proto
- index.sys.mts: TypeScript aggregator (re‑exports generated types once wired)

Generate TypeScript (Buf + ts-proto)
Prereqs:

- Buf CLI (https://buf.build) をインストール
  - Windows (PowerShell 例): `winget install Buf.Buf` もしくは `choco install buf` / `scoop install buf`
- (不要) 旧来の protoc / ts-proto npm インストールは不要。Buf がリモートプラグイン `buf.build/community/stephenh-ts-proto` を実行します。

Files added / updated:

- `buf.yaml` (module config at repo root; proto files live under `proto/`)
- `buf.gen.yaml` (ts-pro ト プラグイン設定)

Command (repo root):

```
buf generate
```

Output:

- `gen/ts/proto/*.ts` に生成されます (ts-proto の相対パス構造保持)。

NOTE: 現在はリポジトリ root が module root のため import には `proto/` prefix が必要です。

オプション調整は `buf.gen.yaml` の `opt:` を編集してください。

旧 protoc 手順は不要になりました。必要であれば過去コミットを参照してください。

Generate Rust (prost / tonic)
Option A: build.rs in your Rust crate

```
// build.rs
fn main() {
  let proto_dir = "src/apps/modules/src/modules/os-server/api-types/proto";
  let files = [
    format!("{proto_dir}/common.proto"),
    format!("{proto_dir}/browser_info.proto"),
    format!("{proto_dir}/scraper.proto"),
    format!("{proto_dir}/tabs.proto"),
  ];
  prost_build::Config::new()
    .out_dir("src/pb")
    .compile_protos(&files, &[proto_dir])
    .unwrap();
}
```

Option B: tonic-build (if defining gRPC services later)

Notes on JSON mapping

- Server currently returns some `string | null` fields. Proto3 JSON does not use `null` for scalars; prefer `optional` fields and omit them when absent.
- For base64 images, prefer `bytes` in proto; if you keep `string`, return a data URL or base64 string consistently.
- Enums are serialized as strings in JSON mapping; keep names stable.

Migration plan

1. Generate TS types into `gen/ts` and export them.
2. Update `server.sys.mts` to import generated types (instead of handwritten ones).
3. Adjust response payloads to follow Proto JSON mapping (omit vs null).
4. Update Rust caller to use Prost-generated types. If staying on HTTP/JSON, use pbjson or manual serde structs mirroring proto JSON mapping.
