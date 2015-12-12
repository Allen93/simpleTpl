/**
 * 默认配置
 *
 * @type {Object}
 */
var defaultOptions = {
  openTag: '{{',
  closeTag: '}}',
  outputTag: '#'
};

/**
 * 包装直接输出的字符串
 *
 * @param  {String} str
 *
 * @return {String}     [description]
 */
function compileStrCode(str) {
  return "+ '" + str + "'";
}
/**
 * 包装执行字符串
 *
 * @param  {String} str
 *
 * @return {String}     [description]
 */
function compileExecCode(str, outputTag) {
  if (str.charAt(0) === outputTag) {
    return "+ (" + str.substr(1).replace('/g') + ")";
  } else {
    return ";" + str + "_$ = _$ ";
  }
}


/**
 * Compiler 构造函数
 *
 * @param {String} source
 * @param {Object} options
 */
function Compiler(source, options) {
  options = options || defaultOptions;
  this.setOriginSource(source);
  this.setOptions(options);
  this.compile();
}


/**
 * 获取源字符串
 *
 * @return {String} [description]
 */
Compiler.prototype.getOriginSource = function() {
  return this._originSource;
};


/**
 * 设置源字符串
 *
 * @param {String} source
 */
Compiler.prototype.setOriginSource = function(source) {
  this._originSource = source;
};


/**
 * 编译源字符串
 *
 * @param  {String} source
 *
 * @return {String}        [description]
 */
Compiler.prototype.compile = function(source) {
  var openTag = this._options.openTag,
    closeTag = this._options.closeTag,
    outputTag = this._options.outputTag;
  source = source || this._originSource;
  var sourceParagraph = source.replace(/[\r\n]/g, "").split(openTag);
  var code;
  var _compileCode = "var _$ = '' ";
  for (var pIndex = 0, pLength = sourceParagraph.length; pIndex < pLength; pIndex++) {
    code = sourceParagraph[pIndex].split(closeTag);
    if (code.length > 1) {
      // 有标签包含的语句
      _compileCode += compileExecCode(code[0], outputTag);
      _compileCode += compileStrCode(code[1]);
    } else {
      // 无标签包含的语句
      _compileCode += compileStrCode(code[0]);
    }
  }
  _compileCode += "; return _$;";
  // 缓存编译后字符串
  this._compiledCode = _compileCode;
  return this._compiledCode;
};


/**
 * 设置
 *
 * @param {Object} options
 */
Compiler.prototype.setOptions = function(options) {
  this._options = options || {};
};


/**
 * 获取配置
 *
 * @return {Object} [description]
 */
Compiler.prototype.getOptions = function() {
  return this._options;
};


/**
 * 链接数据
 *
 * @param  {Object} data
 * @param  {String} source
 *
 * @return {String}        [description]
 */
Compiler.prototype.link = function(data, source) {
  data = data || {};
  source = source || this._compiledCode;
  var keys = [],
    values = [];
  var result;
  for (key in data) {
    keys.push(key);
    values.push(data[key]);
  }
  try {
    result = new Function(keys, source).apply(data, values);
  } catch (e) {
    console.error('We got error when linking string to data; string: ',  source);
    throw e;
  }
  return result;
}