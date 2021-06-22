class dropdownCheckbox {
    #top;
    #body;
    #checkData = [];
    #paragraph = [];
    #checkboxTot = 0;
    #checkboxSel = 0;

    constructor($where) {
        this.#top = $where.find(".dropdown-select-top");
        this.#body = $where.find(".dropdown-select-body");
        this.#checkboxTot = $(this.#body).find("input[type='checkbox']").length;
        let this_ref = this;
        $(this.#top).on("click", () => $(this.#body).slideToggle("fast"));
        $(this.#body).find("input[type='checkbox']").on("click", function () {
            this_ref.#propValue(this);
        });
    }

    /**
     * @description fetch and return the array of value kept in prvState
     * @return {[]}
     */
    getData() {
        return this.#checkData;
    }

    /**
     * @description Check if data is inside checkbox;
     * @param {Number|String} data Data to check
     * @return {Boolean}
     */
    hasData(data) {
        return this.#checkData.includes(data.toString());
    }

    /**
     * @description return the number of checkbox selected
     * @return {Number} number of checkbox selected
     */
    getCountSel() {
        return this.#checkboxSel;
    }

    /**
     * @description return the total number of checkbox
     * @return {Number} total number of checkbox
     */
    getCountTot() {
        return this.#checkboxTot;
    }

    /**
     * @description Set and push inside the pvtState the value inside arrData.
     * @param {[]} arrData new data to push
     */
    addData(arrData) {
        arrData.forEach(data => {
            let el = $(this.#body).find(`input[value='${data}']`);
            let paragText = $(el).closest("li").text();
            this.#pushData(data.toString(), paragText, el);
        });
    }

    /**
     * @description Check all the checkbox and push their value in the state.
     */
    checkAll() {
        let this_ref = this;
        $(this.#body).find(`input`).each(function () {
            let data = $(this).val();
            let paragText = $(this).closest("li").text();
            this_ref.#pushData(data.toString(), paragText, this);
        });
    }

    /**
     * @description if the first argument is an empty array then it wipe off the pvtState, else it remove just the data passed as argument in the array.
     * @param {[]} arrData empty or with value to remove.
     */
    removeData(arrData = []) {
        if (arrData.length !== 0) {
            arrData.forEach(data => {
                let el = $(this.#body).find(`input[value='${data}']`);
                let paragText = $(el).closest("li").text();
                this.#popData(data.toString(), paragText, el);
            });
        } else {
            // Remove everything
            this.#checkData.splice(0, this.#checkData.length);
            this.#paragraph.splice(0, this.#paragraph.length);
            $(this.#body).find(`input`).prop("checked", false);
            this.#showHideParagraph();
        }
    }

    /**
     * @description fires the event handler when a checkbox is clicked.
     * If it's checked the value of the checkbox is pushed inside the prvState
     * else il popped.
     */
    #propValue(element) {
        let data = $(element).val();
        let textParag = $(element).closest("li").text();
        if ($(element).is(":checked")) this.#pushData(data, textParag);
        else this.#popData(data, textParag);
    }

    /**
     * @description Push the new data and text for the paragraph inside the state
     * @param {string} data the new value from the checkbox
     * @param {string} textParag the text from the <li> tag
     * @param el {jQuery} Dom element
     */
    #pushData(data, textParag, el = undefined) {
        if (this.#checkData.includes(data)) return;
        if (el) $(el).prop("checked", true);
        this.#checkData.push(data);
        this.#paragraph.push(textParag);
        this.#checkboxSel++;
        this.#showHideParagraph();
    }

    /**
     * @description Pop the selected data and text for the paragraph from the state
     * @param {string} data value to pop
     * @param {string} textParag the text from the <li> tag
     * @param el {jQuery} Dom element
     */
    #popData(data, textParag, el = undefined) {
        if (!this.#checkData.includes(data)) return;
        if (el) $(el).prop("checked", false);
        this.#checkData.splice(this.#checkData.indexOf(data), 1);
        this.#paragraph.splice(this.#paragraph.indexOf(textParag), 1);
        this.#checkboxSel--;
        this.#showHideParagraph();
    }

    /**
     * @description Put into the paragraph all the text from the checkbox checked. If none, the paragraph disappear and the classic header is shown.
     */
    #showHideParagraph() {
        $(this.#top).find("p.dropdown-checkbox-selected").text(this.#paragraph.join(", "));
        if (this.#paragraph.length === 0) {
            // No tag selected, so i need to hide the paragraph from the dom and show the selection header again.
            $(this.#top).find(".dropdown-hide-on-select").show();
            $(this.#top).find(".dropdown-checkbox-selected").hide();
        } else {
            // I have some tag to show, no need for the select header
            $(this.#top).find(".dropdown-hide-on-select").hide();
            $(this.#top).find(".dropdown-checkbox-selected").show();
        }
    }
}