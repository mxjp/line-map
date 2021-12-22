
export class LineMap {
	/**
	 * The text that is used for conversions.
	 */
	public readonly text: string;

	/**
	 * An array of start offsets for each line.
	 */
	public readonly offsets: readonly number[];

	/**
	 * Create a new line map for the specified text.
	 *
	 * @param text The text to use for conversions.
	 * @param separator The line separator to use. Default is `"\n"`.
	 */
	public constructor(text: string, separator = "\n") {
		const offsets: number[] = [0];

		let offset = -separator.length;
		while ((offset = text.indexOf(separator, offset + separator.length)) !== -1) {
			offsets.push(offset + separator.length);
		}

		this.offsets = offsets;
		this.text = text;
	}

	/**
	 * Convert an offset to a position.
	 *
	 * @param offset The offset to convert.
	 * @returns The position or undefined if the offset is out of bounds.
	 */
	public getPosition(offset: number): Position | null {
		const { offsets: _offsets, text: _text } = this;

		let min = 0;
		let max = _offsets.length - 1;
		while (min <= max) {
			const line = (min + max) >> 1;
			if (offset < _offsets[line]) {
				max = line - 1;
			} else if (offset >= ((line + 1 < _offsets.length) ? _offsets[line + 1] : _text.length)) {
				min = line + 1;
			} else {
				return {
					line,
					character: offset - _offsets[line],
				};
			}
		}

		return null;
	}

	/**
	 * Convert a position to an offset.
	 *
	 * @param position The position to convert.
	 * @returns The offset or undefined if the position is out of bounds.
	 */
	public getOffset(position: Position): number | null {
		const { offsets: _offsets, text: _text } = this;
		const { line, character } = position;
		if (line < 0 || character < 0 || line >= _offsets.length) {
			return null;
		}
		const lineOffset = _offsets[line];
		const lineLength = ((line + 1 < _offsets.length) ? _offsets[line + 1] : _text.length) - lineOffset;
		if (character >= lineLength) {
			return null;
		}
		return lineOffset + character;
	}
}

export interface Position {
	line: number;
	character: number;
}
