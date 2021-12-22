import test from "ava";
import { LineMap, Position } from "../src";

function p(line: number, character: number): Position {
	return { line, character };
}

function pToString(position: Position) {
	return `${position.line}:${position.character}`;
}

const map = new LineMap("\na\n\nbc\n");

test("offsets", t => {
	t.deepEqual(map.offsets, [0, 1, 3, 4, 7]);
});

test("offsets (custom separator)", t => {
	const customMap = new LineMap("a###bcd###e", "###");
	t.deepEqual(customMap.offsets, [0, 4, 10]);
});

test("offsets (empty text)", t => {
	const customMap = new LineMap("");
	t.deepEqual(customMap.offsets, [0]);
});

for (const [offset, position] of [
	[0, p(0, 0)],
	[1, p(1, 0)],
	[2, p(1, 1)],
	[3, p(2, 0)],
	[4, p(3, 0)],
	[5, p(3, 1)],
	[6, p(3, 2)],

	[-2, null],
	[-1, null],
	[7, null],
	[8, null],

	[null, p(-1, 0)],
	[null, p(0, -1)],
	[null, p(-1, -1)],
	[null, p(0, 1)],
	[null, p(1, -1)],
	[null, p(1, 2)],
	[null, p(2, -1)],
	[null, p(2, 1)],
	[null, p(3, -1)],
	[null, p(3, 3)],
	[null, p(4, -1)],
	[null, p(4, 0)],
] as [number | null, Position | null][]) {
	if (offset !== null) {
		test(`getPosition(${offset} => ${position ? pToString(position) : "null"})`, t => {
			t.deepEqual(map.getPosition(offset), position);
		});
	}

	if (position !== null) {
		test(`getOffset(${position.line}:${position.character} => ${offset ?? "null"})`, t => {
			t.deepEqual(map.getOffset(position), offset);
		});
	}
}
