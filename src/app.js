// this is an example of improting data from JSON
import orders from '../data/orders.json';
import users from '../data/users.json';
import companies from '../data/companies.json';

export default (function () {

    function jsontable(objec){
      //var cols = Object.keys(objec[0]);
      var cols=["transaction_id","user_id","created_at","total",
      "card_number","card_type", "order_country"]
    //  console.log(cols);
      var headerRow = '';
      var bodyRows = '';

      var  classes = '';

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      cols.map(function(col) {
        headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
      });
      headerRow='<th>Transaction ID</th><th>User Info</th><th>Order Date</th><th>Order Amount</th><th>Card Number</th><th>Card Type</th><th>Location</th>'
      var id_count=1;
      objec.map(function(row) {
        bodyRows += `<tr id=order_${id_count}>`;
        id_count++;

        cols.map(function(colName) {
          var t='';
        //  if (colName=="created_at") {return convert(row[colName]);}
          if (colName=="order_country"){
            t=row[colName]+' ('+row["order_ip"]+')';
            bodyRows += '<td>' + t + '</td>';
          } else if (colName=="created_at") {
            bodyRows += '<td>' + convert(row[colName]) + '</td>';
          }
          else if (colName=="card_number") {
              bodyRows += '<td>' + row[colName].substr(0,2) +'xxxxxxxxxx'+row[colName].substr(-4)+ '</td>';
            }
          else if (colName=="user_id") {
              bodyRows += '<td class="user_data">' + row[colName] + '</td>';
            }
          else if (colName=="total") {
                bodyRows += '<td>' + '$'+row[colName] + '</td>';
              }
          else {
            bodyRows += '<td>' + row[colName] + '</td>';
          }

        //  bodyRows += '<td>' + t + '</td>';
        })

        bodyRows += '</tr>';
      });
    //  console.log(bodyRows);
      return '<table><thead><tr>' +
         headerRow +
         '</tr></thead><tbody>' +
         bodyRows +
         '</tbody></table>';

    }
    function convert(timestamp){
    var a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  console.log(convert(0));

      document.getElementById("app").innerHTML=jsontable(orders);
    // YOUR CODE GOES HERE
    // next line is for example only
    document.getElementById("app").innerHTML += "<h1>Hello WG Forge</h1>";
}());
