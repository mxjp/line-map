# `line-map`
Convert between lines/columns and offsets.

## Why?
+ Has a one-to-one mapping between positions and offsets:
    + For every position there is exactly one offset and vice versa.
    + Converting positions and offsets that do not exist will return undefined.
+ Position objects are compatible with vscode's extension api.
+ Can be used to find all line start offsets in a string.
+ Supports custom line separators.
    + By default `\n` is used, which will also work with `\r\n`.
+ Conversions using an existing line map are very fast:
    + Converting position to offset has a complexity of `O(1)`.
    + Converting offset to position has a time complexity of `O(log n)` where n is the number of lines.
+ Exports both CommonJS and ES modules.

## Usage
```ts
import { LineMap } from "line-map";

const map = new LineMap("\n  Hello World!\n");

map.getPosition(4);
// => { line: 1, character: 1 }

map.getOffset({ line: 1, character: 1 });
// => 4

map.offsets
// => [0, 1, 16]

map.text
// => "\n  Hello World!\n"
```
