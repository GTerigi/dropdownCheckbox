/**
 * @author GTerigi https://github.com/GTerigi
 * @description Simple Plugin jQuery to manage a custom select with checkbox inside
 * It will receive further modification if I need to implement something else at work
 */
(function ($) {
    // Current state of the select, and the jQuery ref to the body and the top of the select
    let prvState = {
        top: null,
        body: null,
        checkData: [],
        paragraph: []
    };
    let availableMethods = {
        init,
        getData,
        setData,
        removeData
    };

    /**
     * @description Base code for the jQuery plugin
     * @param {Object|string|null} chosenMethod It's a string if you want to invoke a method, Object or null for the initialization
     * @return {*|jQuery|HTMLElement}
     */
    $.fn.dropdownCheckbox = function (chosenMethod) {
        if (typeof chosenMethod === "string" && availableMethods[chosenMethod]) {
            // Chiamo il metodo puntato da "method" e gli passo eventuali argomenti passati come secondo parametro.
            return availableMethods[chosenMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof chosenMethod === "object" || !chosenMethod) {
            // Default to "init"
            return availableMethods.init.apply(this, arguments);
        } else {
            $.error("Method " + chosenMethod + " does not exist on jQuery.dropdownCheckbox");
        }
    };

    /* ==== PUBLIC ==== */
    /**
     * @description initialize the state and set the event handler.
     * @return {*|jQuery|HTMLElement}
     */
    function init() {
        prvState.top = $(this).find(".dropdown-select-top");
        prvState.body = $(this).find(".dropdown-select-body");
        prvState.top.on("click", () => prvState.body.slideToggle("fast"));
        prvState.body.find("input[type='checkbox']").on("click", propValue);
        return $(this);
    }

    /**
     * @description fetch and return the array of value kept in prvState
     * @return {[]}
     */
    function getData() {
        return prvState.checkData;
    }

    /**
     * @description Set and push inside the pvtState the value inside arrData.
     * @param {[]} arrData new data to push
     */
    function setData(arrData) {
        arrData.forEach(data => {
            let paragText = $(prvState.body).find(`input[value='${data}']`).closest("li").text();
            pushData(data.toString(), paragText, true);
        });
    }

    /**
     * @description if the first argument is an empty array then it wipe off the pvtState, else it remove just the data passed as argument in the array.
     * @param {[]} arrData empty or with value to remove.
     */
    function removeData(arrData = []) {
        if (arrData.length !== 0) {
            arrData.forEach(data => {
                let paragText = $(prvState.body).find(`input[value='${data}']`).closest("li").text();
                popData(data.toString(), paragText, true);
            });
        } else {
            // Remove everything
            prvState.checkData.splice(0, prvState.checkData.length);
            prvState.paragraph.splice(0, prvState.paragraph.length);
            $(prvState.body).find(`input`).prop("checked", false);
            showHideParagraph();
        }
    }

    /* ==== PRIVATE ==== */
    /**
     * @description fires the event handler when a checkbox is clicked.
     * If it's checked the value of the checkbox is pushed inside the prvState
     * else il popped.
     */
    function propValue() {
        let data = $(this).val();
        let textParag = $(this).closest("li").text();
        if ($(this).is(":checked")) pushData(data, textParag);
        else popData(data, textParag);
    }

    /**
     * @description Push the new data and text for the paragraph inside the state
     * @param {string} data the new value from the checkbox
     * @param {string} textParag the text from the <li> tag
     * @param {Boolean} prop if true force to prop the checkbox to :checked
     */
    function pushData(data, textParag, prop = false) {
        if (prvState.checkData.includes(data)) return;
        if (prop) $(prvState.body).find(`input[value='${data}']`).prop("checked", true);
        prvState.checkData.push(data);
        prvState.paragraph.push(textParag);
        showHideParagraph();
    }

    /**
     * @description Pop the selected data and text for the paragraph from the state
     * @param {string} data value to pop
     * @param {string} textParag the text from the <li> tag
     * @param {Boolean} prop if true force to prop the checkbox to NOT :checked
     */
    function popData(data, textParag, prop = false) {
        if (!prvState.checkData.includes(data)) return;
        if (prop) $(prvState.body).find(`input[value='${data}']`).prop("checked", false);
        prvState.checkData.splice(prvState.checkData.indexOf(data), 1);
        prvState.paragraph.splice(prvState.paragraph.indexOf(textParag), 1);
        showHideParagraph();
    }

    /**
     * @description Put into the paragraph all the text from the checkbox checked. If none, the paragraph disappear and the classic header is shown.
     */
    function showHideParagraph() {
        $(prvState.top).find("p.dropdown-checkbox-selected").text(prvState.paragraph.join(", "));
        if (prvState.paragraph.length === 0) {
            // No tag selected, so i need to hide the paragraph from the dom and show the selection header again.
            $(prvState.top).find(".dropdown-hide-on-select").show();
            $(prvState.top).find(".dropdown-checkbox-selected").hide();
        } else {
            // I have some tag to show, no need for the select header
            $(prvState.top).find(".dropdown-hide-on-select").hide();
            $(prvState.top).find(".dropdown-checkbox-selected").show();
        }
    }
})(jQuery);
/*
<div class="dropdown-checkbox-wrap">
  <div class="dropdown-select-top">
    <span class="dropdown-hide-on-select">Seleziona</span>
    <p class="dropdown-checkbox-selected"></p>
  </div>
  <div class="dropdown-select-body">
    <ul>
      <li><input type="checkbox" value="1">Apple</li>
      <li><input type="checkbox" value="2">Samsung</li>
      <li><input type="checkbox" value="3">Sony</li>
    </ul>
  </div>
</div>
 */