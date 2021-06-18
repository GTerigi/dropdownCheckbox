# minimal_checkbox_dropdown

It's a minimal dropdown select with checkbox inside.

It's made to performe as a jQuery plugin.

Just download the minified file and link it as resource in your project. Use the .js and .scss file if you want to modify it.

## Working Fiddle on [CodePen](https://codepen.io/gterigi/pen/qBrgEOR)
* * *

### Initialization

```html
<!-- .dropdown-checkbox-wrap is the wrapper, whatever you want to call it is fine. -->
<div class="dropdown-checkbox-wrap">
	<!-- .dropdown-select-top is the header -->
  <div class="dropdown-select-top">
    <span class="dropdown-hide-on-select">Select all the checkbox you want</span> <!-- Base strign when no checkbox are selected -->
    <p class="dropdown-checkbox-selected"></p> <!-- Paragraph to store all the checkbox selected -->
  </div>
  <div class="dropdown-select-body"> <!-- Body and conteiner of the checkbox -->
    <ul>
      <li><input type="checkbox" value="1">Apple</li>
      <li><input type="checkbox" value="2">Samsung</li>
      <li><input type="checkbox" value="3">Sony</li>
      <li><input type="checkbox" value="4">Honor</li>
      <li><input type="checkbox" value="5">LG</li>
    </ul>
  </div>
</div>
```

If you want to initialize the dropdown checkbox you just need to 
```javascript
let dropdown = $(".dropdown-checkbox-wrap").dropdownCheckbox();
```

### Get the Data
```javascript
  let data= $(dropdown).dropdownCheckbox("getData");
```
Returns the array containing the value of the checkbox checked.

### Set the Data manually
```javascript
  $(dropdown).dropdownCheckbox("setData",[1,2,4]);
```
Set checked all the checkbox with the value equals to the value passed in the array.
To avoid type mismatch with the checkbox type value (string) all the data inside the array is parsed as string and not as integer. 

The checkbox and header are updated.

### Remove some or all Data
```javascript
  $(dropdown).dropdownCheckbox("removeData"); // Remove all Data
  $(dropdown).dropdownCheckbox("removeData",[1,2,3]); // Specify the data to remove.
```
Remove from the array all the value passed as argument (all value is empty array or null is passed).
To avoid type mismatch with the checkbox type value (string) all the data inside the array is parsed as string and not as integer. 

The checkbox and header are updated.
