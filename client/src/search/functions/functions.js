function strip(title) {
  return title.replace(/^(a|an|the)\s/i, "");
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Switch + Strip Adapted From - https://codepen.io/-J0hn-/pen/MEpavZ
export function SortList(list, sortValue) {
  switch (sortValue) {
    case "0-9":
      return list.sort((a, b) => (a.total > b.total ? 1 : -1));
    case "9-0":
      return list.sort((a, b) => (b.total > a.total ? 1 : -1));
    case "A-Z":
      return list.sort((a, b) => (strip(a.LGA) > strip(b.LGA) ? 1 : -1));
    case "Z-A":
      return list.sort((a, b) => (strip(b.LGA) > strip(a.LGA) ? 1 : -1));
    default:
      return list.sort((a, b) => (strip(a.LGA) > strip(b.LGA) ? 1 : -1));
  }
}

// Adapted From - https://codepen.io/mhfen/pen/wKeJEX
export function SearchList(list, searchValue) {
  let updatedList = list;
  updatedList = updatedList.filter(item => {
    return item.LGA.toLowerCase().search(searchValue.toLowerCase()) !== -1;
  });
  return updatedList;
}
