!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("UIExtension")):"function"==typeof define&&define.amd?define(["UIExtension"],e):"object"==typeof exports?exports.EditTextObject=e(require("UIExtension")):t.EditTextObject=e(t.UIExtension)}(self,(function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(e,n){e.exports=t},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0));function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var a=function(t){function e(){return r(this,e),i(this,t.apply(this,arguments))}return c(e,t),e.prototype.mounted=function(){var e=this;t.prototype.mounted.call(this),this.addDestroyHook(this.getPDFUI().addViewerEventListener(o.PDFViewCtrl.Events.switchStateHandler,(function(t){switch(t.getStateName()){case"add-text-object":e.component.enable(),e.component.canBeDisabled=!1;break;default:e.component.canBeDisabled=!0,e.component.disable()}})))},e}(o.Controller);e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(1);function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var c=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,n));return o.currentTextObjects=[],o}return i(e,t),e.prototype.postlink=function(){var t=this;this.component.disable(),this.addDestroyHook(this.getPDFUI().addViewerEventListener("text-object-active",(function(e){t.currentTextObjects.push(e),t.component.enable(),t.active(e)})),this.getPDFUI().addViewerEventListener("text-object-unactive",(function(e){var n=t.currentTextObjects.indexOf(e);n>-1&&t.currentTextObjects.splice(n,1),t.deactive(e),0===t.currentTextObjects.length&&t.component.disable()})))},e.prototype.active=function(t){},e.prototype.deactive=function(t){},e}(((o=r)&&o.__esModule?o:{default:o}).default);e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),r=y(n(4));n(5);var i=y(n(6)),c=y(n(7)),a=y(n(12)),l=y(n(13)),s=y(n(14)),u=y(n(15)),f=y(n(16)),p=y(n(17)),d=y(n(18));function y(t){return t&&t.__esModule?t:{default:t}}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function m(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}o.UIConsts.FRAGMENT_ACTION;var v=function(t){function e(){return b(this,e),h(this,t.apply(this,arguments))}return m(e,t),e.getName=function(){return"editTextObject"},e.getLoader=function(){return r.default},e.initOnLoad=function(){var t=o.modular.module("edit-text-object",[]);t.registerController(i.default),t.registerController(a.default),t.registerController(l.default),t.registerController(s.default),t.registerController(f.default),t.registerController(p.default),t.registerController(d.default),t.registerComponent(c.default),t.registerComponent(u.default),[{name:"add-text-button",template:'<xbutton name="fv--addon-add-text-button" icon-class="fv__icon-addon-textobject-add-text" @controller="edit-text-object:AddTextStateController" @tooltip tooltip-title="edit-text:buttons.addText">edit-text:buttons.addText</xbutton>'},{name:"text-bold-style-button",template:'<xbutton name="fv--addon-textobject-bold-style" icon-class="fv__icon-addon-textobject-bold" @controller="edit-text-object:BoldStyleController" @tooltip tooltip-title="edit-text:buttons.editFontWeight">edit-text:buttons.editFontWeight</xbutton>'},{name:"text-italic-style-button",template:'<xbutton name="fv--addon-textobject-italic-style" icon-class="fv__icon-addon-textobject-italic" @controller="edit-text-object:ItalicStyleController" @tooltip tooltip-title="edit-text:buttons.editFontItalic">edit-text:buttons.editFontItalic</xbutton>'},{name:"text-underline-button",template:'<xbutton name="fv--addon-text-underline-button" icon-class="fv__icon-addon-textobject-underline" @controller="edit-text-object:UnderlineStyleController" @tooltip tooltip-title="edit-text:buttons.underline">edit-text:buttons.underline</xbutton>'},{name:"font-color-picker",template:'<edit-text-object:text-color-picker name="fv--addon-textobject-font-color" align="center" @controller="edit-text-object:FontColorController">'},{name:"font-style-dropdown",template:'<edit-text-object:font-family-size-dropdown name="fv--addon-textobject-font-family-size-dropdown">'},{name:"align-left-button",template:'<xbutton name="fv--addon-align-left-button" icon-class="fv__icon-addon-textobject-align-left" @tooltip tooltip-title="edit-text:buttons.alignLeft">edit-text:buttons.alignLeft</xbutton>'},{name:"align-center-button",template:'<xbutton name="fv--addon-align-center-button" icon-class="fv__icon-addon-textobject-align-center" @tooltip tooltip-title="edit-text:buttons.alignCenter">edit-text:buttons.alignCenter</xbutton>'},{name:"align-justify-button",template:'<xbutton name="fv--addon-align-justify-button" icon-class="fv__icon-addon-textobject-align-justify" @tooltip tooltip-title="edit-text:buttons.alignJustify">edit-text:buttons.alignJustify</xbutton>'},{name:"line-spacing-button",template:'<xbutton name="fv--addon-line-spacing-button" icon-class="fv__icon-addon-textobject-line-spacing" @tooltip tooltip-title="edit-text:buttons.lineSpacing">edit-text:buttons.lineSpacing</xbutton>'},{name:"word-spacing-button",template:'<xbutton name="fv--addon-word-spacing-button" icon-class="fv__icon-addon-textobject-word-spacing" @tooltip tooltip-title="edit-text:buttons.wordSpacing">edit-text:buttons.wordSpacing</xbutton>'},{name:"character-scale-button",template:'<xbutton name="fv--addon-character-scale-button" icon-class="fv__icon-addon-textobject-character-scale" @tooltip tooltip-title="edit-text:buttons.characterScale">edit-text:buttons.characterScale</xbutton>'}].forEach((function(e){t.registerPreConfiguredComponent(e.name,e)}))},e.prototype.beforeMounted=function(t){var e=t.getComponentByName("edit-tab");e&&e.show()},e.prototype.fragments=function(){return[]},e}(o.UIXAddon);e.default=v},function(t,e){t.exports=null},function(t,e,n){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),i=n(1),c=(o=i)&&o.__esModule?o:{default:o};function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var l=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,n)),r=window.EditTextObject,i=r.addonInfo,c=i.standardFontFamilies||[],a=i.extensionFontFamilies||[];return o.standardFontFamilies=c,o.extensionFontFamilies=a,c.forEach((function(t){t.type="standard"})),a.forEach((function(t){t.type="ext"})),o.fontFamilies=c.concat(a),o.fontSizes=r.addonInfo.customFontSizes||[],o.currentTextObjects=[],o}return a(e,t),e.getName=function(){return"FontFamilySizeController"},e.prototype.mounted=function(){var e=this;t.prototype.mounted.call(this),this.selectFontFamily(this.fontFamilies[0]),this.fontSizes.indexOf(16)>-1?this.selectFontSize(16):this.selectFontSize(this.fontSizes[0]),this.addDestroyHook(this.getPDFUI().addViewerEventListener("text-object-active",(function(t){e.currentTextObjects.push(t),1===e.currentTextObjects.length&&e.active(t)})),this.getPDFUI().addViewerEventListener("text-object-unactive",(function(t){var n=e.currentTextObjects.indexOf(t);n>-1&&e.currentTextObjects.splice(n,1),0===e.currentTextObjects.length&&e.deactive(t)})),this.getPDFUI().addViewerEventListener(r.PDFViewCtrl.Events.openFileSuccess,(function(){e.component.disable()})),this.component.on("change",(function(t,n){if(0!==e.currentTextObjects.length)switch(t){case"fontFamily":for(var o=e.fontFamilies,r=o.length,i="string"==typeof n,c=!1,a=0;a<r;a++){var l=o[a];if(i&&l.text===n||l.name===n){e.applyFontFamily(l),c=!0;break}}i||c||e.applyFontFamily(n);break;case"fontSize":(n=+n)>100?n=100:n<.1&&(n=.1),e.applyFontSize(n)}})))},e.prototype.active=function(t){var e=this;this.component.enable();var n=t.getModel().info.textState.size,o=r.PDFViewCtrl.shared.units,i=o.POINT.convertTo(n,o.PIXEL_HORIZONTAL);this.component.selectFontSize(i);this.component.selectFontFamily(function(t){var n=t.getModel().getFontInfo();if(n.isStandard){for(var o=0,r=e.standardFontFamilies.length;o<r;o++){var i=e.standardFontFamilies[o];if(i.value===n.standardId)return i}return{text:n.baseName,value:n.standardId,standard:!0,type:"standard"}}return{text:n.baseName,name:n.baseName,style:n.styles,charset:n.charset,type:"ext"}}(t))},e.prototype.deactive=function(){this.component.disable()},e.prototype.selectFontFamily=function(t){var e=this.component.currentFontFamily;this.component.selectFontFamily(t),JSON.stringify(e)!==JSON.stringify(t)&&this.component.trigger("change","fontFamily",t,e)},e.prototype.applyFontFamily=function(t){0!==this.currentTextObjects.length&&this.currentTextObjects.forEach((function(e){var n=e.getModel();switch(t.type){case"standard":n.setStandardFont(t.value).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()}));break;case"ext":n.setFontByName(t.name,t.style,t.charset).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()}))}}))},e.prototype.selectFontSize=function(t){var e=this.component.currentFontSize;this.component.selectFontSize(t),e!=t&&this.component.trigger("change","fontSize",t,e)},e.prototype.applyFontSize=function(t){0!==!this.currentTextObjects.length&&this.currentTextObjects.forEach((function(e){var n=r.PDFViewCtrl.shared.units,o=e.getModel();o.setFontSize(n.PIXEL_HORIZONTAL.convertTo(t,n.POINT)).then((function(){return o.setText(e.getTextChar())})).then((function(t){e.reActive()}))}))},e.prototype.renderFontFamilyItem=function(t){return"Symbol"===t.text?"":'font-family: "'+(t.name||t.text)+'"'},e}(c.default);e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),i=n(8),c=(o=i)&&o.__esModule?o:{default:o};function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var l=function(t){function e(n,o,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,n,o,r))}return a(e,t),e.getName=function(){return"font-family-size-dropdown"},e.getMetadata=function(){return{options:{align:{type:"enum",enums:["left","center","right","client-center"],defaultValue:"left"}}}},e.prototype.createDOMElement=function(){return document.createElement("div")},e.prototype.postlink=function(){var e=this;t.prototype.postlink.call(this),this.fontFamilyDropdownComponent=this.getComponentByName("font-family-dropdown"),this.fontSizeDropdownComponent=this.getComponentByName("font-size-dropdown"),this.fontFamilyDropdownText=this.fontFamilyDropdownComponent.textElement,this.fontFamilyDropdownComponent.align=this.align,this.fontSizeDropdownComponent.align=this.align,this.addDestroyHook(this.fontSizeDropdownComponent.on("change",(function(t){e.trigger("change","fontSize",t)})),this.fontFamilyDropdownComponent.on("change",(function(t){e.trigger("change","fontFamily",t)})))},e.prototype.getFontFamily=function(){return this.currentFontFamily},e.prototype.selectFontFamily=function(t){var e=this.fontFamilyDropdownComponent.findChildren((function(e){return e.controller.data.fontFamily===t}))[0];e&&this.fontFamilyDropdownComponent.select(e),this.fontFamilyDropdownComponent.setText(t.text),"Symbol"===t.text?this.fontFamilyDropdownText.style.cssText+="font-family: inherit":this.fontFamilyDropdownText.style.cssText+='font-family: "'+(t.name||t.text)+'"',this.currentFontFamily=t},e.prototype.selectFontSize=function(t){var e=this.fontSizeDropdownComponent.findChildren((function(e){return e.controller.data.fontSize===t}))[0];e&&this.fontSizeDropdownComponent.select(e),this.fontSizeDropdownComponent.setEditValue(t),this.currentFontSize=t},e.prototype.getFontSize=function(){return this.currentFontSize},e}(r.SeniorComponentFactory.createSuperClass({template:(0,c.default)(),fragments:[{target:"font-family-dropdown",config:{}},{target:"font-size-dropdown",config:{editOptions:{type:"number",step:.1}}}]}));e.default=l},function(t,e,n){n(9);t.exports=function(t){"use strict";t=t||{};return'<div class="fv__ui-addon-font-family-size-dropdown" @controller="edit-text-object:FontFamilySizeController as ffsc">\n    <dropdown name="font-family-dropdown" class="fv__ui-addon-font-family-dropdown" @tooltip tooltip-title="edit-text:dropdowns.editFontFamily" separate="false">\n        <dropdown-button \n            @foreach="fontFamily in ffsc.fontFamilies" \n            @sync.text="fontFamily.text" \n            @sync.attr.style="ffsc.renderFontFamilyItem(fontFamily)"\n            @on.click="ffsc.selectFontFamily(fontFamily)"\n        ></dropdown-button>\n    </dropdown>\n    <dropdown name="font-size-dropdown" editable="true" class="fv__ui-addon-font-size-dropdown" @tooltip tooltip-title="edit-text:dropdowns.editFontSize">\n        <dropdown-button\n            @foreach="fontSize in ffsc.fontSizes"\n            @sync.text="fontSize"\n            @on.click="ffsc.selectFontSize(fontSize)"\n        ></dropdown-button>\n    </dropdown>\n</div>','<div class="fv__ui-addon-font-family-size-dropdown" @controller="edit-text-object:FontFamilySizeController as ffsc">\n    <dropdown name="font-family-dropdown" class="fv__ui-addon-font-family-dropdown" @tooltip tooltip-title="edit-text:dropdowns.editFontFamily" separate="false">\n        <dropdown-button \n            @foreach="fontFamily in ffsc.fontFamilies" \n            @sync.text="fontFamily.text" \n            @sync.attr.style="ffsc.renderFontFamilyItem(fontFamily)"\n            @on.click="ffsc.selectFontFamily(fontFamily)"\n        ></dropdown-button>\n    </dropdown>\n    <dropdown name="font-size-dropdown" editable="true" class="fv__ui-addon-font-size-dropdown" @tooltip tooltip-title="edit-text:dropdowns.editFontSize">\n        <dropdown-button\n            @foreach="fontSize in ffsc.fontSizes"\n            @sync.text="fontSize"\n            @on.click="ffsc.selectFontSize(fontSize)"\n        ></dropdown-button>\n    </dropdown>\n</div>'}},function(t,e,n){"use strict";t.exports=n(10)},function(t,e,n){"use strict";(function(e){
/*! art-template@runtime | https://github.com/aui/art-template */
var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{},o=Object.create(n),r=/["&'<>]/;o.$escape=function(t){return function(t){var e=""+t,n=r.exec(e);if(!n)return t;var o="",i=void 0,c=void 0,a=void 0;for(i=n.index,c=0;i<e.length;i++){switch(e.charCodeAt(i)){case 34:a="&#34;";break;case 38:a="&#38;";break;case 39:a="&#39;";break;case 60:a="&#60;";break;case 62:a="&#62;";break;default:continue}c!==i&&(o+=e.substring(c,i)),c=i+1,o+=a}return c!==i?o+e.substring(c,i):o}(function t(e){"string"!=typeof e&&(e=null==e?"":"function"==typeof e?t(e.call(e)):JSON.stringify(e));return e}(t))},o.$each=function(t,e){if(Array.isArray(t))for(var n=0,o=t.length;n<o;n++)e(t[n],n);else for(var r in t)e(t[r],r)},t.exports=o}).call(this,n(11))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(2);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var l=function(t){function e(){return i(this,e),c(this,t.apply(this,arguments))}return a(e,t),e.getName=function(){return"BoldStyleController"},e.prototype.active=function(t){t.getModel().isBold()?this.component.active():this.component.deactive()},e.prototype.handle=function(){var t=this;0!==this.currentTextObjects.length?this.currentTextObjects.forEach((function(e){var n=e.getModel();t.component.isActive?n.setBold(!1).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()})):n.setBold(!0).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()}))})):this.component.isActive?this.component.deactive():this.component.active()},e}(((o=r)&&o.__esModule?o:{default:o}).default);e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(2);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var l=function(t){function e(){return i(this,e),c(this,t.apply(this,arguments))}return a(e,t),e.getName=function(){return"ItalicStyleController"},e.prototype.active=function(t){t.getModel().isItalic()?this.component.active():this.component.deactive()},e.prototype.handle=function(){var t=this;0!==this.currentTextObjects.length?this.currentTextObjects.forEach((function(e){var n=e.getModel();t.component.isActive?n.setItalic(!1).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()})):n.setItalic(!0).then((function(){return n.setText(e.getTextChar())})).then((function(t){e.reActive()}))})):this.component.isActive?this.component.deactive():this.component.active()},e}(((o=r)&&o.__esModule?o:{default:o}).default);e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(2);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var l=function(t){function e(){return i(this,e),c(this,t.apply(this,arguments))}return a(e,t),e.getName=function(){return"UnderlineStyleController"},e.prototype.active=function(t){t.getModel().info.textState.font},e}(((o=r)&&o.__esModule?o:{default:o}).default);e.default=l},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var c=function(t){function e(){return o(this,e),r(this,t.apply(this,arguments))}return i(e,t),e.getName=function(){return"text-color-picker"},e.prototype.postlink=function(){var e=this;t.prototype.postlink.call(this);var n=this.iconElement,o=document.createElement("i");o.classList.add("fv__ui-addon-textobject-color-status"),n.appendChild(o);var r=this.getComponentByName("addon-textobject-color-picker");this.colorPicker=r,this.colorStatuesElement=o;var i=function(t){t.stopPropagation()};r.element.addEventListener("mouseup",i),this.addDestroyHook((function(){r.element&&r.element.removeEventListener("mouseup",i)})),this.setColor("#000000");var c=function(){e.freeze()},a=function(){e.unfreeze()};r.on("change",(function(t,n){e.updateColorStatus(n),e.trigger("change",n),e.controller.handle(n)})),r.on("postrender",(function(){r.$colorInput.off("show.spectrum",c).on("show.spectrum",c),r.$colorInput.off("hide.spectrum",a).on("hide.spectrum",a)})),r.trigger("postrender")},e.prototype.setColor=function(t){this.colorPicker.setValue(t),this.updateColorStatus(t)},e.prototype.getColor=function(){return this.colorPicker.getValue()},e.prototype.updateColorStatus=function(t){this.colorStatuesElement.style.cssText+="background-color: "+t},e}(function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)).SeniorComponentFactory.createSuperClass({template:'\n        <dropdown class="fv__ui-addon-textobject-font-color" icon-class="fv__icon-addon-textobject-font-color" @tooltip tooltip-title="edit-text:buttons.editFontColor" text="edit-text:buttons.editFontColor" separate="false">\n            <dropdown-item> \n                <color class="fv__ui-addon-textobject-color-picker" name="addon-textobject-color-picker"></color>\n            </dropdown-item> \n        </dropdown>\n    ',fragments:[{target:"addon-textobject-color-picker",config:{colors:["#ff6633","#ff00ff","#ffcc00","#00ffff","#00ff00","#ffff00","#ff0000","#993399","#cc99ff","#ff99cc","#0000ff","#66cc33","#000000","#333333","#666666","#999999","#cccccc","#ffffff"],transparentclass:"fv__ui-property-icon-nocolor",addclass:"fv__ui-property-icon-add-color",removeclass:"fv__ui-property-icon-remove-color",deleteclass:"fv__ui-property-icon-delete-color-",selectedclass:"fv__ui-property-icon-selected-color-",lightpostname:"light",darkpostname:"dark"}}]}));e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),i=n(1);function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var a=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,n));return o.currentTextObjects=[],o}return c(e,t),e.getName=function(){return"FontColorController"},e.prototype.mounted=function(){var e=this;t.prototype.mounted.call(this),this.addDestroyHook(this.getPDFUI().addViewerEventListener("text-object-active",(function(t){if(e.currentTextObjects.push(t),!(e.currentTextObjects.length>2)){e.component.enable();var n=t.getModel().getFillColor(),o=16777215&n;0===(n>>24&255)?e.component.setColor("transparent"):e.component.setColor(function(t){if(t<0)return"#000000";var e=t.toString(16),n=6;t>16777215&&(n=8);for(;e.length<n;)e="0"+e;return"#"+e}(o))}})),this.getPDFUI().addViewerEventListener("text-object-unactive",(function(t){var n=e.currentTextObjects.indexOf(t);n>-1&&e.currentTextObjects.splice(n,1),0===e.currentTextObjects.length&&e.component.disable()})),this.getPDFUI().addViewerEventListener(r.PDFViewCtrl.Events.openFileSuccess,(function(){e.component.disable()})))},e.prototype.handle=function(t){0!==this.currentTextObjects.length&&this.currentTextObjects.forEach((function(e){var n=e.getModel();if("transparent"===t)n.setFillColor(0).then((function(){return n.setText(e.getTextChar())})).then((function(){e.reActive()}));else{var o=parseInt(t.substring(1),16);n.setFillColor(255<<24|o).then((function(){return n.setText(e.getTextChar())})).then((function(){e.reActive()}))}}))},e}(((o=i)&&o.__esModule?o:{default:o}).default);e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0));function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):function(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(e,r);i&&i.configurable&&void 0===t[r]&&Object.defineProperty(t,r,i)}}(t,e))}var c=function(t){function e(n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,n,"add-text-object"));return o.isStateIn=!1,o}return i(e,t),e.getName=function(){return"AddTextStateController"},e.prototype.mounted=function(){var e=this;t.prototype.mounted.call(this);var n=this.getComponentByName("fv--addon-textobject-font-family-size-dropdown"),o=this.getComponentByName("fv--addon-textobject-bold-style"),r=this.getComponentByName("fv--addon-textobject-italic-style"),i=this.getComponentByName("fv--addon-textobject-font-color"),c=function(){e.isStateIn&&e.updateUIData()};this.addDestroyHook(n.on("change",c),o.on("active",c),r.on("active",c),o.on("deactive",c),r.on("deactive",c),i.on("change",c)),this.fontFamilySizeDropdown=n,this.boldStyleButton=o,this.italicStyleButton=r,this.fontColorDropdown=i},e.prototype.updateUIData=function(){var t=this.fontFamilySizeDropdown.getFontFamily(),e=this.fontFamilySizeDropdown.getFontSize(),n=r.PDFViewCtrl.shared.units,o=n.PIXEL_HORIZONTAL.convertTo(e,n.POINT),i={};switch(t.type){case"standard":i.standardId=t.value;break;case"ext":i.name=t.name,i.styles=t.style,i.charset=t.charset}var c=this.fontColorDropdown.getColor(),a=0;"transparent"!==c&&(a=4278190080|parseInt(c.substring(1),16));var l={fontSize:o,weight:this.boldStyleButton.isActive?700:400,italic:this.italicStyleButton.isActive,fillColor:a,font:i};this.getPDFUI().eventEmitter.emit("add-text-object-param-transfer",l)},e.prototype.stateOut=function(){this.isStateIn=!1},e.prototype.stateIn=function(){this.isStateIn=!0,this.updateUIData()},o(e,null,[{key:"permission",get:function(){return r.PDFViewCtrl.Consts.PDFDocPermission.ModifyDocument}}]),e}(r.StatefulController);e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)).StatefulController.ext("edit-text","EditTextStateController");e.default=o}]).default}));