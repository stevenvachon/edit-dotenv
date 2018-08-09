"use strict";
const {auto: normalizeEOL} = require("eol");
const {EOL} = require("os");
const escapeStringRegexp = require("escape-string-regexp");

const breakPattern = /\n/g;
const breakReplacement = "\\n";
const flags = "gm";
const groupPattern = /\$/g;
const groupReplacement = "$$$";
const h = "[^\\S\\r\\n]";  // simulate `\h`
const returnPattern = /\r/g;
const returnReplacement = "\\r";



const editDotenv = (envString, changes) =>
{
	let hasAppended = false;

	return Object.keys(changes).reduce((result, varname) =>
	{
		const value = changes[varname]
			.replace(breakPattern, breakReplacement)
			.replace(returnPattern, returnReplacement)
			.trim();

		const safeName = escapeStringRegexp(varname);

		const varPattern = new RegExp(`^(${h}*${safeName}${h}*=${h}*)\\S*(${h}*)$`, flags);

		if (varPattern.test(result))
		{
			const safeValue = value.replace(groupPattern, groupReplacement);

			return result.replace(varPattern, `$1${safeValue}$2`);
		}
		else if (result === "")
		{
			hasAppended = true;

			return `${varname}=${value}${EOL}`;
		}
		else if (!result.endsWith(EOL) && !hasAppended)
		{
			hasAppended = true;

			// Add an extra break between previously defined and newly appended variable
			return `${result}${EOL}${EOL}${varname}=${value}`;
		}
		else if (!result.endsWith(EOL))
		{
			// Add break for appended variable
			return `${result}${EOL}${varname}=${value}`;
		}
		else if (result.endsWith(EOL) && !hasAppended)
		{
			hasAppended = true;

			// Add an extra break between previously defined and newly appended variable
			return `${result}${EOL}${varname}=${value}${EOL}`;
		}
		else /*if (result.endsWith(EOL))*/
		{
			// Add break for appended variable
			return `${result}${varname}=${value}${EOL}`;
		}

	}, normalizeEOL(envString));
};



module.exports = editDotenv;
