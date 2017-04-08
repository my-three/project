define(function(require){var t=$.fn.modal.Constructor,e=function(e,n){t.call(this,e,n)};e.getModalVersion=function(){return void 0===$.fn.modal.Constructor.VERSION?"v3.1":/3\.2\.\d+/.test($.fn.modal.Constructor.VERSION)?"v3.2":/3\.3\.[1,2]/.test($.fn.modal.Constructor.VERSION)?"v3.3":"v3.3.4"},e.ORIGINAL_BODY_PADDING=parseInt($("body").css("padding-right")||0,10),e.METHODS_TO_OVERRIDE={},e.METHODS_TO_OVERRIDE["v3.1"]={},e.METHODS_TO_OVERRIDE["v3.2"]={hide:function(t){if(t&&t.preventDefault(),t=$.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()){this.isShown=!1;0===this.getGlobalOpenedDialogs().length&&this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),$(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),$.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}}},e.METHODS_TO_OVERRIDE["v3.3"]={setScrollbar:function(){var t=e.ORIGINAL_BODY_PADDING;this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},resetScrollbar:function(){0===this.getGlobalOpenedDialogs().length&&this.$body.css("padding-right",e.ORIGINAL_BODY_PADDING)},hideModal:function(){this.$element.hide(),this.backdrop($.proxy(function(){0===this.getGlobalOpenedDialogs().length&&this.$body.removeClass("modal-open"),this.resetAdjustments(),this.resetScrollbar(),this.$element.trigger("hidden.bs.modal")},this))}},e.METHODS_TO_OVERRIDE["v3.3.4"]=$.extend({},e.METHODS_TO_OVERRIDE["v3.3"]),e.prototype={constructor:e,getGlobalOpenedDialogs:function(){var t=[];return $.each(n.dialogs,function(e,n){n.isRealized()&&n.isOpened()&&t.push(n)}),t}},e.prototype=$.extend(e.prototype,t.prototype,e.METHODS_TO_OVERRIDE[e.getModalVersion()]);var n=function(t){this.defaultOptions=$.extend(!0,{id:n.newGuid(),buttons:[],data:{},onshow:null,onshown:null,onhide:null,onhidden:null},n.defaultOptions),this.indexedButtons={},this.registeredButtonHotkeys={},this.draggableData={isMouseDown:!1,mouseOffset:{}},this.realized=!1,this.opened=!1,this.initOptions(t),this.holdThisInstance()};return n.BootstrapDialogModal=e,n.NAMESPACE="bootstrap-dialog",n.TYPE_DEFAULT="type-default",n.TYPE_INFO="type-info",n.TYPE_PRIMARY="type-primary",n.TYPE_SUCCESS="type-success",n.TYPE_WARNING="type-warning",n.TYPE_DANGER="type-danger",n.DEFAULT_TEXTS={},n.DEFAULT_TEXTS[n.TYPE_DEFAULT]="Information",n.DEFAULT_TEXTS[n.TYPE_INFO]="Information",n.DEFAULT_TEXTS[n.TYPE_PRIMARY]="Information",n.DEFAULT_TEXTS[n.TYPE_SUCCESS]="Success",n.DEFAULT_TEXTS[n.TYPE_WARNING]="Warning",n.DEFAULT_TEXTS[n.TYPE_DANGER]="Danger",n.DEFAULT_TEXTS.OK="OK",n.DEFAULT_TEXTS.CANCEL="Cancel",n.DEFAULT_TEXTS.CONFIRM="Confirmation",n.SIZE_NORMAL="size-normal",n.SIZE_SMALL="size-small",n.SIZE_WIDE="size-wide",n.SIZE_LARGE="size-large",n.BUTTON_SIZES={},n.BUTTON_SIZES[n.SIZE_NORMAL]="",n.BUTTON_SIZES[n.SIZE_SMALL]="",n.BUTTON_SIZES[n.SIZE_WIDE]="",n.BUTTON_SIZES[n.SIZE_LARGE]="btn-lg",n.ICON_SPINNER="glyphicon glyphicon-asterisk",n.BUTTONS_ORDER_CANCEL_OK="btns-order-cancel-ok",n.BUTTONS_ORDER_OK_CANCEL="btns-order-ok-cancel",n.defaultOptions={type:n.TYPE_PRIMARY,size:n.SIZE_NORMAL,cssClass:"",title:null,message:null,nl2br:!0,closable:!0,closeByBackdrop:!0,closeByKeyboard:!0,closeIcon:"&#215;",spinicon:n.ICON_SPINNER,autodestroy:!0,draggable:!1,animate:!0,description:"",tabindex:-1,btnsOrder:n.BUTTONS_ORDER_CANCEL_OK},n.configDefaultOptions=function(t){n.defaultOptions=$.extend(!0,n.defaultOptions,t)},n.dialogs={},n.openAll=function(){$.each(n.dialogs,function(t,e){e.open()})},n.closeAll=function(){$.each(n.dialogs,function(t,e){e.close()})},n.getDialog=function(t){var e=null;return void 0!==n.dialogs[t]&&(e=n.dialogs[t]),e},n.setDialog=function(t){return n.dialogs[t.getId()]=t,t},n.addDialog=function(t){return n.setDialog(t)},n.moveFocus=function(){var t=null;$.each(n.dialogs,function(e,n){n.isRealized()&&n.isOpened()&&(t=n)}),null!==t&&t.getModal().focus()},n.METHODS_TO_OVERRIDE={},n.METHODS_TO_OVERRIDE["v3.1"]={handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(t){t.target===this&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByBackdrop()&&t.data.dialog.close()}),this},updateZIndex:function(){if(this.isOpened()){var t=0;$.each(n.dialogs,function(e,n){n.isRealized()&&n.isOpened()&&t++});var e=this.getModal(),o=e.data("bs.modal").$backdrop;e.css("z-index",1050+20*(t-1)),o.css("z-index",1040+20*(t-1))}return this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this.updateZIndex(),this}},n.METHODS_TO_OVERRIDE["v3.2"]={handleModalBackdropEvent:n.METHODS_TO_OVERRIDE["v3.1"].handleModalBackdropEvent,updateZIndex:n.METHODS_TO_OVERRIDE["v3.1"].updateZIndex,open:n.METHODS_TO_OVERRIDE["v3.1"].open},n.METHODS_TO_OVERRIDE["v3.3"]={},n.METHODS_TO_OVERRIDE["v3.3.4"]=$.extend({},n.METHODS_TO_OVERRIDE["v3.1"]),n.prototype={constructor:n,initOptions:function(t){return this.options=$.extend(!0,this.defaultOptions,t),this},holdThisInstance:function(){return n.addDialog(this),this},initModalStuff:function(){return this.setModal(this.createModal()).setModalDialog(this.createModalDialog()).setModalContent(this.createModalContent()).setModalHeader(this.createModalHeader()).setModalBody(this.createModalBody()).setModalFooter(this.createModalFooter()),this.getModal().append(this.getModalDialog()),this.getModalDialog().append(this.getModalContent()),this.getModalContent().append(this.getModalHeader()).append(this.getModalBody()).append(this.getModalFooter()),this},createModal:function(){var t=$('<div class="modal" role="dialog" aria-hidden="true"></div>');return t.prop("id",this.getId()),t.attr("aria-labelledby",this.getId()+"_title"),t},getModal:function(){return this.$modal},setModal:function(t){return this.$modal=t,this},createModalDialog:function(){return $('<div class="modal-dialog"></div>')},getModalDialog:function(){return this.$modalDialog},setModalDialog:function(t){return this.$modalDialog=t,this},createModalContent:function(){return $('<div class="modal-content"></div>')},getModalContent:function(){return this.$modalContent},setModalContent:function(t){return this.$modalContent=t,this},createModalHeader:function(){return $('<div class="modal-header"></div>')},getModalHeader:function(){return this.$modalHeader},setModalHeader:function(t){return this.$modalHeader=t,this},createModalBody:function(){return $('<div class="modal-body"></div>')},getModalBody:function(){return this.$modalBody},setModalBody:function(t){return this.$modalBody=t,this},createModalFooter:function(){return $('<div class="modal-footer"></div>')},getModalFooter:function(){return this.$modalFooter},setModalFooter:function(t){return this.$modalFooter=t,this},createDynamicContent:function(t){var e=null;return e="function"==typeof t?t.call(t,this):t,"string"==typeof e&&(e=this.formatStringContent(e)),e},formatStringContent:function(t){return this.options.nl2br?t.replace(/\r\n/g,"<br />").replace(/[\r\n]/g,"<br />"):t},setData:function(t,e){return this.options.data[t]=e,this},getData:function(t){return this.options.data[t]},setId:function(t){return this.options.id=t,this},getId:function(){return this.options.id},getType:function(){return this.options.type},setType:function(t){return this.options.type=t,this.updateType(),this},updateType:function(){if(this.isRealized()){var t=[n.TYPE_DEFAULT,n.TYPE_INFO,n.TYPE_PRIMARY,n.TYPE_SUCCESS,n.TYPE_WARNING,n.TYPE_DANGER];this.getModal().removeClass(t.join(" ")).addClass(this.getType())}return this},getSize:function(){return this.options.size},setSize:function(t){return this.options.size=t,this.updateSize(),this},updateSize:function(){if(this.isRealized()){var t=this;this.getModal().removeClass(n.SIZE_NORMAL).removeClass(n.SIZE_SMALL).removeClass(n.SIZE_WIDE).removeClass(n.SIZE_LARGE),this.getModal().addClass(this.getSize()),this.getModalDialog().removeClass("modal-sm"),this.getSize()===n.SIZE_SMALL&&this.getModalDialog().addClass("modal-sm"),this.getModalDialog().removeClass("modal-lg"),this.getSize()===n.SIZE_WIDE&&this.getModalDialog().addClass("modal-lg"),$.each(this.options.buttons,function(e,n){var o=t.getButton(n.id),i=["btn-lg","btn-sm","btn-xs"],s=!1;if("string"==typeof n.cssClass){var a=n.cssClass.split(" ");$.each(a,function(t,e){-1!==$.inArray(e,i)&&(s=!0)})}s||(o.removeClass(i.join(" ")),o.addClass(t.getButtonSize()))})}return this},getCssClass:function(){return this.options.cssClass},setCssClass:function(t){return this.options.cssClass=t,this},getTitle:function(){return this.options.title},setTitle:function(t){return this.options.title=t,this.updateTitle(),this},updateTitle:function(){if(this.isRealized()){var t=null!==this.getTitle()?this.createDynamicContent(this.getTitle()):this.getDefaultText();this.getModalHeader().find("."+this.getNamespace("title")).html("").append(t).prop("id",this.getId()+"_title")}return this},getMessage:function(){return this.options.message},setMessage:function(t){return this.options.message=t,this.updateMessage(),this},updateMessage:function(){if(this.isRealized()){var t=this.createDynamicContent(this.getMessage());this.getModalBody().find("."+this.getNamespace("message")).html("").append(t)}return this},isClosable:function(){return this.options.closable},setClosable:function(t){return this.options.closable=t,this.updateClosable(),this},setCloseByBackdrop:function(t){return this.options.closeByBackdrop=t,this},canCloseByBackdrop:function(){return this.options.closeByBackdrop},setCloseByKeyboard:function(t){return this.options.closeByKeyboard=t,this},canCloseByKeyboard:function(){return this.options.closeByKeyboard},isAnimate:function(){return this.options.animate},setAnimate:function(t){return this.options.animate=t,this},updateAnimate:function(){return this.isRealized()&&this.getModal().toggleClass("fade",this.isAnimate()),this},getSpinicon:function(){return this.options.spinicon},setSpinicon:function(t){return this.options.spinicon=t,this},addButton:function(t){return this.options.buttons.push(t),this},addButtons:function(t){var e=this;return $.each(t,function(t,n){e.addButton(n)}),this},getButtons:function(){return this.options.buttons},setButtons:function(t){return this.options.buttons=t,this.updateButtons(),this},getButton:function(t){return void 0!==this.indexedButtons[t]?this.indexedButtons[t]:null},getButtonSize:function(){return void 0!==n.BUTTON_SIZES[this.getSize()]?n.BUTTON_SIZES[this.getSize()]:""},updateButtons:function(){return this.isRealized()&&(0===this.getButtons().length?this.getModalFooter().hide():this.getModalFooter().show().find("."+this.getNamespace("footer")).html("").append(this.createFooterButtons())),this},isAutodestroy:function(){return this.options.autodestroy},setAutodestroy:function(t){this.options.autodestroy=t},getDescription:function(){return this.options.description},setDescription:function(t){return this.options.description=t,this},setTabindex:function(t){return this.options.tabindex=t,this},getTabindex:function(){return this.options.tabindex},updateTabindex:function(){return this.isRealized()&&this.getModal().attr("tabindex",this.getTabindex()),this},getDefaultText:function(){return n.DEFAULT_TEXTS[this.getType()]},getNamespace:function(t){return n.NAMESPACE+"-"+t},createHeaderContent:function(){var t=$("<div></div>");return t.addClass(this.getNamespace("header")),t.append(this.createTitleContent()),t.prepend(this.createCloseButton()),t},createTitleContent:function(){var t=$("<div></div>");return t.addClass(this.getNamespace("title")),t},createCloseButton:function(){var t=$("<div></div>");t.addClass(this.getNamespace("close-button"));var e=$('<button class="close"></button>');return e.append(this.options.closeIcon),t.append(e),t.on("click",{dialog:this},function(t){t.data.dialog.close()}),t},createBodyContent:function(){var t=$("<div></div>");return t.addClass(this.getNamespace("body")),t.append(this.createMessageContent()),t},createMessageContent:function(){var t=$("<div></div>");return t.addClass(this.getNamespace("message")),t},createFooterContent:function(){var t=$("<div></div>");return t.addClass(this.getNamespace("footer")),t},createFooterButtons:function(){var t=this,e=$("<div></div>");return e.addClass(this.getNamespace("footer-buttons")),this.indexedButtons={},$.each(this.options.buttons,function(o,i){i.id||(i.id=n.newGuid());var s=t.createButton(i);t.indexedButtons[i.id]=s,e.append(s)}),e},createButton:function(t){var e=$('<button class="btn"></button>');return e.prop("id",t.id),e.data("button",t),void 0!==t.icon&&""!==$.trim(t.icon)&&e.append(this.createButtonIcon(t.icon)),void 0!==t.label&&e.append(t.label),void 0!==t.cssClass&&""!==$.trim(t.cssClass)?e.addClass(t.cssClass):e.addClass("btn-default"),void 0!==t.hotkey&&(this.registeredButtonHotkeys[t.hotkey]=e),e.on("click",{dialog:this,$button:e,button:t},function(t){var e=t.data.dialog,n=t.data.$button,o=n.data("button");if(o.autospin&&n.toggleSpin(!0),"function"==typeof o.action)return o.action.call(n,e,t)}),this.enhanceButton(e),void 0!==t.enabled&&e.toggleEnable(t.enabled),e},enhanceButton:function(t){return t.dialog=this,t.toggleEnable=function(t){var e=this;return void 0!==t?e.prop("disabled",!t).toggleClass("disabled",!t):e.prop("disabled",!e.prop("disabled")),e},t.enable=function(){var t=this;return t.toggleEnable(!0),t},t.disable=function(){var t=this;return t.toggleEnable(!1),t},t.toggleSpin=function(e){var n=this,o=n.dialog,i=n.find("."+o.getNamespace("button-icon"));return void 0===e&&(e=!(t.find(".icon-spin").length>0)),e?(i.hide(),t.prepend(o.createButtonIcon(o.getSpinicon()).addClass("icon-spin"))):(i.show(),t.find(".icon-spin").remove()),n},t.spin=function(){var t=this;return t.toggleSpin(!0),t},t.stopSpin=function(){var t=this;return t.toggleSpin(!1),t},this},createButtonIcon:function(t){var e=$("<span></span>");return e.addClass(this.getNamespace("button-icon")).addClass(t),e},enableButtons:function(t){return $.each(this.indexedButtons,function(e,n){n.toggleEnable(t)}),this},updateClosable:function(){return this.isRealized()&&this.getModalHeader().find("."+this.getNamespace("close-button")).toggle(this.isClosable()),this},onShow:function(t){return this.options.onshow=t,this},onShown:function(t){return this.options.onshown=t,this},onHide:function(t){return this.options.onhide=t,this},onHidden:function(t){return this.options.onhidden=t,this},isRealized:function(){return this.realized},setRealized:function(t){return this.realized=t,this},isOpened:function(){return this.opened},setOpened:function(t){return this.opened=t,this},handleModalEvents:function(){return this.getModal().on("show.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!0),e.isModalEvent(t)&&"function"==typeof e.options.onshow){var n=e.options.onshow(e);return!1===n&&e.setOpened(!1),n}}),this.getModal().on("shown.bs.modal",{dialog:this},function(t){var e=t.data.dialog;e.isModalEvent(t)&&"function"==typeof e.options.onshown&&e.options.onshown(e)}),this.getModal().on("hide.bs.modal",{dialog:this},function(t){var e=t.data.dialog;if(e.setOpened(!1),e.isModalEvent(t)&&"function"==typeof e.options.onhide){var n=e.options.onhide(e);return!1===n&&e.setOpened(!0),n}}),this.getModal().on("hidden.bs.modal",{dialog:this},function(t){var e=t.data.dialog;e.isModalEvent(t)&&"function"==typeof e.options.onhidden&&e.options.onhidden(e),e.isAutodestroy()&&(e.setRealized(!1),delete n.dialogs[e.getId()],$(this).remove()),n.moveFocus()}),this.handleModalBackdropEvent(),this.getModal().on("keyup",{dialog:this},function(t){27===t.which&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByKeyboard()&&t.data.dialog.close()}),this.getModal().on("keyup",{dialog:this},function(t){var e=t.data.dialog;if(void 0!==e.registeredButtonHotkeys[t.which]){var n=$(e.registeredButtonHotkeys[t.which]);!n.prop("disabled")&&n.focus().trigger("click")}}),this},handleModalBackdropEvent:function(){return this.getModal().on("click",{dialog:this},function(t){$(t.target).hasClass("modal-backdrop")&&t.data.dialog.isClosable()&&t.data.dialog.canCloseByBackdrop()&&t.data.dialog.close()}),this},isModalEvent:function(t){return void 0!==t.namespace&&"bs.modal"===t.namespace},makeModalDraggable:function(){return this.options.draggable&&(this.getModalHeader().addClass(this.getNamespace("draggable")).on("mousedown",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown=!0;var n=e.getModalDialog().offset();e.draggableData.mouseOffset={top:t.clientY-n.top,left:t.clientX-n.left}}),this.getModal().on("mouseup mouseleave",{dialog:this},function(t){t.data.dialog.draggableData.isMouseDown=!1}),$("body").on("mousemove",{dialog:this},function(t){var e=t.data.dialog;e.draggableData.isMouseDown&&e.getModalDialog().offset({top:t.clientY-e.draggableData.mouseOffset.top,left:t.clientX-e.draggableData.mouseOffset.left})})),this},realize:function(){return this.initModalStuff(),this.getModal().addClass(n.NAMESPACE).addClass(this.getCssClass()),this.updateSize(),this.getDescription()&&this.getModal().attr("aria-describedby",this.getDescription()),this.getModalFooter().append(this.createFooterContent()),this.getModalHeader().append(this.createHeaderContent()),this.getModalBody().append(this.createBodyContent()),this.getModal().data("bs.modal",new e(this.getModal(),{backdrop:"static",keyboard:!1,show:!1})),this.makeModalDraggable(),this.handleModalEvents(),this.setRealized(!0),this.updateButtons(),this.updateType(),this.updateTitle(),this.updateMessage(),this.updateClosable(),this.updateAnimate(),this.updateSize(),this.updateTabindex(),this},open:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("show"),this},close:function(){return!this.isRealized()&&this.realize(),this.getModal().modal("hide"),this}},n.prototype=$.extend(n.prototype,n.METHODS_TO_OVERRIDE[e.getModalVersion()]),n.newGuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},n.show=function(t){return new n(t).open()},n.alert=function(){var t={},e={type:n.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,buttonLabel:n.DEFAULT_TEXTS.OK,callback:null};t="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?$.extend(!0,e,arguments[0]):$.extend(!0,e,{message:arguments[0],callback:void 0!==arguments[1]?arguments[1]:null});var o=new n(t);return o.setData("callback",t.callback),o.addButton({label:t.buttonLabel,action:function(t){return("function"!=typeof t.getData("callback")||!1!==t.getData("callback").call(this,!0))&&(t.setData("btnClicked",!0),t.close())}}),"function"==typeof o.options.onhide?o.onHide(function(t){var e=!0;return!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&(e=t.getData("callback")(!1)),!1!==e&&(e=this.onhide(t))}.bind({onhide:o.options.onhide})):o.onHide(function(t){var e=!0;return!t.getData("btnClicked")&&t.isClosable()&&"function"==typeof t.getData("callback")&&(e=t.getData("callback")(!1)),e}),o.open()},n.confirm=function(){var t={},e={type:n.TYPE_PRIMARY,title:null,message:null,closable:!1,draggable:!1,btnCancelLabel:n.DEFAULT_TEXTS.CANCEL,btnCancelClass:null,btnOKLabel:n.DEFAULT_TEXTS.OK,btnOKClass:null,btnsOrder:n.defaultOptions.btnsOrder,callback:null};t="object"==typeof arguments[0]&&arguments[0].constructor==={}.constructor?$.extend(!0,e,arguments[0]):$.extend(!0,e,{message:arguments[0],callback:void 0!==arguments[1]?arguments[1]:null}),null===t.btnOKClass&&(t.btnOKClass=["btn",t.type.split("-")[1]].join("-"));var o=new n(t);o.setData("callback",t.callback);var i=[{label:t.btnCancelLabel,cssClass:t.btnCancelClass,action:function(t){return("function"!=typeof t.getData("callback")||!1!==t.getData("callback").call(this,!1))&&t.close()}},{label:t.btnOKLabel,cssClass:t.btnOKClass,action:function(t){return("function"!=typeof t.getData("callback")||!1!==t.getData("callback").call(this,!0))&&t.close()}}];return t.btnsOrder===n.BUTTONS_ORDER_OK_CANCEL&&i.reverse(),o.addButtons(i),o.open()},n.warning=function(t,e){return new n({type:n.TYPE_WARNING,message:t}).open()},n.danger=function(t,e){return new n({type:n.TYPE_DANGER,message:t}).open()},n.success=function(t,e){return new n({type:n.TYPE_SUCCESS,message:t}).open()},n});