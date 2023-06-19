const parseEnv = () => {
  let ars = "";
  let isBool = true;
  Object.entries(process.env).forEach(([key, value]) => {
    if (key.substring(0, 4) === "RSS_") {
      const element = `${key}=${value};`;
      if (isBool) {
        ars += element;
        isBool = false;
      } else ars += ` ${element}`;
    }
  });
  if (ars) console.log(ars.slice(0, -1));
};

parseEnv();
