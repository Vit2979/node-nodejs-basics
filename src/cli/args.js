const parseArgs = () => {
  let ars = "";
  let isBool = true;
  process.argv.forEach((element, i) => {
    if (i > 1) {
      if (isBool) {
        ars += element;
        isBool = false;
      } else {
        if (i % 2 === 0) ars += `, ${element}`;
        else ars += ` is ${element}`;
      }
    }
  });
  if (ars) console.log(ars);
};

parseArgs();
