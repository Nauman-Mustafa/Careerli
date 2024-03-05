export const getYears = () => {
  let minOffset = 0,
    maxOffset = 75;
  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x);
  }
  const years = allYears.map((x) => {
    return(<>
  
     <option key={x}>{x}</option></>);
  });
  return years;
};
