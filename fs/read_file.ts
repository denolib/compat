import { notImplemented } from "../_utils.ts";
const { readFile: denoReadFile, readFileSync: denoReadFileSync } = Deno;

type ReadFileCallback = (err: Error | null, data: string | Uint8Array) => void;

interface ReadFileOptions {
  encoding?: string | null;
  flag?: string;
}

function getEncoding(
  optOrCallback?: ReadFileOptions | ReadFileCallback
): string | null {
  if (!optOrCallback || typeof optOrCallback === "function") {
    return null;
  } else {
    if (optOrCallback.encoding) {
      if (
        optOrCallback.encoding === "utf8" ||
        optOrCallback.encoding === "utf-8"
      ) {
        return "utf8";
      } else {
        notImplemented();
      }
    }
    return null;
  }
}

function maybeDecode(
  data: Uint8Array,
  encoding: string | null
): string | Uint8Array {
  if (encoding === "utf8") {
    return new TextDecoder().decode(data);
  }
  return data;
}

export function readFile(
  path: string,
  optOrCallback: ReadFileCallback | ReadFileOptions,
  callback?: ReadFileCallback
): void {
  let cb: ReadFileCallback | undefined;
  if (typeof optOrCallback === "function") {
    cb = optOrCallback;
  } else {
    cb = callback;
  }

  const encoding = getEncoding(optOrCallback);

  denoReadFile(path)
    .then((data: Uint8Array) => cb && cb(null, maybeDecode(data, encoding)))
    .catch((err: Error) => cb && cb(err, new Uint8Array(0)));
}

export function readFileSync(
  path: string,
  opt?: ReadFileOptions
): string | Uint8Array {
  return maybeDecode(denoReadFileSync(path), getEncoding(opt));
}