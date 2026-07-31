import React, { useEffect, useRef, useState } from 'react';
import './About.css';

// ============================================
// World map dot data (unchanged — 923 points, normalized 0–1 x/y)
// ============================================
const WORLD_DOTS =
  "0.7917,0.0;0.8056,0.0;0.8889,0.0;0.2222,0.025;0.2778,0.025;0.3056,0.025;0.3194,0.025;0.3333,0.025;0.6667,0.025;0.6806,0.025;0.7917,0.025;0.875,0.025;0.8889,0.025;0.9028,0.025;0.9167,0.025;0.0833,0.05;0.0972,0.05;0.1111,0.05;0.125,0.05;0.2222,0.05;0.3056,0.05;0.3194,0.05;0.3472,0.05;0.3611,0.05;0.375,0.05;0.4028,0.05;0.4167,0.05;0.4306,0.05;0.6944,0.05;0.7083,0.05;0.7917,0.05;0.8056,0.05;0.8194,0.05;0.8333,0.05;0.8472,0.05;0.8611,0.05;0.875,0.05;0.8889,0.05;0.9028,0.05;0.9167,0.05;0.9306,0.05;0.0694,0.075;0.0972,0.075;0.1111,0.075;0.125,0.075;0.1389,0.075;0.1944,0.075;0.2639,0.075;0.2778,0.075;0.3056,0.075;0.3472,0.075;0.3611,0.075;0.375,0.075;0.3889,0.075;0.4028,0.075;0.4167,0.075;0.4306,0.075;0.4444,0.075;0.5139,0.075;0.5278,0.075;0.6806,0.075;0.6944,0.075;0.7083,0.075;0.7222,0.075;0.7361,0.075;0.75,0.075;0.7639,0.075;0.7778,0.075;0.7917,0.075;0.8056,0.075;0.8194,0.075;0.8333,0.075;0.8472,0.075;0.8611,0.075;0.875,0.075;0.8889,0.075;0.9028,0.075;0.0833,0.1;0.0972,0.1;0.1111,0.1;0.125,0.1;0.1389,0.1;0.1528,0.1;0.1667,0.1;0.1806,0.1;0.2222,0.1;0.25,0.1;0.2639,0.1;0.2778,0.1;0.3472,0.1;0.3611,0.1;0.375,0.1;0.3889,0.1;0.4028,0.1;0.4167,0.1;0.4306,0.1;0.6111,0.1;0.6667,0.1;0.6806,0.1;0.6944,0.1;0.7083,0.1;0.7222,0.1;0.7361,0.1;0.75,0.1;0.7639,0.1;0.7778,0.1;0.7917,0.1;0.8056,0.1;0.8194,0.1;0.8333,0.1;0.8472,0.1;0.8611,0.1;0.875,0.1;0.8889,0.1;0.9028,0.1;0.0694,0.125;0.0833,0.125;0.0972,0.125;0.1111,0.125;0.125,0.125;0.1389,0.125;0.1528,0.125;0.1667,0.125;0.1806,0.125;0.1944,0.125;0.2778,0.125;0.2917,0.125;0.3611,0.125;0.375,0.125;0.3889,0.125;0.4028,0.125;0.4167,0.125;0.4306,0.125;0.6528,0.125;0.6667,0.125;0.6806,0.125;0.6944,0.125;0.7083,0.125;0.7222,0.125;0.7361,0.125;0.75,0.125;0.7639,0.125;0.7778,0.125;0.7917,0.125;0.8056,0.125;0.8194,0.125;0.8333,0.125;0.8472,0.125;0.8611,0.125;0.8889,0.125;0.9028,0.125;0.0694,0.15;0.0833,0.15;0.0972,0.15;0.1111,0.15;0.125,0.15;0.1389,0.15;0.1528,0.15;0.1667,0.15;0.1806,0.15;0.1944,0.15;0.2083,0.15;0.2222,0.15;0.2361,0.15;0.25,0.15;0.2639,0.15;0.2778,0.15;0.3056,0.15;0.3611,0.15;0.375,0.15;0.3889,0.15;0.4028,0.15;0.4167,0.15;0.4306,0.15;0.6389,0.15;0.6667,0.15;0.6806,0.15;0.6944,0.15;0.7083,0.15;0.7222,0.15;0.7361,0.15;0.75,0.15;0.7639,0.15;0.7778,0.15;0.7917,0.15;0.8056,0.15;0.8194,0.15;0.8333,0.15;0.8472,0.15;0.8611,0.15;0.8889,0.15;0.0556,0.175;0.0694,0.175;0.125,0.175;0.1389,0.175;0.1528,0.175;0.1667,0.175;0.1806,0.175;0.1944,0.175;0.2083,0.175;0.2222,0.175;0.2361,0.175;0.25,0.175;0.3056,0.175;0.3611,0.175;0.375,0.175;0.3889,0.175;0.4028,0.175;0.4167,0.175;0.5139,0.175;0.5278,0.175;0.5556,0.175;0.5972,0.175;0.6111,0.175;0.625,0.175;0.6528,0.175;0.6667,0.175;0.6806,0.175;0.6944,0.175;0.7083,0.175;0.7222,0.175;0.7361,0.175;0.75,0.175;0.7639,0.175;0.7778,0.175;0.7917,0.175;0.8056,0.175;0.8194,0.175;0.8333,0.175;0.8889,0.175;0.1389,0.2;0.1528,0.2;0.1667,0.2;0.1806,0.2;0.1944,0.2;0.2083,0.2;0.2222,0.2;0.2361,0.2;0.3056,0.2;0.3611,0.2;0.375,0.2;0.3889,0.2;0.5139,0.2;0.5278,0.2;0.5417,0.2;0.5694,0.2;0.5833,0.2;0.5972,0.2;0.6111,0.2;0.625,0.2;0.6389,0.2;0.6528,0.2;0.6667,0.2;0.6806,0.2;0.6944,0.2;0.7083,0.2;0.7222,0.2;0.7361,0.2;0.75,0.2;0.7639,0.2;0.7778,0.2;0.7917,0.2;0.8056,0.2;0.8194,0.2;0.8333,0.2;0.8889,0.2;0.1389,0.225;0.1528,0.225;0.1667,0.225;0.1806,0.225;0.1944,0.225;0.2083,0.225;0.2222,0.225;0.2778,0.225;0.2917,0.225;0.3611,0.225;0.4306,0.225;0.5,0.225;0.5139,0.225;0.5278,0.225;0.5417,0.225;0.5556,0.225;0.5694,0.225;0.5833,0.225;0.5972,0.225;0.6111,0.225;0.625,0.225;0.6389,0.225;0.6528,0.225;0.6667,0.225;0.6806,0.225;0.6944,0.225;0.7083,0.225;0.7222,0.225;0.7361,0.225;0.75,0.225;0.7639,0.225;0.7778,0.225;0.7917,0.225;0.8056,0.225;0.8194,0.225;0.8333,0.225;0.1389,0.25;0.1528,0.25;0.1667,0.25;0.1806,0.25;0.1944,0.25;0.2083,0.25;0.2222,0.25;0.2361,0.25;0.2778,0.25;0.2917,0.25;0.3056,0.25;0.5,0.25;0.5139,0.25;0.5556,0.25;0.5694,0.25;0.5833,0.25;0.5972,0.25;0.6111,0.25;0.625,0.25;0.6389,0.25;0.6528,0.25;0.6667,0.25;0.6806,0.25;0.6944,0.25;0.7083,0.25;0.7222,0.25;0.7361,0.25;0.75,0.25;0.7639,0.25;0.7778,0.25;0.7917,0.25;0.8056,0.25;0.8194,0.25;0.8333,0.25;0.8472,0.25;0.1389,0.275;0.1528,0.275;0.1667,0.275;0.1806,0.275;0.1944,0.275;0.2083,0.275;0.2222,0.275;0.2361,0.275;0.25,0.275;0.2639,0.275;0.2778,0.275;0.2917,0.275;0.3056,0.275;0.4583,0.275;0.5,0.275;0.5139,0.275;0.5278,0.275;0.5417,0.275;0.5556,0.275;0.5694,0.275;0.5833,0.275;0.5972,0.275;0.6111,0.275;0.625,0.275;0.6389,0.275;0.6528,0.275;0.6667,0.275;0.6806,0.275;0.6944,0.275;0.7083,0.275;0.7222,0.275;0.7361,0.275;0.75,0.275;0.7639,0.275;0.7778,0.275;0.7917,0.275;0.8056,0.275;0.8194,0.275;0.8333,0.275;0.8472,0.275;0.1389,0.3;0.1528,0.3;0.1667,0.3;0.1806,0.3;0.1944,0.3;0.2222,0.3;0.2361,0.3;0.25,0.3;0.2639,0.3;0.2778,0.3;0.2917,0.3;0.3056,0.3;0.3194,0.3;0.4722,0.3;0.5,0.3;0.5139,0.3;0.5278,0.3;0.5417,0.3;0.5556,0.3;0.5694,0.3;0.5833,0.3;0.5972,0.3;0.6111,0.3;0.625,0.3;0.6389,0.3;0.6528,0.3;0.6667,0.3;0.6806,0.3;0.6944,0.3;0.7083,0.3;0.7222,0.3;0.7361,0.3;0.75,0.3;0.7639,0.3;0.7778,0.3;0.7917,0.3;0.8056,0.3;0.8194,0.3;0.8333,0.3;0.8472,0.3;0.875,0.3;0.125,0.325;0.1389,0.325;0.1528,0.325;0.1667,0.325;0.1806,0.325;0.1944,0.325;0.2083,0.325;0.2222,0.325;0.2361,0.325;0.25,0.325;0.2639,0.325;0.2778,0.325;0.2917,0.325;0.3194,0.325;0.4583,0.325;0.4861,0.325;0.5,0.325;0.5139,0.325;0.5278,0.325;0.5417,0.325;0.5556,0.325;0.5694,0.325;0.5833,0.325;0.5972,0.325;0.6111,0.325;0.625,0.325;0.6389,0.325;0.6528,0.325;0.6667,0.325;0.6806,0.325;0.6944,0.325;0.7083,0.325;0.7222,0.325;0.7361,0.325;0.75,0.325;0.7639,0.325;0.7778,0.325;0.7917,0.325;0.8056,0.325;0.8194,0.325;0.8333,0.325;0.875,0.325;0.125,0.35;0.1389,0.35;0.1528,0.35;0.1667,0.35;0.1806,0.35;0.1944,0.35;0.2083,0.35;0.2222,0.35;0.2361,0.35;0.25,0.35;0.2639,0.35;0.2778,0.35;0.2917,0.35;0.4722,0.35;0.4861,0.35;0.5139,0.35;0.5278,0.35;0.5417,0.35;0.5556,0.35;0.5694,0.35;0.5833,0.35;0.5972,0.35;0.625,0.35;0.6389,0.35;0.6528,0.35;0.6667,0.35;0.6806,0.35;0.6944,0.35;0.7083,0.35;0.7222,0.35;0.7361,0.35;0.75,0.35;0.7639,0.35;0.7778,0.35;0.7917,0.35;0.8056,0.35;0.8333,0.35;0.125,0.375;0.1389,0.375;0.1528,0.375;0.1667,0.375;0.1806,0.375;0.1944,0.375;0.2083,0.375;0.2222,0.375;0.2361,0.375;0.25,0.375;0.4583,0.375;0.4722,0.375;0.5139,0.375;0.5278,0.375;0.5417,0.375;0.5972,0.375;0.6111,0.375;0.6389,0.375;0.6528,0.375;0.6667,0.375;0.6806,0.375;0.6944,0.375;0.7083,0.375;0.7222,0.375;0.7361,0.375;0.75,0.375;0.7639,0.375;0.7778,0.375;0.7917,0.375;0.8056,0.375;0.8194,0.375;0.8472,0.375;0.875,0.375;0.125,0.4;0.1389,0.4;0.1528,0.4;0.1667,0.4;0.1806,0.4;0.1944,0.4;0.2083,0.4;0.2222,0.4;0.2361,0.4;0.25,0.4;0.4583,0.4;0.4722,0.4;0.5417,0.4;0.5556,0.4;0.5694,0.4;0.5833,0.4;0.5972,0.4;0.6111,0.4;0.6389,0.4;0.6528,0.4;0.6667,0.4;0.6806,0.4;0.6944,0.4;0.7083,0.4;0.7222,0.4;0.7361,0.4;0.75,0.4;0.7639,0.4;0.7778,0.4;0.7917,0.4;0.8056,0.4;0.8194,0.4;0.8611,0.4;0.1389,0.425;0.1528,0.425;0.1667,0.425;0.1806,0.425;0.1944,0.425;0.2083,0.425;0.2222,0.425;0.4583,0.425;0.4722,0.425;0.4861,0.425;0.5,0.425;0.5833,0.425;0.5972,0.425;0.6111,0.425;0.625,0.425;0.6389,0.425;0.6528,0.425;0.6667,0.425;0.6806,0.425;0.6944,0.425;0.7083,0.425;0.7222,0.425;0.7361,0.425;0.75,0.425;0.7639,0.425;0.7778,0.425;0.7917,0.425;0.8056,0.425;0.8194,0.425;0.8333,0.425;0.1528,0.45;0.1667,0.45;0.1806,0.45;0.4444,0.45;0.4583,0.45;0.4722,0.45;0.4861,0.45;0.5,0.45;0.5139,0.45;0.5278,0.45;0.5417,0.45;0.5556,0.45;0.5972,0.45;0.6111,0.45;0.625,0.45;0.6389,0.45;0.6528,0.45;0.6667,0.45;0.6806,0.45;0.6944,0.45;0.7083,0.45;0.7222,0.45;0.75,0.45;0.7639,0.45;0.7778,0.45;0.7917,0.45;0.8056,0.45;0.8194,0.45;0.1528,0.475;0.1667,0.475;0.4306,0.475;0.4444,0.475;0.4583,0.475;0.4722,0.475;0.4861,0.475;0.5,0.475;0.5139,0.475;0.5278,0.475;0.5417,0.475;0.5556,0.475;0.5694,0.475;0.5833,0.475;0.5972,0.475;0.6111,0.475;0.6389,0.475;0.6806,0.475;0.6944,0.475;0.7083,0.475;0.7222,0.475;0.7361,0.475;0.7639,0.475;0.7778,0.475;0.7917,0.475;0.8056,0.475;0.1667,0.5;0.1944,0.5;0.2361,0.5;0.4306,0.5;0.4444,0.5;0.4583,0.5;0.4861,0.5;0.5,0.5;0.5139,0.5;0.5278,0.5;0.5417,0.5;0.5556,0.5;0.5694,0.5;0.5833,0.5;0.5972,0.5;0.6111,0.5;0.625,0.5;0.6389,0.5;0.7083,0.5;0.7222,0.5;0.7639,0.5;0.7778,0.5;0.8472,0.5;0.1944,0.525;0.4306,0.525;0.4444,0.525;0.4583,0.525;0.4722,0.525;0.4861,0.525;0.5,0.525;0.5139,0.525;0.5278,0.525;0.5417,0.525;0.5556,0.525;0.5694,0.525;0.5833,0.525;0.6111,0.525;0.625,0.525;0.7083,0.525;0.7778,0.525;0.7917,0.525;0.8056,0.525;0.8472,0.525;0.2083,0.55;0.25,0.55;0.4306,0.55;0.4444,0.55;0.4722,0.55;0.4861,0.55;0.5,0.55;0.5139,0.55;0.5278,0.55;0.5417,0.55;0.5556,0.55;0.5694,0.55;0.5972,0.55;0.7083,0.55;0.7778,0.55;0.7917,0.55;0.8056,0.55;0.2222,0.575;0.2361,0.575;0.25,0.575;0.2639,0.575;0.2778,0.575;0.4306,0.575;0.4444,0.575;0.4583,0.575;0.4722,0.575;0.4861,0.575;0.5,0.575;0.5139,0.575;0.5278,0.575;0.5417,0.575;0.5556,0.575;0.5694,0.575;0.5833,0.575;0.5972,0.575;0.6111,0.575;0.625,0.575;0.8611,0.575;0.2361,0.6;0.25,0.6;0.2639,0.6;0.2778,0.6;0.2917,0.6;0.3056,0.6;0.5,0.6;0.5139,0.6;0.5278,0.6;0.5417,0.6;0.5556,0.6;0.5694,0.6;0.5833,0.6;0.6111,0.6;0.7778,0.6;0.7917,0.6;0.2222,0.625;0.2361,0.625;0.25,0.625;0.2639,0.625;0.2778,0.625;0.2917,0.625;0.3056,0.625;0.3194,0.625;0.5,0.625;0.5139,0.625;0.5278,0.625;0.5417,0.625;0.5556,0.625;0.5694,0.625;0.5833,0.625;0.5972,0.625;0.7917,0.625;0.8194,0.625;0.8333,0.625;0.8472,0.625;0.8889,0.625;0.2222,0.65;0.2361,0.65;0.25,0.65;0.2639,0.65;0.2778,0.65;0.2917,0.65;0.3056,0.65;0.3194,0.65;0.3333,0.65;0.3472,0.65;0.3611,0.65;0.5139,0.65;0.5278,0.65;0.5417,0.65;0.5556,0.65;0.5694,0.65;0.5833,0.65;0.8472,0.65;0.9028,0.65;0.9167,0.65;0.2361,0.675;0.25,0.675;0.2639,0.675;0.2778,0.675;0.2917,0.675;0.3056,0.675;0.3194,0.675;0.3333,0.675;0.3472,0.675;0.3611,0.675;0.5278,0.675;0.5417,0.675;0.5556,0.675;0.5694,0.675;0.5833,0.675;0.5972,0.675;0.8333,0.675;0.8472,0.675;0.9167,0.675;0.9306,0.675;0.2361,0.7;0.25,0.7;0.2639,0.7;0.2778,0.7;0.2917,0.7;0.3056,0.7;0.3194,0.7;0.3333,0.7;0.3472,0.7;0.5139,0.7;0.5278,0.7;0.5417,0.7;0.5556,0.7;0.5694,0.7;0.5833,0.7;0.5972,0.7;0.625,0.7;0.9722,0.7;0.2639,0.725;0.2778,0.725;0.2917,0.725;0.3056,0.725;0.3194,0.725;0.3333,0.725;0.3472,0.725;0.5139,0.725;0.5278,0.725;0.5417,0.725;0.5556,0.725;0.5694,0.725;0.5833,0.725;0.6111,0.725;0.625,0.725;0.8611,0.725;0.875,0.725;0.8889,0.725;0.9167,0.725;0.2639,0.75;0.2778,0.75;0.2917,0.75;0.3056,0.75;0.3194,0.75;0.3333,0.75;0.3472,0.75;0.5278,0.75;0.5417,0.75;0.5556,0.75;0.5694,0.75;0.6111,0.75;0.8472,0.75;0.8611,0.75;0.875,0.75;0.8889,0.75;0.9028,0.75;0.9167,0.75;0.2639,0.775;0.2778,0.775;0.2917,0.775;0.3056,0.775;0.3194,0.775;0.5278,0.775;0.5417,0.775;0.5556,0.775;0.5694,0.775;0.8194,0.775;0.8333,0.775;0.8472,0.775;0.8611,0.775;0.875,0.775;0.8889,0.775;0.9028,0.775;0.9167,0.775;0.2639,0.8;0.2778,0.8;0.2917,0.8;0.3056,0.8;0.3194,0.8;0.5417,0.8;0.5556,0.8;0.8194,0.8;0.8333,0.8;0.8472,0.8;0.8611,0.8;0.875,0.8;0.8889,0.8;0.9028,0.8;0.9167,0.8;0.9306,0.8;0.2639,0.825;0.2778,0.825;0.2917,0.825;0.8194,0.825;0.8333,0.825;0.8472,0.825;0.8611,0.825;0.875,0.825;0.8889,0.825;0.9028,0.825;0.9167,0.825;0.9306,0.825;0.2639,0.85;0.2778,0.85;0.2917,0.85;0.8194,0.85;0.875,0.85;0.8889,0.85;0.9028,0.85;0.9167,0.85;0.2639,0.875;0.2778,0.875;0.8889,0.875;0.9028,0.875;0.2778,0.9;0.2778,0.925;0.8889,0.925;0.9861,0.925;0.2778,0.95;0.9444,0.975";

// Hub cities: New York, London, Dubai, Mumbai, Singapore, Sydney
const HUBS = [
  { x: 0.19, y: 0.34 },
  { x: 0.47, y: 0.24 },
  { x: 0.58, y: 0.42 },
  { x: 0.63, y: 0.47 },
  { x: 0.73, y: 0.53 },
  { x: 0.85, y: 0.73 },
];

const About = () => {
  const visualRef = useRef(null);

  useEffect(() => {
    const NS = "http://www.w3.org/2000/svg";
    const container = visualRef.current;
    if (!container) return;

    container.innerHTML = '';

    const W = 800, H = 500;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    function el(tag, attrs) {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    const defs = el('defs', {});
    defs.innerHTML = `
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#6f90d9" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#6f90d9" stop-opacity="0"/>
      </radialGradient>
    `;
    svg.appendChild(defs);

    let seed = 42;
    function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    const dotsGroup = el('g', { opacity: '1' });
    const dotPairs = WORLD_DOTS.split(';');
    dotPairs.forEach((pair, i) => {
      const [xf, yf] = pair.split(',').map(Number);
      const x = xf * W;
      const y = yf * H;
      const dot = el('circle', { cx: x, cy: y, r: 1.7, fill: '#5878b0' });
      if (i % 6 === 0) {
        const dur = (5 + rand() * 4).toFixed(2) + 's';
        const delay = (rand() * 6).toFixed(2) + 's';
        dot.setAttribute('opacity', '0.4');
        dot.innerHTML = `<animate attributeName="opacity" values="0.35;0.9;0.35" dur="${dur}" begin="${delay}" repeatCount="indefinite"/>`;
      } else {
        dot.setAttribute('opacity', '0.38');
      }
      dotsGroup.appendChild(dot);
    });
    svg.appendChild(dotsGroup);

    const hubs = HUBS.map(h => ({ x: h.x * W, y: h.y * H }));
    const hubGroup = el('g', {});
    hubs.forEach((h, i) => {
      const halo = el('circle', { cx: h.x, cy: h.y, r: 12, fill: 'url(#glow)' });
      const dur = (7 + i * 0.6).toFixed(2) + 's';
      halo.innerHTML = `<animate attributeName="r" values="7;15;7" dur="${dur}" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;1;0.5" dur="${dur}" repeatCount="indefinite"/>`;
      hubGroup.appendChild(halo);
      const core = el('circle', { cx: h.x, cy: h.y, r: 2.6, fill: '#cfe0ff' });
      hubGroup.appendChild(core);
    });
    svg.appendChild(hubGroup);

    const arcGroup = el('g', { fill: 'none' });
    const pairs = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 3], [0, 4]];
    pairs.forEach((p, i) => {
      const a = hubs[p[0]], b = hubs[p[1]];
      const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - 55 - rand() * 25;
      const pathD = `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
      const path = el('path', { d: pathD, stroke: 'rgba(130,165,230,0.4)', 'stroke-width': 1 });
      arcGroup.appendChild(path);
      const dur = (8 + i * 1.3).toFixed(2) + 's';
      const dot = el('circle', { r: 2.4, fill: '#a9caff' });
      const anim = el('animateMotion', { dur: dur, repeatCount: 'indefinite', path: pathD, rotate: 'auto' });
      const animOpacity = el('animate', { attributeName: 'opacity', values: '0;1;1;0', dur: dur, repeatCount: 'indefinite' });
      dot.appendChild(anim);
      dot.appendChild(animOpacity);
      arcGroup.appendChild(dot);
    });
    svg.appendChild(arcGroup);

    container.appendChild(svg);
  }, []);

  const companies = [
    { name: "Google",      domain: "google.com" },
    { name: "Microsoft",   domain: "microsoft.com" },
    { name: "Amazon",      domain: "amazon.com" },
    { name: "Apple",       domain: "apple.com" },
    { name: "Meta",        domain: "meta.com" },
    { name: "Tesla",       domain: "tesla.com" },
    { name: "Netflix",     domain: "netflix.com" },
    { name: "Adobe",       domain: "adobe.com" },
    { name: "Salesforce",  domain: "salesforce.com" },
    { name: "IBM",         domain: "ibm.com" },
    { name: "Oracle",      domain: "oracle.com" },
    { name: "SAP",         domain: "sap.com" },
    { name: "Intel",       domain: "intel.com" },
    { name: "Cisco",       domain: "cisco.com" },
    { name: "Dell",        domain: "dell.com" },
    { name: "HP",          domain: "hp.com" },
    { name: "Accenture",   domain: "accenture.com" },
    { name: "Deloitte",    domain: "deloitte.com" },
  ];

  const team = [
    { name: "Aarav Shah",   role: "Founder & CEO",       img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/aarav-shah" },
    { name: "Kabir Mehta",  role: "Lead Developer",      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/kabir-mehta" },
    { name: "Riya Nair",    role: "Creative Director",   img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/riya-nair" },
    { name: "Devika Rao",   role: "UI/UX Designer",      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/devika-rao" },
    { name: "Arjun Verma",  role: "Product Manager",     img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/arjun-verma" },
    { name: "Sara Iyer",    role: "Marketing Head",      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80", linkedin: "https://linkedin.com/in/sara-iyer" },
  ];

  const COLUMN_COUNT = 5;
  const CARDS_PER_COLUMN = 5;
  const teamColumns = Array.from({ length: COLUMN_COUNT }, (_, colIndex) =>
    Array.from({ length: CARDS_PER_COLUMN }, (_, cardIndex) =>
      team[(colIndex * 2 + cardIndex) % team.length]
    )
  );

  const industries = [
    { name: "Finance", icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
    { name: "Energy", icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /> },
    { name: "Information Technology", icon: <><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></> },
    { name: "Education", icon: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></> },
    { name: "Supply Chain", icon: <><rect x="1" y="7" width="15" height="10" rx="1" /><path d="M16 10h4l3 3v4h-7z" /><circle cx="5.5" cy="18.5" r="1.5" /><circle cx="18.5" cy="18.5" r="1.5" /></> },
    { name: "Travel", icon: <path d="M22 2 2 9l7 3 3 7 4-9 6-8z" /> },
    { name: "E-Commerce", icon: <><circle cx="9" cy="21" r="1.4" /><circle cx="19" cy="21" r="1.4" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></> },
    { name: "Healthcare", icon: <path d="M20 8h-3V5a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3h3a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" /> },
    { name: "Telecom", icon: <><path d="M4 12a8 8 0 0 1 16 0" /><path d="M7.5 12a4.5 4.5 0 0 1 9 0" /><circle cx="12" cy="12" r="1.5" /><path d="M12 13.5V21" /></> },
    { name: "Food Science", icon: <><path d="M3 2v7a4 4 0 0 0 4 4v9" /><path d="M7 2v7M11 2v7" /><path d="M18 2c-2 2-2 6-2 8a2 2 0 0 0 4 0V2z" /></> },
    { name: "Pharma", icon: <><rect x="3" y="9" width="18" height="10" rx="5" transform="rotate(-40 12 14)" /><path d="M8.5 15.5 14 10" /></> },
    { name: "Industrial", icon: <><path d="M2 21V10l6 4v-4l6 4V7l6 4v10z" /><path d="M2 21h20" /></> },
  ];

  const industryRows = [
    industries.slice(0, 5),
    industries.slice(4, 9),
    [...industries.slice(9), ...industries.slice(0, 3)],
  ];

  return (
    <div id="about">

      {/* ===== HERO ===== */}
      <section className="about-hero">
        <div className="about-wrap">
          <div className="about-hero-grid">

            <div>
              <span className="about-eyebrow">ABOUT ZARVION TECHNOLOGIES</span>
              <h1 className="about-h1">Empowering Careers.<br/>Connecting <span className="about-accent">Futures.</span></h1>
              <p className="about-lede">At Zarvion Technologies, we bridge the gap between exceptional talent and world-class opportunities. We help professionals upgrade their skills, build strong profiles, and land their dream roles in top companies across the globe.</p>

              <div className="about-feature-row">
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M17 3.13a4 4 0 0 1 0 7.75M22 21v-2a4 4 0 0 0-3-3.87"/></svg></div>
                  <h4>Expert Guidance</h4>
                  <p>Industry experts with proven experience</p>
                </div>
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></svg></div>
                  <h4>Personalized Support</h4>
                  <p>Tailored solutions for every career stage</p>
                </div>
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg></div>
                  <h4>Top Tier Global Opportunities</h4>
                  <p>Connecting talent with global employers</p>
                </div>
              </div>

              <div className="about-hero-actions">
                <a className="about-btn-primary" href="#">Know More About Us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </div>
            </div>

            <div className="about-hero-visual" ref={visualRef} aria-hidden="true"></div>

          </div>
        </div>
      </section>

      {/* ===== OUR TEAM ===== */}
      <section className="about-team-section">
        <div className="about-wrap">
          <div className="about-team-head">
            <span className="about-eyebrow">OUR TEAM</span>
            <div className="about-team-titlerow">
              <h2 className="about-team-h2">The Vision That Powers <span className="about-accent">Zarvion.</span></h2>
              <span className="about-team-num">04</span>
            </div>
          </div>
        </div>

        <div className="about-team-columns">
          {teamColumns.map((col, colIndex) => (
            <div
              className={`about-team-col ${colIndex % 2 === 0 ? 'is-up' : 'is-down'}`}
              key={colIndex}
            >
              <div
                className="about-team-col-track"
                style={{ animationDuration: `${26 + colIndex * 4}s` }}
              >
                {[...col, ...col].map((member, i) => (
                  <div className="about-team-cell" key={i}>
                    <img src={member.img} alt={member.name} loading="lazy" />
                    <div className="about-team-cell-info">
                      <h5>{member.name}</h5>
                      <span>{member.role}</span>
                      <a
                        className="about-team-linkedin"
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMPANY LOGO CAROUSEL ===== */}
      <div className="about-carousel-section">
        <div className="about-carousel-title">Trusted by <span>industry leaders</span> worldwide</div>
        <div className="about-carousel-wrapper">
          <div className="about-carousel-track">
            {companies.map((c, i) => (
              <CompanyLogo key={`set1-${i}`} company={c} />
            ))}
            {companies.map((c, i) => (
              <CompanyLogo key={`set2-${i}`} company={c} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="about-industries-section">
        <div className="about-wrap">
          <div className="about-team-head">
            <span className="about-eyebrow">WHAT WE COVER</span>
            <div className="about-team-titlerow">
              <h2 className="about-team-h2">Industries we <span className="about-accent">serve.</span></h2>
            </div>
          </div>
        </div>

        <div className="about-industries-rows">
          {industryRows.map((row, rowIndex) => (
            <div
              className={`about-industries-row ${rowIndex % 2 === 0 ? 'is-left' : 'is-right'}`}
              key={rowIndex}
            >
              <div
                className="about-industries-track"
                style={{ animationDuration: `${30 + rowIndex * 6}s` }}
              >
                {[...row, ...row, ...row].map((ind, i) => (
                  <div className="about-industry-pill" key={i}>
                    <span className="about-industry-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {ind.icon}
                      </svg>
                    </span>
                    <span className="about-industry-name">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

const CompanyLogo = ({ company }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="about-carousel-item">
      {!failed ? (
        <img
          className="about-logo-img"
          src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`}
          alt={company.name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="about-logo-fallback">
          <span className="about-logo-fallback-letter">{company.name.charAt(0)}</span>
        </span>
      )}
      <span className="about-logo-name">{company.name}</span>
    </div>
  );
};

export default About;