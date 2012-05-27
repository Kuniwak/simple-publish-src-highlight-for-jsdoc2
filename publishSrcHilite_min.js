// This script licensed under the MIT.
// http://orgachem.mit-license.org

JSDOC.PluginManager.registerPlugin(
	"JSDOC.publishSrcHilite_min",
	{
		onSymbol: function(symbol) {
			if (symbol.is("FILE")) return;
			
			symbol.srcLineNum = -1;
			
			var comment = symbol.comment;
			if (!comment.isUserComment) return;
			
			var src = this.srcCache[symbol.srcFile];
			if (!src) {
				src = this.srcCache[symbol.srcFile] = IO.readFile(symbol.srcFile);
				if (!src) return;
			}
			
			var pos = src.indexOf(comment.originalComment);
			if (pos==-1) return;
			
			var num = src.substr(0, pos).split(/\r\n|\r|\n/).length;
			
			symbol.srcLineNum = num;
		},
		srcCache: {}
  }
);

//Overwrite JSDOC.DocComment#parse
JSDOC.DocComment.prototype.parse = (function(){
	var _parse = JSDOC.DocComment.prototype.parse;
	
	return function(comment) {
		this.originalComment = comment;
		return _parse.call(this, comment);
	};
})(); 
