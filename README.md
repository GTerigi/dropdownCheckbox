# dropdownCheckbox

It's a minimal dropdown select with checkbox inside.

Just download the minified file and link it as resource in your project. Use the .js and .scss file if you want to modify it.
jQuery is a dependancy! make sure to import the jQuery script before this one. [You can download it here.](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js)  
## Working Fiddle on [CodePen](https://codepen.io/gterigi/pen/abVxbeP)
* * *

# Method
## Initialization
```html
<!-- .dropdown-checkbox-wrap is the wrapper, whatever you want to call it is fine. -->
<div class="dropdown-checkbox-wrap whatever-selector-you-want">
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

If you want to initialize the dropdown checkbox:
```javascript
let dropdown = new dropdownCheckbox($(".whatever-selector-you-want"));
```

### Get the Data
```javascript
  let data= dropdown.getData();
```
Returns the array containing the value of the checkbox checked.
### Check if has some data
```javascript
let boolval = dropdown.hasData(2);
```
Check if the value 2 is inside the state.

### Set or Add the Data manually
```javascript
dropdown.addData([1,2,3]);
```
Set checked all the checkbox with the value equals to the value passed in the array.
To avoid type mismatch with the checkbox type value (string) all the data inside the array is parsed as string and not as integer. 

The checkbox and header are updated.

### Remove some or all Data
```javascript
dropdown.removeData([1,2,3]); // Specify the data to remove.
dropdown.removeData(); // Remove all Data
```
Remove from the array all the value passed as argument (all value is empty array or null is passed).
To avoid type mismatch with the checkbox type value (string) all the data inside the array is parsed as string and not as integer. 

The checkbox and header are updated.

## Utility

### Count selected checkbox
```javascript
let numberCheckboxSelected = dropdown.getCountSel();
```
return the number of checkbox selected 

### Count selected checkbox
```javascript
let numberCheckboxTot = dropdown.getCountTot();
```
return the number of initial checkbox inside the select (checkbox added after the initialization are not counted)

### CheckAll Checkbox
```javascript
let numberCheckboxTot = dropdown.checkAll();
```
Check all checkbox and push their value in the state.
