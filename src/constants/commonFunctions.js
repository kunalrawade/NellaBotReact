const GetDropDown = (placeHolder, value, key, isAddBlank) => {
  const DropDown = {
    placeholder: placeHolder,
    options: [],
  };

  if (isAddBlank) {
    DropDown.options.push({ value: 0, label: '' });
  }

  DropDown.options.push({ value: key.key, label: value.value });
  return DropDown;
};

export default GetDropDown;
