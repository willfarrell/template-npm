// Copyright 2025 - 2026 will Farrell.
// SPDX-License-Identifier: MIT
/**
 * Sample function
 */
export const fct = () => {
	/**
	 * Sample function
	 * @param {input} any
	 */
	return (input) => {
		if (input) {
			return true;
		}
		throw new Error("false");
	};
};

export default fct;
