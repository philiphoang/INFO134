/**
 * Contains functions that is used in other files instead of having the same functions writed multiple times. 
 */

/**
 * Find all the municipalities names in the dataset
 * 
 * @param {Object} data Object with multiple values inside it. 
 * 
 * @return a list with names  
 */
function names(data) {
	var list = []
    for (var x in data.elementer) 
        list.push(x);

    return list;
}


/**
 * Find all the municipalities ids in the dataset. 
 * 
 * @param {Object} data Object with multiple values inside it. 
 * @param {Object} names Object with municipalities name.  
 *  
 * @return a list with ids
 */
function ids(data, names) {
    var list = [];
    for (var i = 0; i < names.length; i++) 
        list.push(data.elementer[names[i]].kommunenummer)
    
    return list;
}


/**
 * Read and parse the dataset for url. 
 * 
 * @param {String} url Link to the dataset  
 * @param {Object} obj Object to save the parsed data 
 */
function load(url, obj, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
		obj.dataset = JSON.parse(request.responseText);
		
		if (callback) {
			callback(obj.dataset);
		}
      };
    }
    request.send()
}

/**
 * Create tablerow element and its textnode, and append it to the table. 
 * 
 * @param {Table (Element)} table Table element  
 * @param {Tablerow (Element)} row Tablerow 
 * @param {String} text Text content 
 * @param {String} element Type of element to be created from DOM
 * @param {String} label Give created element a text-label 
 */
function createTableRowElement(table, row, text, element, label) {
	var element = document.createElement(element);
	element.setAttribute("data-label", label);
    var textNode = document.createTextNode(text)
	
    element.appendChild(textNode);
    row.appendChild(element);
    table.appendChild(row)
}

/**
 * Add multiple tablerows by going through a list and call createTableRowElement for each item
 * 
 * @param {Table (Element)} table Table element  
 * @param {Tablerow (Element)} row Table row 
 * @param {List} list List with strings 
 * @param {String} element Type of element to be created from DOM
 * @param {String} label Give the created element a text-label 
 */
function addMultipleTableRowElement(table, row, list, element, label) {
  for (var i = 0; i < list.length; i++) 
      createTableRowElement(table, row, list[i], element, label)
}

/**
 * Add multiple tablerows by going through a list and call createTableRowElement for each item. 
 * Also, takes a list of labels (strings).
 * 
 * @param {Table (Element)} table Table element  
 * @param {Tablerow (Element)} row Table row 
 * @param {List} list List with strings 
 * @param {String} element Type of element to be created from DOM
 * @param {String} label Label list with strings 
 */
function addMultipleTableRowElementWithLabelList(table, row, list, element, labelList) {
	for (var i = 0; i < list.length; i++) 
		createTableRowElement(table, row, list[i], element, labelList[i])
  }

/** 
 * Clear content in div
 * 
 * @param {String} div 
 */ 
function clear(div) {
    var div = document.getElementById(div);
	div.innerHTML = ""; //Clear tables
}