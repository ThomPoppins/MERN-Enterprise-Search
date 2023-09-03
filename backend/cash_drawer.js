// Cash register drawer function:
// function checkCashRegister is a function that takes three arguments:
// price, cash, and cid.
// price is the price of the item.
// cash is the amount of cash given by the customer.
// cid is the cash-in-drawer array.
// cid is a 2D array listing available currency.
function checkCashRegister(price, cash, cid) {
  // The values of each currency:
  const currencyValues = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  // change is the amount of change to return
  let change = cash - price;
  // totalCID is the total amount of cash in the drawer
  let totalCID = 0;
  // changeArr is the array of change to return
  let changeArr = [];

  // Loop through the cid array from the end to the beginning
  for (let i = cid.length - 1; i >= 0; i--) {
    // currencyName is the name of the currency
    // (e.g. QUARTER)
    const currencyName = cid[i][0];
    // console.log("currencyName:", currencyName);

    // currencyTotal is the total amount of the currency
    // (e.g. 4.25 for QUARTER)
    const currencyTotal = cid[i][1];
    // console.log("currencyTotal:", currencyTotal);

    // currencyValue is the value of the currency
    // (e.g. 0.25 for QUARTER)
    const currencyValue = currencyValues[currencyName];
    // console.log("currencyValue:", currencyValue);

    // currencyAmount is the amount of the currency
    // (e.g. 17 for QUARTER)
    // toFixed(2) is used to round the number to 2 decimal places
    // currencyAmount is a string
    let currencyAmount = (currencyTotal / currencyValue).toFixed(2);
    console.log("currencyName:", currencyName);
    console.log("currencyAmount:", typeof currencyAmount);

    console.log("currencyAmount:", typeof currencyAmount);
    console.log("currencyAmount:", currencyAmount);

    // currencyAmount is converted to a number
    // currencyToReturn is the amount of the currency to return
    // (e.g. 2 for QUARTER)
    let currencyToReturn = 0;

    // While the change is greater than or equal to the currency value
    while (change >= currencyValue && currencyAmount > 0) {
      // Subtract the currency value from the change
      change -= currencyValue;
      // console.log("currencyName:", currencyName);
      // console.log("currencyTotal:", currencyTotal);
      // console.log("currencyValue:", currencyValue);
      // console.log("currencyAmount:", currencyAmount);
      // console.log("currencyToReturn:", currencyToReturn);

      // console.log("change:", change);
      // Round the change to 2 decimal places
      // (e.g. 0.5 for QUARTER)
      // (e.g. 0.25 for QUARTER)
      change = Math.round(change * 100) / 100;
      // Subtract 1 from the currency amount
      // this is because we are returning 1 of the currency
      currencyAmount--;
      console.log("currencyAmount after subtracting 1:", currencyAmount);
      // Add 1 to the currency to return
      // this is because we are returning 1 of the currency
      // (e.g. 1 for QUARTER)
      currencyToReturn++;
    }

    console.log("currencyAmount after while:", currencyAmount);

    console.log(
      "currencyName:",
      currencyName + ", ",
      "currencyToReturn:",
      currencyToReturn
    );
    // If the currency to return is greater than 0
    if (currencyToReturn > 0) {
      // Push the currency name and the currency value
      // multiplied by the currency to return.
      changeArr.push([currencyName, currencyToReturn * currencyValue]);
      // Add the currency value multiplied by the currency to return
      // to the totalCID
      // totalCID += currencyToReturn * currencyValue;

      // calculate the totalCID
      totalCID += cid[i][1];
    }
    console.log("changeArr:", changeArr);
  }

  console.log("totalCID:", totalCID);
  console.log("cash - price:", cash - price);

  // Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if it cannot return the exact change.
  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  // Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
  else if (totalCID === cash - price) {
    return { status: "CLOSED", change: cid };
  }
  // Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
  else {
    return { status: "OPEN", change: changeArr };
  }
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);

// console.log(
//   checkCashRegister(3.26, 100, [
//     ["PENNY", 1.01],
//     ["NICKEL", 2.05],
//     ["DIME", 3.1],
//     ["QUARTER", 4.25],
//     ["ONE", 90],
//     ["FIVE", 55],
//     ["TEN", 20],
//     ["TWENTY", 60],
//     ["ONE HUNDRED", 100],
//   ])
// );
