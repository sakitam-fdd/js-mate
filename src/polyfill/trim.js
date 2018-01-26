if (!String.prototype.trim) {
  /* eslint no-extend-native: "off" */
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }
}
