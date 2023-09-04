import * as React from 'react'
import React__default from 'react'
import PropTypes from 'prop-types'
import _extends from '@babel/runtime/helpers/extends'
import Svg, { Path } from 'react-native-svg'

const SvgArrowNarrowLeft = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M8.333 6.667 5 10m0 0 3.333 3.333M5 10h10',
      stroke: props?.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  )

const SvgArrowDown = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      fill: 'none',
      d: 'M0 0h24v24H0z',
    }),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'm7 10 5 5 5-5',
    }),
  )

const SvgCalendarOutline = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M12.666 4v2.4M7.334 4v2.4M4 8.8h12M5.333 5.2h9.334c.736 0 1.333.538 1.333 1.2v8.4c0 .663-.597 1.2-1.333 1.2H5.333C4.597 16 4 15.463 4 14.8V6.4c0-.662.597-1.2 1.333-1.2Z',
      stroke: props.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  )

const SvgCalendar = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M6.875 11.792a.75.75 0 0 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 0 0 0 1.5v-1.5Zm3.352 1.5a.75.75 0 0 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 1 0 0 1.5v-1.5Zm3.306 1.5a.75.75 0 0 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 0 0 0 1.5v-1.5Zm-6.655 4.495a.75.75 0 0 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 0 0 0 1.5v-1.5Zm3.352 1.5a.75.75 0 0 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 1 0 0 1.5v-1.5Zm3.306 1.5a.75.75 0 1 0 0-1.5v1.5Zm-.001-1.5a.75.75 0 0 0 0 1.5v-1.5ZM6.375 2.292a.75.75 0 1 0-1.5 0h1.5Zm-1.5 2.916a.75.75 0 1 0 1.5 0h-1.5Zm-1.75 1.75a.75.75 0 1 0 0 1.5v-1.5Zm13.75 1.5a.75.75 0 0 0 0-1.5v1.5Zm-1.333-6.166a.75.75 0 0 0-1.5 0h1.5Zm-1.5 2.916a.75.75 0 0 0 1.5 0h-1.5Zm-8.017 5.834c0 .47.38.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1h-.001v1.5h.001v-1.5Zm2.5.75c0 .47.381.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1v1.5-1.5Zm2.456.75c0 .47.38.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1h-.001v1.5-1.5Zm-7.506 3.745c0 .47.38.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1h-.001v1.5h.001v-1.5Zm2.5.75c0 .47.381.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1v1.5-1.5Zm2.456.75c0 .47.38.85.85.85v-1.5a.65.65 0 0 1 .65.65h-1.5Zm.85.85c.47 0 .85-.38.85-.85h-1.5a.65.65 0 0 1 .65-.65v1.5Zm.85-.85a.85.85 0 0 0-.85-.85v1.5a.65.65 0 0 1-.65-.65h1.5Zm-.85-.85a.85.85 0 0 0-.85.85h1.5a.65.65 0 0 1-.65.65v-1.5Zm0 .1h-.001v1.5-1.5ZM5 4.708h10v-1.5H5v1.5Zm10 0c1.082 0 1.958.877 1.958 1.959h1.5A3.458 3.458 0 0 0 15 3.208v1.5Zm1.958 1.959V15h1.5V6.667h-1.5Zm0 8.333A1.958 1.958 0 0 1 15 16.958v1.5A3.458 3.458 0 0 0 18.458 15h-1.5ZM15 16.958H5v1.5h10v-1.5Zm-10 0A1.958 1.958 0 0 1 3.042 15h-1.5A3.458 3.458 0 0 0 5 18.458v-1.5ZM3.042 15V6.667h-1.5V15h1.5Zm0-8.333c0-1.082.876-1.959 1.958-1.959v-1.5a3.458 3.458 0 0 0-3.458 3.459h1.5Zm1.833-4.375v2.916h1.5V2.292h-1.5Zm-1.75 6.166h13.75v-1.5H3.125v1.5Zm10.917-6.166v2.916h1.5V2.292h-1.5Z',
      fill: props.color || '#0A0A0A',
    }),
  )

const SvgCalenderFilled = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        className: 'calender-filled_svg__slds-button__icon',
        'data-key': 'event',
        'aria-hidden': 'true',
        viewBox: '0 0 52 52',
        width: 24,
        height: 24,
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M46.5 20h-41c-.8 0-1.5.7-1.5 1.5V46c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V21.5c0-.8-.7-1.5-1.5-1.5zM19 42c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm10 10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm10 10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm5-25h-5V5c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v2H19V5c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v2H8c-2.2 0-4 1.8-4 4v2.5c0 .8.7 1.5 1.5 1.5h41c.8 0 1.5-.7 1.5-1.5V11c0-2.2-1.8-4-4-4z',
      fill: props.color || '#fff',
    }),
  )

const SvgCheck = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'm4 10.86 3.429 3.44L16 5.7',
      stroke: props.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  )

const SvgDownload = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        className:
          'download_svg__slds-button__icon download_svg__slds-button__icon_left',
        'data-key': 'upload',
        'aria-hidden': 'true',
        viewBox: '0 0 52 52',
        width: 24,
        height: 24,
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M48.5 31h-3c-.8 0-1.5.8-1.5 1.5v10c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-10c0-.7-.7-1.5-1.5-1.5h-3c-.8 0-1.5.8-1.5 1.5V46c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V32.5c0-.7-.7-1.5-1.5-1.5z',
      fill: props.color || '#fff',
    }),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M27 2.4c-.6-.6-1.5-.6-2.1 0L11.4 15.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l5.6-5.6c.6-.6 1.8-.2 1.8.7v21.2c0 .8.6 1.5 1.4 1.5h3c.8 0 1.6-.8 1.6-1.5V15.3c0-.9 1-1.3 1.7-.7l5.6 5.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L27 2.4z',
      fill: props.color || '#fff',
    }),
  )

const SvgEyeOff = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'm2.5 2.5 2.991 2.991M17.5 17.5l-2.99-2.99m-2.948 1.177A8.337 8.337 0 0 1 2.048 10c.29-.92.734-1.772 1.303-2.524m4.881.756a2.5 2.5 0 0 1 3.536 3.536M8.232 8.232l3.536 3.536M8.232 8.232 5.491 5.491m6.277 6.277L5.49 5.49m6.277 6.277 2.741 2.741M5.491 5.491A8.337 8.337 0 0 1 17.952 10a8.353 8.353 0 0 1-3.443 4.51',
      stroke: props.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  )

const SvgEye = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        width: 24,
        height: 24,
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
      stroke: props.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M2.049 10a8.337 8.337 0 0 1 15.903 0A8.337 8.337 0 0 1 2.05 10Z',
      stroke: props.color || '#0A0A0A',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }),
  )

const SvgFileEdit = (props) =>
  /*#__PURE__*/ React.createElement(
    Svg,
    _extends(
      {
        className:
          'file-edit_svg__slds-icon file-edit_svg__slds-icon-text-default file-edit_svg__slds-icon_small',
        'data-key': 'edit_form',
        'aria-hidden': 'true',
        viewBox: '0 0 52 52',
        width: 24,
        height: 24,
      },
      props,
    ),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M31.4 15.3h8.2c.6 0 1.1-.5 1.1-1.1 0-.3-.1-.5-.3-.8L30.2 3.3c-.3-.2-.5-.3-.8-.3-.6 0-1.1.5-1.1 1.1v8.1c0 1.7 1.4 3.1 3.1 3.1zm18.1 10.4-.9-.9c-.6-.6-1.5-.6-2.2 0L34.5 36.7c-.1.1 0 .2 0 .3v2.5c0 .2 0 .4.2.4h2.6c.1 0 .2-.1.3-.1L49.5 28c.7-.8.7-1.7 0-2.3z',
      fill: props.color || '#fff',
    }),
    /*#__PURE__*/ React.createElement(Path, {
      d: 'M39.9 44.4h-7.1c-1.6 0-2.9-1.3-2.9-2.9v-5.4c0-.8.2-1.6.9-2.1l9.5-9.5c.3-.3.5-.7.5-1.1v-2c0-.8-.7-1.5-1.5-1.5h-11c-2.6 0-4.6-2.1-4.6-4.6V4.5c0-.8-.7-1.5-1.6-1.5H6.6C4.1 3 2 5.1 2 7.6v36.8C2 46.9 4.1 49 6.6 49H36c2.2 0 4.2-1.6 4.6-3.7.1-.4-.3-.9-.7-.9zM8.2 16.8c0-.8.7-1.5 1.5-1.5h6.2c.9 0 1.5.7 1.5 1.5v1.5c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5v-1.5zm15.5 19.9c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5v-1.5c0-.8.7-1.5 1.5-1.5h12.4c.9 0 1.5.7 1.5 1.5v1.5zm3.1-9.2c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5V26c0-.8.7-1.5 1.5-1.5h15.5c.9 0 1.5.7 1.5 1.5v1.5z',
      fill: props.color || '#fff',
    }),
  )

const Icon = (props) => {
  if (props.name === 'ArrowNarrowLeft') {
    return /*#__PURE__*/ React__default.createElement(SvgArrowNarrowLeft, props)
  }
  if (props.name === 'ArrowDown') {
    return /*#__PURE__*/ React__default.createElement(SvgArrowDown, props)
  }
  if (props.name === 'CalendarOutline') {
    return /*#__PURE__*/ React__default.createElement(SvgCalendarOutline, props)
  }
  if (props.name === 'Calendar') {
    return /*#__PURE__*/ React__default.createElement(SvgCalendar, props)
  }
  if (props.name === 'CalenderFilled') {
    return /*#__PURE__*/ React__default.createElement(SvgCalenderFilled, props)
  }
  if (props.name === 'Check') {
    return /*#__PURE__*/ React__default.createElement(SvgCheck, props)
  }
  if (props.name === 'Download') {
    return /*#__PURE__*/ React__default.createElement(SvgDownload, props)
  }
  if (props.name === 'EyeOff') {
    return /*#__PURE__*/ React__default.createElement(SvgEyeOff, props)
  }
  if (props.name === 'Eye') {
    return /*#__PURE__*/ React__default.createElement(SvgEye, props)
  }
  if (props.name === 'FileEdit') {
    return /*#__PURE__*/ React__default.createElement(SvgFileEdit, props)
  }
}
Icon.propTypes = {
  name: PropTypes.oneOf([
    'ArrowNarrowLeft',
    'ArrowDown',
    'CalendarOutline',
    'Calendar',
    'CalenderFilled',
    'Check',
    'Download',
    'EyeOff',
    'Eye',
    'FileEdit',
  ]),
}

export { Icon }
