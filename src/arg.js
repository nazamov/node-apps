const colors = require("colors");

function findArg(argKey) {
  return process.argv.find((item) => item.startsWith(argKey));
}

function getParamValue(param, argKey) {
  return param.substring(argKey.length + 1);
}

function getOptArg(argKey) {
  return getParamValue(findArg(argKey) ?? "", argKey);
}

function getArg(argKey) {
  const param = findArg(argKey);

  if (!param)
    throw Error(
      colors.red(`Please set the ${argKey} param: ${argKey}=your-param`)
    );

  const paramValue = getParamValue(param, argKey);
  if (!paramValue == null)
    throw Error(colors(`Invalid ${argKey} value: ` + paramValue));

  return paramValue;
}

module.exports = { getArg, getOptArg };
