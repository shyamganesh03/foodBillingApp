export const toggleDropdown = (visible, ref, callback) => {
  let dropdownAlignment
  ref?.current?.measure((_fx, _fy, _w, _h, _px, py) => {
    dropdownAlignment = {
      top: py + 38,
      left: _px,
      width: _w,
    }
    // Call the callback with the calculated value
    callback(dropdownAlignment)
  })
  return dropdownAlignment
}
