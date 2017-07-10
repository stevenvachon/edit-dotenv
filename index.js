"use strict";
const EOL = require("os").EOL;
const escapeStringRegexp = require("escape-string-regexp");
const normalizeEOL = require("eol").auto;

const flags = "gm";
const breakPattern = /\n/g;
const breakReplacement = "\\n";
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
		const value = changes[varname].replace(breakPattern, breakReplacement)
		                              .replace(returnPattern, returnReplacement)
		                              .trim();

		const safeName = escapeStringRegexp(varname);

		const varPattern = new RegExp(`^(${h}*${safeName}${h}*=${h}*)\\S*(${h}*)$`, flags);

		if (varPattern.test(result))
		{
			const safeValue = value.replace(groupPattern, groupReplacement);

			result = result.replace(varPattern, `$1${safeValue}$2`);
		}
		else if (result === "")
		{
			result = `${varname}=${value}${EOL}`;
			hasAppended = true;
		}
		else if (!result.endsWith(EOL) && !hasAppended)
		{
			// Add an extra break between previously defined and newly appended variable
			result += `${EOL}${EOL}${varname}=${value}`;
			hasAppended = true;
		}
		else if (!result.endsWith(EOL))
		{
			// Add break for appended variable
			result += `${EOL}${varname}=${value}`;
		}
		else if (result.endsWith(EOL) && !hasAppended)
		{
			// Add an extra break between previously defined and newly appended variable
			result += `${EOL}${varname}=${value}${EOL}`;
			hasAppended = true;
		}
		else /*if (result.endsWith(EOL))*/
		{
			// Add break for appended variable
			result += `${varname}=${value}${EOL}`;
		}

		return result;

	}, normalizeEOL(envString));
};



module.exports = editDotenv;
