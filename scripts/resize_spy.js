﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * The class added to a ResizeSpy instance.
    */
    var RESIZE_SPY_CLASS = "p-ResizeSpy";

    /**
    * The class added to a ResizeSpy's internal expandable div.
    */
    var EXPANDABLE_CLASS = "p-ResizeSpy-expandable";

    /**
    * The class added to a ResizeSpy's internal collapsible div.
    */
    var COLLAPSIBLE_CLASS = "p-ResizeSpy-collapsible";

    /**
    * The class added to a ResizeSpy's expandable inner div.
    */
    var EXPANDABLE_INNER_CLASS = "p-ResizeSpy-expandable-inner";

    /**
    * The class added to a ResizeSpy's collapsible inner div.
    */
    var COLLAPSIBLE_INNER_CLASS = "p-ResizeSpy-collapsible-inner";

    

    /**
    * A class for listening for resizes on a component.
    *
    * An instance of this class can be added as the child of any
    * component. It's `resized` signal will be emitted whenever
    * the parent element is resized.
    *
    * @class
    */
    var ResizeSpy = (function (_super) {
        __extends(ResizeSpy, _super);
        /**
        * Construct a new ResizeSpy.
        */
        function ResizeSpy() {
            _super.call(this);
            /**
            * A signal emmited when the parent div is resized.
            */
            this.resized = new porcelain.Signal();
            this._lastSize = new porcelain.Size();
            this.addClass(RESIZE_SPY_CLASS);

            var expandable = document.createElement("div");
            var expandableInner = document.createElement("div");
            var collapsible = document.createElement("div");
            var collapsibleInner = document.createElement("div");

            expandable.className = EXPANDABLE_CLASS;
            collapsible.className = COLLAPSIBLE_CLASS;
            expandableInner.className = EXPANDABLE_INNER_CLASS;
            collapsibleInner.className = COLLAPSIBLE_INNER_CLASS;

            expandable.appendChild(expandableInner);
            collapsible.appendChild(collapsibleInner);

            var element = this.element();
            element.appendChild(expandable);
            element.appendChild(collapsible);

            this._evtExpandScroll = new porcelain.EventBinder("scroll", expandable);
            this._evtCollapseScroll = new porcelain.EventBinder("scroll", collapsible);

            this._evtExpandScroll.bind(this._onScroll, this);
            this._evtCollapseScroll.bind(this._onScroll, this);

            this._elements = {
                expandable: expandable,
                expandableInner: expandableInner,
                collapsible: collapsible,
                collapsibleInner: collapsibleInner
            };
        }
        /**
        * Destroy the ResizeSpy.
        */
        ResizeSpy.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._elements = null;
        };

        /**
        * Perform initialization which requires a live DOM tree.
        */
        ResizeSpy.prototype.afterAttach = function () {
            this._resetScrollPositions();
        };

        /**
        * The internal scroll event handler.
        *
        * If the size of the element has not changed, this is a no-op.
        * Otherwise, the scroll positions are reset and the resized
        * signal is emitted.
        *
        * @private
        */
        ResizeSpy.prototype._onScroll = function () {
            var size = this.size();
            if (size.equals(this._lastSize)) {
                return;
            }
            this._lastSize = size;
            this._resetScrollPositions();
            this.resized.emit();
        };

        /**
        * A helper method to reset the internal scroll items.
        *
        * This method resets the scroll positions of the internal
        * div elements so that the next resize triggers a scroll.
        *
        * @private
        */
        ResizeSpy.prototype._resetScrollPositions = function () {
            var elements = this._elements;
            var expandable = elements.expandable;
            var collapsible = elements.collapsible;
            var width = expandable.offsetWidth + 100;
            var height = expandable.offsetHeight + 100;
            var style = elements.expandableInner.style;
            style.width = width + "px";
            style.height = height + "px";
            expandable.scrollTop = height;
            expandable.scrollLeft = width;
            collapsible.scrollLeft = collapsible.scrollWidth;
            collapsible.scrollTop = collapsible.scrollHeight;
        };
        return ResizeSpy;
    })(porcelain.Component);
    porcelain.ResizeSpy = ResizeSpy;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=resize_spy.js.map
