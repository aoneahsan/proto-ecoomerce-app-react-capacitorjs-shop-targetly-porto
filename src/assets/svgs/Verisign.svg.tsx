import React from 'react';

const ZVerisignLogoSvg: React.FC<{
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}> = ({ color = 'currentColor', className, onClick }) => {
  return (
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   x='0px'
    //   y='0px'
    //   viewBox='0 0 49.605 49.605'
    //   fill={color}
    //   className={className}
    //   onClick={onClick}
    // >
    //   <g>
    //     <g>
    //       <polygon points='15.134,15.342 15.134,16.145 15.135,16.145 15.135,16.146 15.945,16.146 15.945,15.342' />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <rect x='15.945' y='14.526' width='0.816' height='0.816' />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M14.411,17.756v-0.799h0.724v-0.811h-0.001v-0.001h-1.48v0.812h-0.741v1.562h0.741l-0.001-0.763h0.757v0.764h-0.757v0.757
    // 	h-0.741v0.77h-0.77v-0.769h0.769V18.52h-0.769v-0.729h-0.764v0.729h0.763v0.757h-1.272v0.556h-0.683v0.68h0.764v0.758h-0.764
    // 	v-0.758H9.375v1.191H8.61v0.762H8.102v0.762H7.546c-0.631,0.934-2.205,3.846-2.68,5.03c-1.714-2.387-3.045-3.333-4.093-3.673
    // 	c-0.562-0.17-1.25,0.446-0.307,1.414c2.153,2.373,2.836,4.338,3.49,5.904c0.348,0.826,1.904,0.955,2.217,0.113
    // 	c0.66-1.779,1.627-3.777,2.761-5.418v-0.851h0.614l0.001-0.768h0.637v-0.886h0.77v-0.858h-0.77V22.47h0.77v0.765h0.752v-0.769
    // 	h0.608v-0.931h0.677v-0.639h0.66v-1.618h0.758V18.52h0.851v-0.764H14.411z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M32.003,22.099c-0.417,0-0.747,0.33-0.747,0.745c-0.002,0.427,0.358,0.729,0.769,0.729c0.389,0,0.707-0.33,0.707-0.729
    // 	C32.732,22.429,32.414,22.099,32.003,22.099z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M21.93,22.099c-0.411,0-0.741,0.33-0.741,0.745c0,0.427,0.359,0.729,0.769,0.729c0.389,0,0.707-0.33,0.707-0.729
    // 	C22.665,22.429,22.347,22.099,21.93,22.099z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <rect x='15.945' y='16.15' width='0.816' height='0.816' />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M46.988,29.719v-2.521c0-1.311-0.74-1.901-2.057-1.901c-0.972,0-1.719,0.397-2.197,1.252h-0.029l-0.18-1.252
    // 	c-0.679,0.123-1.188,0.344-1.897,0.426v0.275c0.438,0,0.811-0.057,0.92,0.439c0.069,0.318,0.069,1.283,0.069,1.67v1.691
    // 	c0,0.91,0.067,1.239-0.967,1.311v0.275c0.536-0.015,1.063-0.043,1.604-0.056c0.492,0.013,1.001,0.041,1.499,0.056V31.11
    // 	c-1.089-0.068-0.968-0.482-0.968-1.393v-2.136c0-1.006,0.688-1.846,1.767-1.846c1.311,0,1.27,1.351,1.27,2.301v1.763
    // 	c0,0.91,0.067,1.239-0.969,1.311v0.275c0.539-0.015,1.061-0.043,1.6-0.056c0.498,0.013,1.008,0.041,1.504,0.056V31.11
    // 	C46.877,31.04,46.988,30.625,46.988,29.719z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M39.574,25.341c-0.504,0-0.967,0.29-1.338,0.579c-0.471-0.426-1.117-0.619-1.754-0.619c-1.35,0-2.589,0.785-2.589,2.246
    // 	c0,0.88,0.673,1.638,1.472,1.9v0.027c-0.59,0.082-1.209,0.524-1.209,1.186c0,1.238,1.25,1.213,2.164,1.238
    // 	c0.948,0.057,2.467-0.012,2.467,1.338c0,1.115-1.049,1.529-2.016,1.529s-2.188-0.238-2.188-1.435c0-0.428,0.26-0.896,0.712-0.978
    // 	c-0.162-0.151-0.343-0.25-0.573-0.25c-0.598,0-1.02,0.581-1.02,1.146c0,1.435,1.748,1.832,2.889,1.832
    // 	c1.505,0,3.126-0.565,3.126-2.313c0-1.848-1.482-1.904-2.89-2.012l-0.926-0.043c-0.302-0.027-1.061,0.028-1.061-0.455
    // 	c0-0.562,1.061-0.562,1.479-0.578c1.418-0.068,2.645-0.537,2.645-2.162c0-0.499-0.168-0.982-0.497-1.353
    // 	c0.149-0.122,0.37-0.26,0.567-0.26c0.422,0,0.469,0.479,0.891,0.479c0.269,0,0.458-0.205,0.458-0.455
    // 	C40.383,25.504,39.925,25.337,39.574,25.341z M36.386,29.363c-0.996,0-1.323-1.021-1.323-1.849c0-0.869,0.287-1.899,1.348-1.899
    // 	c1.048,0,1.377,1.018,1.377,1.899C37.788,28.407,37.448,29.363,36.386,29.363z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M48.781,26.342c0.158-0.026,0.291-0.117,0.29-0.321c0-0.203-0.115-0.312-0.369-0.312h-0.44v1.137h0.146v-0.504h0.23
    // 	l0.317,0.504h0.168L48.781,26.342z M48.59,26.226h-0.185V25.83h0.254c0.14,0,0.267,0.037,0.267,0.195
    // 	C48.926,26.219,48.758,26.223,48.59,26.226z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M48.621,25.298c-0.553,0-0.984,0.429-0.984,0.983c0,0.549,0.431,0.983,0.984,0.983c0.553,0,0.984-0.431,0.984-0.983
    // 	C49.605,25.727,49.174,25.298,48.621,25.298z M48.621,27.126c-0.477,0-0.834-0.374-0.834-0.845s0.359-0.844,0.834-0.844
    // 	c0.472,0,0.826,0.372,0.826,0.844C49.447,26.749,49.095,27.124,48.621,27.126z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M19.152,25.296c-0.949,0-1.639,0.552-1.997,1.393h-0.029c0.018-0.498-0.04-0.994-0.162-1.393
    // 	c-0.607,0.137-1.215,0.384-1.863,0.427v0.273c0.439,0,0.787-0.055,0.908,0.441c0.099,0.316,0.081,1.297,0.081,1.668v1.691
    // 	c0,0.91,0.075,1.241-0.961,1.311v0.277c0.539-0.017,1.06-0.043,1.598-0.056c0.521,0.013,1.06,0.041,1.586,0.056v-0.277
    // 	c-1.157-0.055-1.048-0.385-1.048-1.391v-1.363c0-0.635,0-1.309,0.318-1.875c0.203-0.346,0.66-0.688,1.071-0.688
    // 	c0.538,0,0.417,0.717,0.995,0.717c0.261,0,0.48-0.234,0.48-0.498C20.129,25.504,19.579,25.296,19.152,25.296z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M14.526,27.665c0.139,0,0.342,0.057,0.342-0.123c0-1.489-1.279-2.246-2.628-2.246c-1.795,0-3.103,1.554-3.103,3.277
    // 	c0,1.764,1.406,2.963,3.114,2.963c1.036,0,1.806-0.371,2.454-1.17l-0.29-0.289c-0.411,0.549-1.036,1.02-1.736,1.02
    // 	c-1.476,0-2.165-1.459-2.165-2.77l0.059-0.662H14.526z M12.252,25.615c0.868,0,1.337,0.549,1.337,1.403
    // 	c0,0.345-0.452,0.275-0.672,0.276h-2.274C10.805,26.398,11.222,25.615,12.252,25.615z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M32.741,29.719v-4.422l-2.176,0.426v0.275c0.276-0.016,0.854-0.043,0.947,0.303c0.059,0.209,0.059,1.269,0.059,1.529
    // 	v1.969c-0.012,0.91,0.069,1.24-0.949,1.312v0.276c0.539-0.016,1.072-0.043,1.609-0.057c0.498,0.014,1.008,0.041,1.478,0.057
    // 	v-0.276C32.62,31.044,32.771,30.628,32.741,29.719z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M22.676,29.719v-4.422L20.5,25.723v0.275c0.277-0.016,0.856-0.043,0.949,0.303c0.058,0.209,0.058,1.269,0.058,1.529v1.969
    // 	c-0.018,0.91,0.069,1.24-0.949,1.312v0.276c0.532-0.016,1.071-0.043,1.609-0.057c0.498,0.014,1.007,0.041,1.476,0.057v-0.276
    // 	C22.555,31.04,22.705,30.625,22.676,29.719z'
    //       />
    //     </g>
    //   </g>
    //   <g>
    //     <g>
    //       <path
    //         d='M27.429,25.752c-0.852-0.36-1.829-0.732-1.829-1.822c0-0.894,0.729-1.459,1.608-1.459c1.338,0,1.984,1.033,2.299,2.177
    // 	h0.316l-0.062-2.383h-0.155l-0.319,0.536c-0.619-0.44-1.319-0.702-2.078-0.702c-1.499,0-2.726,0.909-2.726,2.479
    // 	c0,1.571,1.332,2.232,2.587,2.715c1.006,0.398,2.096,0.896,2.096,2.148c0,1.115-0.897,1.723-1.969,1.723
    // 	c-1.586,0-2.333-1.172-2.604-2.562h-0.318v2.687h0.15l0.33-0.579c0.747,0.551,1.478,0.827,2.414,0.827
    // 	c1.608,0,3.293-0.868,3.293-2.674C30.461,27.061,28.864,26.342,27.429,25.752z'
    //       />
    //     </g>
    //   </g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    //   <g></g>
    // </svg>

    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 256 256'
      enableBackground='new 0 0 256 256'
      className={className}
      onClick={onClick}
    >
      <metadata></metadata>
      <g>
        <g>
          <g>
            <path
              fill={color}
              d='M182.3,139.3c0,3.7-1.4,7.7-5.9,7.7c-4.2,0-5.5-4.3-5.5-7.7c0-3.6,1.2-7.9,5.6-7.9C180.9,131.4,182.3,135.7,182.3,139.3z M70.1,113.2v-3.2h-3.2v3.2H70.1z M66.9,118.2v3.2h3.2v-3.2H66.9z M75.6,131.4c-4.3,0-6,3.3-6.7,7h9.5c0.9,0,2.8,0.3,2.8-1.2C81.1,133.7,79.2,131.4,75.6,131.4z M81.4,101.8h3.2v-3.2h-3.2V101.8z M78.3,108.1v-3.2h-3.2v3.2H78.3z M81.4,104.9v-3.2h-3.1v3.2L81.4,104.9L81.4,104.9z M228.8,133.1c0-0.7-0.5-0.8-1.1-0.8h-1.1v1.6h0.8C228.1,133.9,228.8,133.9,228.8,133.1z M231,134.2c0,2-1.5,3.5-3.4,3.5s-3.5-1.6-3.5-3.5c0-2,1.5-3.5,3.5-3.5C229.5,130.6,231,132.2,231,134.2z M229.6,136.5l-1.4-2.1c0.7-0.1,1.2-0.5,1.2-1.3s-0.5-1.3-1.5-1.3H226v4.7h0.6v-2.1h1l1.3,2.1L229.6,136.5L229.6,136.5z M246,57.6v140.8c0,3.3-2.7,6.1-6.1,6.1H16.1c-3.4,0-6.1-2.7-6.1-6.1V57.6c0-3.3,2.7-6.1,6.1-6.1h223.8C243.3,51.5,246,54.2,246,57.6z M154.9,119.8c0,1.8,1.5,3.1,3.2,3.1c1.6,0,3-1.4,3-3.1c0-1.7-1.3-3.1-3-3.1C156.3,116.7,154.9,118.1,154.9,119.8z M112.9,119.8c0,1.8,1.5,3.1,3.2,3.1c1.6,0,3-1.4,3-3.1c0-1.7-1.3-3.1-3.1-3.1C114.3,116.7,112.9,118.1,112.9,119.8z M61.7,131.9h2.6v-3.2h2.7V125h3.2v-3.6h3.1v-3.2h2.5v-3.9h2.8v-2.7h2.7v-6.8h3.2v-3.1h3.6v-3.2h-3.6v-3.3h3v-3.4H91v3.4h3.4v-3.4H91v-3.4h3.4V85H91v3.4h-3.4v3.4h-6.2v3.4h-3.1v6.6h-3.2v-3h-3.2v3h3.2v3.2h-5.3v2.3h-2.9v2.8h-3.4v5h-3.2v3.2h-2.1v3.2h-2.3c-2.6,3.9-9.2,16.1-11.2,21c-7.2-10-12.7-13.9-17.1-15.3c-2.4-0.7-5.2,1.9-1.3,5.9c9,9.9,11.9,18.1,14.6,24.7c1.4,3.4,7.9,4,9.3,0.5c2.8-7.4,6.8-15.8,11.5-22.6V131.9L61.7,131.9z M86.5,139.4c0-6.2-5.3-9.4-11-9.4c-7.5,0-13,6.5-13,13.7c0,7.4,5.9,12.4,13,12.4c4.3,0,7.5-1.6,10.3-4.9l-1.2-1.2c-1.7,2.3-4.3,4.3-7.2,4.3c-6.2,0-9.1-6.1-9.1-11.6l0.2-2.8h16.5C85.6,140,86.5,140.2,86.5,139.4z M108.5,133.1c0-2.1-2.3-3-4.1-3c-4,0-6.8,2.3-8.4,5.8h-0.1c0.1-2.1-0.2-4.1-0.7-5.8c-2.5,0.6-5.1,1.6-7.8,1.8v1.2c1.8,0,3.3-0.2,3.8,1.8c0.4,1.3,0.3,5.4,0.3,7v7.1c0,3.8,0.3,5.2-4,5.5v1.2c2.3-0.1,4.4-0.2,6.7-0.2c2.2,0,4.4,0.2,6.6,0.2v-1.2c-4.8-0.2-4.4-1.6-4.4-5.8v-5.7c0-2.6,0-5.5,1.3-7.8c0.8-1.4,2.8-2.9,4.5-2.9c2.2,0,1.7,3,4.2,3C107.6,135.1,108.5,134.2,108.5,133.1z M123.2,154.3c-4.6-0.3-3.9-2-4-5.8v-18.5l-9.1,1.8v1.2c1.2-0.1,3.6-0.2,4,1.3c0.2,0.9,0.2,5.3,0.2,6.4v8.2c-0.1,3.8,0.3,5.2-4,5.5v1.2c2.2-0.1,4.5-0.2,6.7-0.2c2.1,0,4.2,0.2,6.2,0.2L123.2,154.3L123.2,154.3z M151.6,145c0-7.5-6.7-10.5-12.7-13c-3.6-1.5-7.6-3.1-7.6-7.6c0-3.7,3.1-6.1,6.7-6.1c5.6,0,8.3,4.3,9.6,9.1h1.3l-0.3-10h-0.7l-1.3,2.2c-2.6-1.8-5.5-2.9-8.7-2.9c-6.3,0-11.4,3.8-11.4,10.4c0,6.6,5.6,9.3,10.8,11.3c4.2,1.7,8.8,3.7,8.8,9c0,4.7-3.8,7.2-8.2,7.2c-6.6,0-9.8-4.9-10.9-10.7h-1.3v11.2h0.6l1.4-2.4c3.1,2.3,6.2,3.4,10.1,3.4C144.6,156.2,151.6,152.5,151.6,145z M159,155.3c2.1,0,4.2,0.2,6.2,0.2v-1.2c-4.6-0.3-3.9-2-4-5.8v-18.5l-9.1,1.8v1.2c1.2-0.1,3.6-0.2,4,1.3c0.2,0.9,0.2,5.3,0.2,6.4v8.2c0,3.8,0.3,5.2-4,5.5v1.2C154.6,155.5,156.8,155.3,159,155.3z M193.1,132.7c0-1.8-1.9-2.5-3.4-2.5c-2.1,0-4,1.2-5.6,2.4c-2-1.8-4.7-2.6-7.3-2.6c-5.6,0-10.8,3.3-10.8,9.4c0,3.7,2.8,6.8,6.1,7.9v0.1c-2.5,0.4-5.1,2.2-5.1,5c0,5.2,5.2,5.1,9.1,5.2c4,0.2,10.3,0,10.3,5.6c0,4.7-4.4,6.4-8.4,6.4c-4,0-9.2-1-9.2-6c0-1.8,1.1-3.7,3-4.1c-0.7-0.6-1.4-1-2.4-1c-2.5,0-4.3,2.4-4.3,4.8c0,6,7.3,7.7,12.1,7.7c6.3,0,13.1-2.4,13.1-9.7c0-7.7-6.2-7.9-12.1-8.4l-3.9-0.2c-1.3-0.1-4.4,0.1-4.4-1.9c0-2.4,4.4-2.4,6.2-2.4c5.9-0.3,11.1-2.3,11.1-9c0-2.1-0.7-4.1-2.1-5.7c0.6-0.5,1.5-1.1,2.4-1.1c1.8,0,2,2,3.7,2C192.3,134.6,193.1,133.8,193.1,132.7z M224.7,154.3c-4.5-0.3-4-2-4-5.8V138c0-5.5-3.1-7.9-8.6-7.9c-4.1,0-7.2,1.7-9.2,5.3h-0.1l-0.7-5.3c-2.8,0.5-5,1.4-7.9,1.8v1.2c1.8,0,3.4-0.2,3.9,1.8c0.3,1.3,0.3,5.3,0.3,7v7.1c0,3.8,0.3,5.2-4,5.5v1.2c2.2-0.1,4.5-0.2,6.7-0.2c2,0,4.2,0.2,6.3,0.2v-1.2c-4.6-0.3-4-2-4-5.8v-8.9c0-4.2,2.9-7.7,7.4-7.7c5.5,0,5.3,5.7,5.3,9.6v7.4c0,3.8,0.3,5.2-4,5.5v1.2c2.3-0.1,4.4-0.2,6.7-0.2c2.1,0,4.2,0.2,6.3,0.2L224.7,154.3L224.7,154.3L224.7,154.3z M231.6,134.2c0-2.3-1.8-4.1-4.1-4.1c-2.3,0-4.1,1.8-4.1,4.1c0,2.3,1.8,4.1,4.1,4.1C229.8,138.3,231.6,136.5,231.6,134.2z'
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </g>
      </g>
    </svg>
  );
};

export default ZVerisignLogoSvg;
