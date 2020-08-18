ace.define("ace/hevo",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

  exports.isDark = true;
  exports.cssClass = "ace-hevo";
  exports.cssText = ".ace-hevo .ace_gutter {\
background: #2a2c3c;\
color: #8F908A\
}\
.ace-hevo .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-hevo {\
background-color: #313347;\
color: #F8F8F2\
}\
.ace-hevo .ace_cursor {\
color: #F8F8F0\
}\
.ace-hevo .ace_marker-layer .ace_selection {\
background: #49483E\
}\
.ace-hevo.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #313347;\
}\
.ace-hevo .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-hevo .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.ace-hevo .ace_marker-layer .ace_active-line {\
background: rgba(0, 0, 0, .1)\
}\
.ace-hevo .ace_gutter-active-line {\
background-color: rgba(0, 0, 0, .1)\
}\
.ace-hevo .ace_marker-layer .ace_selected-word {\
border: 1px solid #49483E\
}\
.ace-hevo .ace_invisible {\
color: #52524d\
}\
.ace-hevo .ace_entity.ace_name.ace_tag,\
.ace-hevo .ace_keyword,\
.ace-hevo .ace_meta.ace_tag,\
.ace-hevo .ace_storage {\
color: #F92672\
}\
.ace-hevo .ace_punctuation,\
.ace-hevo .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-hevo .ace_constant.ace_character,\
.ace-hevo .ace_constant.ace_language,\
.ace-hevo .ace_constant.ace_numeric,\
.ace-hevo .ace_constant.ace_other {\
color: #AE81FF\
}\
.ace-hevo .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-hevo .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-hevo .ace_support.ace_constant,\
.ace-hevo .ace_support.ace_function {\
color: #66D9EF\
}\
.ace-hevo .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-hevo .ace_storage.ace_type,\
.ace-hevo .ace_support.ace_class,\
.ace-hevo .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.ace-hevo .ace_entity.ace_name.ace_function,\
.ace-hevo .ace_entity.ace_other,\
.ace-hevo .ace_entity.ace_other.ace_attribute-name,\
.ace-hevo .ace_variable {\
color: #A6E22E\
}\
.ace-hevo .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-hevo .ace_string {\
color: #E6DB74\
}\
.ace-hevo .ace_comment {\
color: #75715E\
}\
.ace-hevo .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}";

  var dom = require("ace/lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});
