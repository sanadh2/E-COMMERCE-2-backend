const numericFilters = "price>30";
const queryObject = {};
const operatorMap = {
  ">": "$gt",
  ">=": "$gte",
  "=": "$eq",
  "<": "$lt",
  "<=": "$lte",
};
const regEx = /\b(<|>|<=|>=|=)\b/g;
const filters = numericFilters.replace(
  regEx,
  (match) => `-${operatorMap[match]}-`
);  
console.log(filters);
const options = ["price", "rating"];
const filtered = filters.split(",").forEach((element) => {
  const [field, operator, value] = element.split("-");
  console.log(field, operator, value);
  if (options.includes(field)) {
    queryObject[field] = { [operator]: Number(value) };
  }
  console.log(queryObject);
});
