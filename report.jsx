var React = require("react");
var ReactPivot = require("react-pivot");
var createReactClass = require("create-react-class");

var rows = require("./data.json");

var dimensions = [
  { title: "Host", value: "host" },
  {
    title: "Date Type",
    value: function(row) {
      return row.date;
    }
  }
];
var reduce = function(row, memo) {
  memo.count = (memo.count || 0) + 1;
  memo.impression =
    (memo.impression || 0) + (row.type === "impression" ? 1 : 0);
  memo.load = (memo.load || 0) + (row.type === "load" ? 1 : 0);
  memo.display = (memo.display || 0) + (row.type === "display" ? 1 : 0);
  memo.loadRate = (memo.load / memo.impression) * 100
  memo.displayRate = (memo.display / memo.load) * 100
  return memo;
};

var calculations = [
  {
    title: "Impressions",
    value: "impression"
  },
  {
    title: "Display",
    value: "display"
  },
  {
    title: "Load",
    value: "load"
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function(val, row) {
      return `${(val).toFixed(2)}%`
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function(val, row) {
      return `${(val).toFixed(2)}%`
    }
  }
];

module.exports = createReactClass({
  render() {
    return (
      <ReactPivot
        rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        nPaginateRows={25}
      />
    );
  }
});
