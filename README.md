API schema via Protocol Buffers (source of truth)

Structure
- proto/: .proto files split by domain
  - common.proto
  - browser_info.proto
  - scraper.proto
  - tabs.proto
- index.sys.mts: TypeScript aggregator (re‑exports generated types once wired)

Generate TypeScript (ts-proto)
Prereqs:
- protoc installed and on PATH
- ts-proto installed locally: npm i -D ts-proto

Commands (from repo root):

```
PROTO_DIR=src/apps/modules/src/modules/os-server/api-types/proto
OUT_DIR=src/apps/modules/src/modules/os-server/api-types/gen/ts

mkdir -p "$OUT_DIR"

./node_modules/.bin/protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out="$OUT_DIR" \
  --ts_proto_opt=esModuleInterop=true,outputServices=false,useOptionals=all,env=browser,json_names=true,forceLong=string \
  -I "$PROTO_DIR" \
  $(ls "$PROTO_DIR"/*.proto)
```

This generates ESM TypeScript files per proto into `gen/ts`. You can then re-export from `api-types/index.sys.mts`.

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
1) Generate TS types into `gen/ts` and export them.
2) Update `server.sys.mts` to import generated types (instead of handwritten ones).
3) Adjust response payloads to follow Proto JSON mapping (omit vs null).
4) Update Rust caller to use Prost-generated types. If staying on HTTP/JSON, use pbjson or manual serde structs mirroring proto JSON mapping.

