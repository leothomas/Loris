/**
 * Modify behaviour of specified column cells in the Data Table component
 * @param {string} column - column name
 * @param {string} cell - cell content
 * @param {arrray} rowData - array of cell contents for a specific row
 * @param {arrray} rowHeaders - array of table headers (column names)
 * @return {*} a formated table cell for a given column
 */
function formatColumn(column, cell, rowData, rowHeaders) {
  // If a column if set as hidden, don't display it
  if (loris.hiddenHeaders.indexOf(column) > -1) {
    return null;
  }

  var errors = {
                        1 : " MRI PF incomplete, Tarchive exists, scan inserted in browser, QC pass",
                        2 : " MRI PF Completed = No Scan, No Tarchive, scan inserted in browser, QC pass",
                        3 : " MRI PF incomplete, No Tarchive, scan inserted in browser, QC pass",
                        4 : " MRI PF Completed = No Scan, Tarchive exists, scan inserted in browser, QC pass"
  };

  // Create the mapping between rowHeaders and rowData in a row object.
  var row = {};
  rowHeaders.forEach(function(header, index) {
    row[header] = rowData[index];
  }, this)

  if (column === "Action"){
    if (inObject(row['Error Message'], errors) ){
      var mpfURL = loris.BaseURL+'/mri_parameter_form/?commentID=' + row['CommentID'] +
        '&sessionID=' + row['Session ID'] + '&candID=' + row['DCCID'];
      return <td> <a href={mpfURL}>MRI Parameter Form</a> </td>;
    }
  }

  return <td>{cell}</td>;
}
function inObject(key, object){
  console.log("checking");
  for (var i = 0; i<Object.keys(object).length; i++){
    if (key === object[i]){
      return true;
    }
  }
  return false;
}
export default formatColumn;
