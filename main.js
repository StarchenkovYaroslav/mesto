(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button_type_submit",inactiveButtonClass:"form__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active",errorPostfix:"-error"},t={templateSelector:"#card-template",elementSelector:".card",imageSelector:".card__image",titleSelector:".card__title",likeButtonSelector:".card__like-button",likeCounterSelector:".card__like-counter",deleteButtonSelector:".card__delete-button",activeLikeButtonClass:"card__like-button_active",activeDeleteButtonClass:"card__delete-button_active"},n={popupClass:"popup",closeButtonClass:"popup__close-button",openedPopupClass:"popup_opened"},o="Сохранение...";function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function e(t,n,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_isMadeByUser",void 0),r(this,"_isLikedByUser",void 0),r(this,"_likeCounter",void 0),this._templateSelector=t.templateSelector,this._elementSelector=t.elementSelector,this._imageSelector=t.imageSelector,this._titleSelector=t.titleSelector,this._likeButtonSelector=t.likeButtonSelector,this._likeCounterSelector=t.likeCounterSelector,this._activeLikeButtonClass=t.activeLikeButtonClass,this._deleteButtonSelector=t.deleteButtonSelector,this._activeDeleteButtonClass=t.activeDeleteButtonClass,this._id=n._id,this._link=n.link,this._name=n.name,this._likes=n.likes,this._ownerId=n.owner._id,this._handleImageClick=o.handleImageClick,this._handleLikeButtonClick=o.handleLikeButtonClick,this._handleDeleteButtonClick=o.handleDeleteButtonClick,this._userId=i._id,this._element=this._getEmptyElement(),this._imageElement=this._element.querySelector(this._imageSelector),this._titleElement=this._element.querySelector(this._titleSelector),this._likeButtonElement=this._element.querySelector(this._likeButtonSelector),this._likeCounterElement=this._element.querySelector(this._likeCounterSelector),this._deleteButtonElement=this._element.querySelector(this._deleteButtonSelector),this._determineMadeByUser(),this._determineLikedByUser(),this._countLikes(),this._fillElement()}var t,n;return t=e,(n=[{key:"id",get:function(){return this._id}},{key:"link",get:function(){return this._link}},{key:"name",get:function(){return this._name}},{key:"isLikedByUser",get:function(){return this._isLikedByUser}},{key:"getElement",value:function(){return this._element}},{key:"delete",value:function(){this._element.remove(),this._element=null}},{key:"toggleLike",value:function(e){this._isLikedByUser=!this._isLikedByUser,this._likes=e.likes,this._checkLikedByUser(),this._updateLikeCounter()}},{key:"_fillElement",value:function(){this._setElementValues(),this._setEventListeners(),this._checkMadeByUser(),this._checkLikedByUser()}},{key:"_setElementValues",value:function(){this._imageElement.src=this._link,this._imageElement.alt=this._name,this._titleElement.textContent=this._name,this._setLikeCounterElementValue()}},{key:"_setEventListeners",value:function(){var e=this;this._imageElement.addEventListener("click",(function(){e._handleImageClick(e)})),this._likeButtonElement.addEventListener("click",(function(){e._handleLikeButtonClick(e)})),this._deleteButtonElement.addEventListener("click",(function(){e._handleDeleteButtonClick(e)}))}},{key:"_updateLikeCounter",value:function(){this._countLikes(),this._setLikeCounterElementValue()}},{key:"_countLikes",value:function(){this._likeCounter=this._likes.length}},{key:"_setLikeCounterElementValue",value:function(){this._likeCounterElement.textContent=this._likeCounter}},{key:"_checkMadeByUser",value:function(){this._isMadeByUser?this._activateDeleteButton():this._deactivateDeleteButton()}},{key:"_checkLikedByUser",value:function(){this._isLikedByUser?this._paintLikeButton():this._cleanLikeButton()}},{key:"_determineMadeByUser",value:function(){this._isMadeByUser=this._ownerId===this._userId}},{key:"_determineLikedByUser",value:function(){var e=this;this._isLikedByUser=this._likes.some((function(t){return t._id===e._userId}))}},{key:"_paintLikeButton",value:function(){this._likeButtonElement.classList.add(this._activeLikeButtonClass)}},{key:"_cleanLikeButton",value:function(){this._likeButtonElement.classList.remove(this._activeLikeButtonClass)}},{key:"_activateDeleteButton",value:function(){this._deleteButtonElement.removeAttribute("disabled"),this._deleteButtonElement.classList.add(this._activeDeleteButtonClass)}},{key:"_deactivateDeleteButton",value:function(){this._deleteButtonElement.setAttribute("disabled",""),this._deleteButtonElement.classList.remove(this._activeDeleteButtonClass)}},{key:"_getEmptyElement",value:function(){return this._getTemplate().querySelector(this._elementSelector).cloneNode(!0)}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content}}])&&i(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._render=t,this._containerElement=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;this._clear(),e.forEach((function(e){t._render(e)}))}},{key:"addElementToBegin",value:function(e){this._containerElement.prepend(e)}},{key:"addElementToEnd",value:function(e){this._containerElement.append(e)}},{key:"_clear",value:function(){this._containerElement.innerHTML=""}}])&&a(t.prototype,n),e}();function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function e(t,n){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.constructor===e)throw new Error("Can't instantiate abstract class!");this._popupClass=t.popupClass,this._closeButtonClass=t.closeButtonClass,this._openedPopupClass=t.openedPopupClass,this._element=document.querySelector(n),this._handleKeydown=this._handleKeydown.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){document.addEventListener("keydown",this._handleKeydown),this._element.classList.add(this._openedPopupClass)}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleKeydown),this._element.classList.remove(this._openedPopupClass)}},{key:"_setEventListeners",value:function(){var e=this;this._element.addEventListener("mousedown",(function(t){e._isClickToClose(t)&&e.close()}))}},{key:"_handleKeydown",value:function(e){"Escape"===e.key&&this.close()}},{key:"_isClickToClose",value:function(e){return e.target.classList.contains(this._popupClass)||e.target.classList.contains(this._closeButtonClass)}}])&&l(t.prototype,n),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _(e,t,n){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}},_(e,t,n||e)}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function p(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(s,e);var t,n,o,i,r=(o=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(o);if(i){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function s(e,t,n,o,i,a){var u;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(u=r.call(this,e,t))._form=u._element.querySelector(n.formSelector),u._formInputs=u._form.querySelectorAll(n.inputSelector),u._formSubmitButton=u._form.querySelector(n.submitButtonSelector),u._fomrSubmitButtonText=u._formSubmitButton.textContent,u._formValidator=i,u._handleFormSubmit=o,u._loadingMessage=a,u._setEventListeners(),u}return t=s,(n=[{key:"close",value:function(){this._clearInputValues(),_(y(s.prototype),"close",this).call(this)}},{key:"setInputValues",value:function(e){this._formInputs.forEach((function(t){if(!(t.name in e))throw new Error("inputs and data dont match");t.value=e[t.name]})),this._formValidator.resetValidation()}},{key:"showLoadingMessage",value:function(){this._formSubmitButton.textContent=this._loadingMessage}},{key:"hideLoadingMessage",value:function(){this._formSubmitButton.textContent=this._fomrSubmitButtonText}},{key:"_setEventListeners",value:function(){var e=this;_(y(s.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",(function(){e._handleFormSubmit(e._getInputValues())}))}},{key:"_getInputValues",value:function(){var e={};return this._formInputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"_clearInputValues",value:function(){this._form.reset(),this._formValidator.resetValidation()}}])&&h(t.prototype,n),s}(c);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function k(e,t,n){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}},k(e,t,n||e)}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function E(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(s,e);var t,n,o,i,r=(o=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(o);if(i){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function s(e,t,n){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(o=r.call(this,e,t))._imageElement=o._element.querySelector(n.imageSelector),o._descriptionElement=o._element.querySelector(n.descriptionSelector),o._setEventListeners(),o}return t=s,(n=[{key:"open",value:function(e){this._setElementValues(e),k(S(s.prototype),"open",this).call(this)}},{key:"_setElementValues",value:function(e){this._imageElement.src=e.link,this._imageElement.alt=e.name,this._descriptionElement.textContent=e.name}}])&&b(t.prototype,n),s}(c);function B(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L=function(){function e(t){var n=t.nameSelector,o=t.aboutSelector,i=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),w(this,"_name",void 0),w(this,"_about",void 0),w(this,"_avatar",void 0),w(this,"_id",void 0),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(o),this._avatarElement=document.querySelector(i)}var t,n;return t=e,(n=[{key:"getInfo",value:function(){return{name:this._name,about:this._about,avatar:this._avatar,_id:this._id}}},{key:"setInfo",value:function(e){var t=e.name,n=e.about,o=e.avatar,i=e._id;this._name=t,this._about=n,this._avatar=o,this._id=i,this._setElementValues()}},{key:"_setElementValues",value:function(){this._nameElement.textContent=this._name,this._aboutElement.textContent=this._about,this._avatarElement.src=this._avatar}}])&&B(t.prototype,n),e}();function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var R=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._errorPostfix=t.errorPostfix,this._form=n,this._inputs=Array.from(this._form.querySelectorAll(this._inputSelector)),this._submitButton=this._form.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._inputs.forEach((function(t){e._hideInputError(t)})),this._toggleSubmitButtonState()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleSubmitButtonState(),this._inputs.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleSubmitButtonState()}))}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._getErrorElement(e);n.textContent=t,n.classList.add(this._errorClass),e.classList.add(this._inputErrorClass)}},{key:"_hideInputError",value:function(e){var t=this._getErrorElement(e);t.textContent="",t.classList.remove(this._errorClass),e.classList.remove(this._inputErrorClass)}},{key:"_getErrorElement",value:function(e){return this._form.querySelector(".".concat(e.id).concat(this._errorPostfix))}},{key:"_toggleSubmitButtonState",value:function(){this._hasInvalidInput(this._inputs)?this._deactivateSubmitButton():this._activateSubmitButton()}},{key:"_activateSubmitButton",value:function(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled")}},{key:"_deactivateSubmitButton",value:function(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled","")}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}}])&&O(t.prototype,n),e}();function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function q(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function I(e,t,n){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=V(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}},I(e,t,n||e)}function P(e,t){return P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},P(e,t)}function T(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return U(e)}function U(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function V(e){return V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},V(e)}var x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(s,e);var t,n,o,i,r=(o=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=V(o);if(i){var n=V(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function s(e,t,n,o){var i,a,u,l;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),l=void 0,(u="_objectToHandle")in(a=U(i=r.call(this,e,t)))?Object.defineProperty(a,u,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[u]=l,i._inactiveButtonClass=n.inactiveButtonClass,i._form=i._element.querySelector(n.formSelector),i._handleConfirmation=o,i._setEventListeners(),i}return t=s,(n=[{key:"open",value:function(e){this._objectToHandle=e,I(V(s.prototype),"open",this).call(this)}},{key:"close",value:function(){this._objectToHandle=null,I(V(s.prototype),"close",this).call(this)}},{key:"_setEventListeners",value:function(){var e=this;I(V(s.prototype),"_setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleConfirmation(e._objectToHandle)}))}}])&&q(t.prototype,n),s}(c);function D(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var A=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._token=t.token,this._userRequest=t.userRequest,this._initialCardsRequest=t.initialCardsRequest,this._newCardRequest=t.newCardRequest,this._cardLikeRequest=t.cardLikeRequest,this._userInfoRequest=t.userInfoRequest,this._userAvatarRequest=t.userAvatarRequest,this._cardOffRequest=t.cardOffRequest}var t,n;return t=e,(n=[{key:"getUser",value:function(){return fetch(this._baseUrl+this._userRequest,{headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"editUserInfo",value:function(e){return fetch(this._baseUrl+this._userInfoRequest,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"editUserAvatar",value:function(e){return fetch(this._baseUrl+this._userAvatarRequest,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch(this._baseUrl+this._initialCardsRequest,{headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"addCard",value:function(e){return fetch(this._baseUrl+this._newCardRequest,{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch(this._baseUrl+this._cardOffRequest+e.id,{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"toggleCardLike",value:function(e){var t=e.isLikedByUser?"DELETE":"PUT";return fetch(this._baseUrl+this._cardLikeRequest+e.id,{method:t,headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject(e.status)}}])&&D(t.prototype,n),e}();function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var z=document.querySelector(".profile__edit-button"),H=document.querySelector(".profile__add-card-button"),K=document.querySelector(".profile__avatar-button"),N=document.querySelector(".form_action_edit-profile"),J=document.querySelector(".form_action_add-card"),F=document.querySelector(".form_action_change-avatar"),$=new A({token:"0b40a95f-9332-4356-a732-eb5ba165765e",baseUrl:"https://mesto.nomoreparties.co/v1/cohort-29",userRequest:"/users/me",initialCardsRequest:"/cards",newCardRequest:"/cards",cardOffRequest:"/cards/",cardLikeRequest:"/cards/likes/",userInfoRequest:"/users/me",userAvatarRequest:"/users/me/avatar"}),G=new L({nameSelector:".profile__name",aboutSelector:".profile__about",avatarSelector:".profile__avatar"}),Q=new u((function(e){Q.addElementToEnd(ae(e,G.getInfo()))}),".cards"),W=new R(e,N),X=new R(e,J),Y=new R(e,F),Z=new m(n,".popup_content_edit-profile-form",e,(function(e){Z.showLoadingMessage(),$.editUserInfo(e).then((function(e){G.setInfo(e),Z.close()})).catch((function(){ue()})).finally((function(){Z.hideLoadingMessage()}))}),W,o),ee=new m(n,".popup_content_add-card-form",e,(function(e){ee.showLoadingMessage(),$.addCard(e).then((function(e){Q.addElementToBegin(ae(e,G.getInfo())),ee.close()})).catch((function(){ue()})).finally((function(){ee.hideLoadingMessage()}))}),X,o),te=new m(n,".popup_content_change-avatar-form",e,(function(e){te.showLoadingMessage(),$.editUserAvatar(e).then((function(e){G.setInfo(e),te.close()})).catch((function(){ue()})).finally((function(){te.hideLoadingMessage()}))}),Y,o),ne=new x(n,".popup_content_confirm-delete-card-form",e,(function(e){$.deleteCard(e).then((function(){e.delete(),ne.close()})).catch((function(){ue()}))})),oe=new C(n,".popup_content_picture",{imageSelector:".picture__image",descriptionSelector:".picture__description"});function ie(e){oe.open(e)}function re(e){ne.open(e)}function se(e){$.toggleCardLike(e).then((function(t){e.toggleLike(t)})).catch(ue)}function ae(e,n){return new s(t,e,{handleImageClick:ie,handleLikeButtonClick:se,handleDeleteButtonClick:re},n).getElement()}function ue(){alert("Что-то пошло не так...")}Promise.all([$.getUser(),$.getInitialCards()]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,r=[],s=!0,a=!1;try{for(n=n.call(e);!(s=(o=n.next()).done)&&(r.push(o.value),!t||r.length!==t);s=!0);}catch(e){a=!0,i=e}finally{try{s||null==n.return||n.return()}finally{if(a)throw i}}return r}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],r=o[1];G.setInfo(i),Q.renderItems(r)})).catch((function(){ue()})),W.enableValidation(),X.enableValidation(),Y.enableValidation(),z.addEventListener("click",(function(){Z.setInputValues(G.getInfo()),Z.open()})),H.addEventListener("click",(function(){ee.open()})),K.addEventListener("click",(function(){te.open()}))})();