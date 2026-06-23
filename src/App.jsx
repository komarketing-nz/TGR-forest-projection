import React, { useState } from 'react';
import { ChevronRight, MapPin, Calendar, Heart, ArrowLeft, Wind } from 'lucide-react';

export default function ForestProjection() {
  const [step, setStep] = useState('intro');
  const [userName, setUserName] = useState('');
  const [framing, setFraming] = useState(null);

  // Milestone inputs
  const [lovedOneName, setLovedOneName] = useState('');
  const [lovedOneCurrentAge, setLovedOneCurrentAge] = useState('');
  const [milestoneAge, setMilestoneAge] = useState(50);

  // Future year input
  const [futureYear, setFutureYear] = useState(2326);

  // Lifespan input
  const [userCurrentAge, setUserCurrentAge] = useState('');

  const [projection, setProjection] = useState(null);

  const CURRENT_YEAR = 2026;

  // ===== Sequoia growth & carbon data =====
  // Source: TGR Sequoia Carbon Code Forecast Model (2024)
  // 500 years of measured/projected per-tree data: age, height (m),
  // diameter (m), per-tree CO2 capture (tonnes - includes AGB + roots).
  // Height plateaus at ~62.94m from year 144 onwards (species ceiling for
  // the model's well-managed Welsh growth assumptions).
  // Tuple format: [age, height_m, diameter_m, co2_tonnes]
  const GROWTH_DATA = [
  [1,0.301,0.02,0.001],
  [2,0.742,0.0404,0.007],
  [3,1.181,0.0608,0.017],
  [4,1.621,0.0812,0.034],
  [5,2.062,0.1016,0.057],
  [6,2.502,0.122,0.087],
  [7,2.942,0.1424,0.124],
  [8,3.381,0.1628,0.168],
  [9,3.821,0.1832,0.219],
  [10,4.261,0.2036,0.279],
  [11,4.702,0.224,0.347],
  [12,5.142,0.2444,0.422],
  [13,5.582,0.2648,0.507],
  [14,6.022,0.2852,0.599],
  [15,6.462,0.3056,0.701],
  [16,6.902,0.326,0.811],
  [17,7.342,0.3464,0.931],
  [18,7.782,0.3668,1.059],
  [19,8.222,0.3872,1.197],
  [20,8.662,0.4076,1.345],
  [21,9.102,0.428,1.502],
  [22,9.542,0.4484,1.669],
  [23,9.982,0.4688,1.845],
  [24,10.421,0.4892,2.032],
  [25,10.861,0.5096,2.228],
  [26,11.301,0.53,2.435],
  [27,11.741,0.5504,2.651],
  [28,12.181,0.5708,2.878],
  [29,12.621,0.5912,3.116],
  [30,13.061,0.6116,3.364],
  [31,13.501,0.632,3.623],
  [32,13.941,0.6524,3.892],
  [33,14.381,0.6728,4.172],
  [34,14.821,0.6932,4.463],
  [35,15.261,0.7136,4.765],
  [36,15.701,0.734,5.078],
  [37,16.141,0.7544,5.402],
  [38,16.581,0.7748,5.737],
  [39,17.021,0.7952,6.083],
  [40,17.461,0.8156,6.441],
  [41,17.901,0.836,6.81],
  [42,18.341,0.8564,7.19],
  [43,18.782,0.8768,7.582],
  [44,19.222,0.8972,7.986],
  [45,19.662,0.9176,8.401],
  [46,20.102,0.938,8.828],
  [47,20.542,0.9584,9.267],
  [48,20.982,0.9788,9.718],
  [49,21.422,0.9992,10.181],
  [50,21.862,1.0196,10.655],
  [51,22.302,1.04,11.142],
  [52,22.742,1.0604,11.641],
  [53,23.182,1.0808,12.151],
  [54,23.622,1.1012,12.675],
  [55,24.062,1.1216,13.21],
  [56,24.502,1.142,13.758],
  [57,24.942,1.1624,14.318],
  [58,25.382,1.1828,14.891],
  [59,25.822,1.2032,15.476],
  [60,26.262,1.2236,16.073],
  [61,26.702,1.244,16.684],
  [62,27.142,1.2644,17.306],
  [63,27.582,1.2848,17.942],
  [64,28.022,1.3052,18.59],
  [65,28.462,1.3256,19.252],
  [66,28.902,1.346,19.926],
  [67,29.342,1.3664,20.613],
  [68,29.782,1.3868,21.313],
  [69,30.222,1.4072,22.026],
  [70,30.662,1.4276,22.752],
  [71,31.102,1.448,23.491],
  [72,31.542,1.4684,24.243],
  [73,31.982,1.4888,25.008],
  [74,32.422,1.5092,25.787],
  [75,32.862,1.5296,26.579],
  [76,33.302,1.55,27.384],
  [77,33.742,1.5704,28.203],
  [78,34.182,1.5908,29.035],
  [79,34.622,1.6112,29.881],
  [80,35.062,1.6316,30.74],
  [81,35.502,1.652,31.612],
  [82,35.942,1.6724,32.498],
  [83,36.382,1.6928,33.398],
  [84,36.822,1.7132,34.312],
  [85,37.262,1.7336,35.239],
  [86,37.702,1.754,36.18],
  [87,38.142,1.7744,37.135],
  [88,38.582,1.7948,38.103],
  [89,39.022,1.8152,39.086],
  [90,39.462,1.8356,40.082],
  [91,39.901,1.856,41.093],
  [92,40.341,1.8764,42.117],
  [93,40.781,1.8968,43.155],
  [94,41.221,1.9172,44.208],
  [95,41.661,1.9376,45.274],
  [96,42.101,1.958,46.355],
  [97,42.541,1.9784,47.45],
  [98,42.981,1.9988,48.559],
  [99,43.421,2.0192,49.682],
  [100,43.861,2.0396,50.82],
  [101,44.301,2.06,51.972],
  [102,44.741,2.0804,53.138],
  [103,45.181,2.1008,54.319],
  [104,45.621,2.1212,55.514],
  [105,46.061,2.1416,56.724],
  [106,46.501,2.162,57.948],
  [107,46.941,2.1824,59.187],
  [108,47.381,2.2028,60.44],
  [109,47.821,2.2232,61.708],
  [110,48.261,2.2436,62.99],
  [111,48.701,2.264,64.288],
  [112,49.141,2.2844,65.599],
  [113,49.581,2.3048,66.926],
  [114,50.021,2.3252,68.267],
  [115,50.461,2.3456,69.624],
  [116,50.901,2.366,70.995],
  [117,51.341,2.3864,72.381],
  [118,51.781,2.4068,73.781],
  [119,52.221,2.4272,75.197],
  [120,52.661,2.4476,76.628],
  [121,53.101,2.468,78.073],
  [122,53.541,2.4884,79.534],
  [123,53.981,2.5088,81.01],
  [124,54.421,2.5292,82.501],
  [125,54.861,2.5496,84.007],
  [126,55.301,2.57,85.528],
  [127,55.741,2.5904,87.064],
  [128,56.181,2.6108,88.616],
  [129,56.621,2.6312,90.183],
  [130,57.061,2.6516,91.765],
  [131,57.501,2.672,93.362],
  [132,57.941,2.6924,94.975],
  [133,58.381,2.7128,96.603],
  [134,58.821,2.7332,98.246],
  [135,59.261,2.7536,99.905],
  [136,59.701,2.774,101.579],
  [137,60.141,2.7944,103.269],
  [138,60.581,2.8148,104.974],
  [139,61.021,2.8352,106.695],
  [140,61.461,2.8556,108.431],
  [141,61.901,2.876,110.183],
  [142,62.341,2.8964,111.951],
  [143,62.781,2.9168,113.734],
  [144,62.94,2.9372,114.542],
  [145,62.94,2.9576,116.348],
  [146,62.94,2.978,116.937],
  [147,62.94,2.9984,118.764],
  [148,62.94,3.0188,119.349],
  [149,62.94,3.0392,121.196],
  [150,62.94,3.0596,121.776],
  [151,62.94,3.08,123.645],
  [152,62.94,3.1004,124.22],
  [153,62.94,3.1208,126.11],
  [154,62.94,3.1412,126.68],
  [155,62.94,3.1616,128.591],
  [156,62.94,3.182,129.156],
  [157,62.94,3.2024,131.088],
  [158,62.94,3.2228,131.648],
  [159,62.94,3.2432,133.602],
  [160,62.94,3.2636,134.156],
  [161,62.94,3.284,136.131],
  [162,62.94,3.3044,136.68],
  [163,62.94,3.3248,138.675],
  [164,62.94,3.3452,139.219],
  [165,62.94,3.3656,141.236],
  [166,62.94,3.386,141.774],
  [167,62.94,3.4064,143.812],
  [168,62.94,3.4268,144.344],
  [169,62.94,3.4472,146.403],
  [170,62.94,3.4676,146.93],
  [171,62.94,3.488,149.01],
  [172,62.94,3.5084,149.53],
  [173,62.94,3.5288,151.632],
  [174,62.94,3.5492,152.146],
  [175,62.94,3.5696,154.27],
  [176,62.94,3.59,154.777],
  [177,62.94,3.6104,156.922],
  [178,62.94,3.6308,157.423],
  [179,62.94,3.6512,159.589],
  [180,62.94,3.6716,160.084],
  [181,62.94,3.692,162.272],
  [182,62.94,3.7124,162.76],
  [183,62.94,3.7328,164.969],
  [184,62.94,3.7532,165.451],
  [185,62.94,3.7736,167.681],
  [186,62.94,3.794,168.156],
  [187,62.94,3.8144,170.408],
  [188,62.94,3.8348,170.876],
  [189,62.94,3.8552,173.149],
  [190,62.94,3.8756,173.61],
  [191,62.94,3.896,175.905],
  [192,62.94,3.9164,176.358],
  [193,62.94,3.9368,178.676],
  [194,62.94,3.9572,179.122],
  [195,62.94,3.9776,181.461],
  [196,62.94,3.998,181.899],
  [197,62.94,4.0184,184.26],
  [198,62.94,4.0388,184.69],
  [199,62.94,4.0592,187.073],
  [200,62.94,4.0796,187.496],
  [201,62.94,4.1,189.901],
  [202,62.94,4.1204,190.316],
  [203,62.94,4.1408,192.742],
  [204,62.94,4.1612,193.15],
  [205,62.94,4.1816,195.598],
  [206,62.94,4.202,195.997],
  [207,62.94,4.2224,198.468],
  [208,62.94,4.2428,198.859],
  [209,62.94,4.2632,201.351],
  [210,62.94,4.2836,201.734],
  [211,62.94,4.304,204.249],
  [212,62.94,4.3244,204.623],
  [213,62.94,4.3448,207.16],
  [214,62.94,4.3652,207.526],
  [215,62.94,4.3856,210.085],
  [216,62.94,4.406,210.442],
  [217,62.94,4.4264,213.023],
  [218,62.94,4.4468,213.372],
  [219,62.94,4.4672,215.975],
  [220,62.94,4.4876,216.315],
  [221,62.94,4.508,218.941],
  [222,62.94,4.5284,219.272],
  [223,62.94,4.5488,221.92],
  [224,62.94,4.5692,222.242],
  [225,62.94,4.5896,224.912],
  [226,62.94,4.61,225.225],
  [227,62.94,4.6304,227.918],
  [228,62.94,4.6508,228.222],
  [229,62.94,4.6712,230.937],
  [230,62.94,4.6916,231.232],
  [231,62.94,4.712,233.969],
  [232,62.94,4.7324,234.254],
  [233,62.94,4.7528,237.015],
  [234,62.94,4.7732,237.29],
  [235,62.94,4.7936,240.073],
  [236,62.94,4.814,240.339],
  [237,62.94,4.8344,243.145],
  [238,62.94,4.8548,243.401],
  [239,62.94,4.8752,246.229],
  [240,62.94,4.8956,246.476],
  [241,62.94,4.916,249.327],
  [242,62.94,4.9364,249.564],
  [243,62.94,4.9568,252.437],
  [244,62.94,4.9772,252.664],
  [245,62.94,4.9976,255.56],
  [246,62.94,5.018,255.777],
  [247,62.94,5.0384,258.696],
  [248,62.94,5.0588,258.903],
  [249,62.94,5.0792,261.845],
  [250,62.94,5.0996,262.041],
  [251,62.94,5.12,265.006],
  [252,62.94,5.1404,265.192],
  [253,62.94,5.1608,268.18],
  [254,62.94,5.1812,268.356],
  [255,62.94,5.2016,271.366],
  [256,62.94,5.222,271.532],
  [257,62.94,5.2424,274.566],
  [258,62.94,5.2628,274.72],
  [259,62.94,5.2832,277.777],
  [260,62.94,5.3036,277.921],
  [261,62.94,5.324,281.001],
  [262,62.94,5.3444,281.135],
  [263,62.94,5.3648,284.237],
  [264,62.94,5.3852,284.36],
  [265,62.94,5.4056,287.486],
  [266,62.94,5.426,287.598],
  [267,62.94,5.4464,290.747],
  [268,62.94,5.4668,290.848],
  [269,62.94,5.4872,294.02],
  [270,62.94,5.5076,294.11],
  [271,62.94,5.528,297.305],
  [272,62.94,5.5484,297.384],
  [273,62.94,5.5688,300.603],
  [274,62.94,5.5892,300.67],
  [275,62.94,5.6096,303.913],
  [276,62.94,5.63,303.968],
  [277,62.94,5.6504,307.234],
  [278,62.94,5.6708,307.279],
  [279,62.94,5.6912,310.568],
  [280,62.94,5.7116,310.601],
  [281,62.94,5.732,313.914],
  [282,62.94,5.7524,313.935],
  [283,62.94,5.7728,317.271],
  [284,62.94,5.7932,317.281],
  [285,62.94,5.8136,320.641],
  [286,62.94,5.834,320.638],
  [287,62.94,5.8544,324.022],
  [288,62.94,5.8748,324.008],
  [289,62.94,5.8952,327.415],
  [290,62.94,5.9156,327.389],
  [291,62.94,5.936,330.82],
  [292,62.94,5.9564,330.782],
  [293,62.94,5.9768,334.236],
  [294,62.94,5.9972,334.186],
  [295,62.94,6.0176,337.665],
  [296,62.94,6.038,337.602],
  [297,62.94,6.0584,341.105],
  [298,62.94,6.0788,341.03],
  [299,62.94,6.0992,344.556],
  [300,62.94,6.1196,344.469],
  [301,62.94,6.14,348.019],
  [302,62.94,6.1604,347.92],
  [303,62.94,6.1808,351.494],
  [304,62.94,6.2012,351.382],
  [305,62.94,6.2216,354.98],
  [306,62.94,6.242,354.855],
  [307,62.94,6.2624,358.478],
  [308,62.94,6.2828,358.34],
  [309,62.94,6.3032,361.987],
  [310,62.94,6.3236,361.836],
  [311,62.94,6.344,365.507],
  [312,62.94,6.3644,365.344],
  [313,62.94,6.3848,369.039],
  [314,62.94,6.4052,368.863],
  [315,62.94,6.4256,372.582],
  [316,62.94,6.446,372.393],
  [317,62.94,6.4664,376.136],
  [318,62.94,6.4868,375.934],
  [319,62.94,6.5072,379.701],
  [320,62.94,6.5276,379.486],
  [321,62.94,6.548,383.278],
  [322,62.94,6.5684,383.05],
  [323,62.94,6.5888,386.866],
  [324,62.94,6.6092,386.624],
  [325,62.94,6.6296,390.465],
  [326,62.94,6.65,390.21],
  [327,62.94,6.6704,394.075],
  [328,62.94,6.6908,393.806],
  [329,62.94,6.7112,397.696],
  [330,62.94,6.7316,397.414],
  [331,62.94,6.752,401.328],
  [332,62.94,6.7724,401.033],
  [333,62.94,6.7928,404.971],
  [334,62.94,6.8132,404.662],
  [335,62.94,6.8336,408.625],
  [336,62.94,6.854,408.302],
  [337,62.94,6.8744,412.29],
  [338,62.94,6.8948,411.954],
  [339,62.94,6.9152,415.966],
  [340,62.94,6.9356,415.616],
  [341,62.94,6.956,419.653],
  [342,62.94,6.9764,419.288],
  [343,62.94,6.9968,423.35],
  [344,62.94,7.0172,422.972],
  [345,62.94,7.0376,427.059],
  [346,62.94,7.058,426.666],
  [347,62.94,7.0784,430.778],
  [348,62.94,7.0988,430.371],
  [349,62.94,7.1192,434.508],
  [350,62.94,7.1396,434.087],
  [351,62.94,7.16,438.248],
  [352,62.94,7.1804,437.813],
  [353,62.94,7.2008,442.0],
  [354,62.94,7.2212,441.55],
  [355,62.94,7.2416,445.762],
  [356,62.94,7.262,445.297],
  [357,62.94,7.2824,449.534],
  [358,62.94,7.3028,449.055],
  [359,62.94,7.3232,453.317],
  [360,62.94,7.3436,452.824],
  [361,62.94,7.364,457.111],
  [362,62.94,7.3844,456.603],
  [363,62.94,7.4048,460.915],
  [364,62.94,7.4252,460.392],
  [365,62.94,7.4456,464.73],
  [366,62.94,7.466,464.192],
  [367,62.94,7.4864,468.555],
  [368,62.94,7.5068,468.002],
  [369,62.94,7.5272,472.39],
  [370,62.94,7.5476,471.823],
  [371,62.94,7.568,476.236],
  [372,62.94,7.5884,475.654],
  [373,62.94,7.6088,480.093],
  [374,62.94,7.6292,479.495],
  [375,62.94,7.6496,483.959],
  [376,62.94,7.67,483.347],
  [377,62.94,7.6904,487.836],
  [378,62.94,7.7108,487.209],
  [379,62.94,7.7312,491.724],
  [380,62.94,7.7516,491.081],
  [381,62.94,7.772,495.621],
  [382,62.94,7.7924,494.963],
  [383,62.94,7.8128,499.529],
  [384,62.94,7.8332,498.855],
  [385,62.94,7.8536,503.447],
  [386,62.94,7.874,502.758],
  [387,62.94,7.8944,507.375],
  [388,62.94,7.9148,506.671],
  [389,62.94,7.9352,511.314],
  [390,62.94,7.9556,510.593],
  [391,62.94,7.976,515.262],
  [392,62.94,7.9964,514.526],
  [393,62.94,8.0168,519.221],
  [394,62.94,8.0372,518.469],
  [395,62.94,8.0576,523.19],
  [396,62.94,8.078,522.422],
  [397,62.94,8.0984,527.169],
  [398,62.94,8.1188,526.385],
  [399,62.94,8.1392,531.158],
  [400,62.94,8.1596,530.358],
  [401,62.94,8.18,535.156],
  [402,62.94,8.2004,534.341],
  [403,62.94,8.2208,539.165],
  [404,62.94,8.2412,538.334],
  [405,62.94,8.2616,543.184],
  [406,62.94,8.282,542.336],
  [407,62.94,8.3024,547.213],
  [408,62.94,8.3228,546.349],
  [409,62.94,8.3432,551.251],
  [410,62.94,8.3636,550.371],
  [411,62.94,8.384,555.3],
  [412,62.94,8.4044,554.403],
  [413,62.94,8.4248,559.358],
  [414,62.94,8.4452,558.445],
  [415,62.94,8.4656,563.427],
  [416,62.94,8.486,562.497],
  [417,62.94,8.5064,567.505],
  [418,62.94,8.5268,566.559],
  [419,62.94,8.5472,571.593],
  [420,62.94,8.5676,570.63],
  [421,62.94,8.588,575.69],
  [422,62.94,8.6084,574.711],
  [423,62.94,8.6288,579.798],
  [424,62.94,8.6492,578.802],
  [425,62.94,8.6696,583.915],
  [426,62.94,8.69,582.902],
  [427,62.94,8.7104,588.041],
  [428,62.94,8.7308,587.012],
  [429,62.94,8.7512,592.178],
  [430,62.94,8.7716,591.131],
  [431,62.94,8.792,596.324],
  [432,62.94,8.8124,595.26],
  [433,62.94,8.8328,600.48],
  [434,62.94,8.8532,599.399],
  [435,62.94,8.8736,604.645],
  [436,62.94,8.894,603.547],
  [437,62.94,8.9144,608.82],
  [438,62.94,8.9348,607.705],
  [439,62.94,8.9552,613.005],
  [440,62.94,8.9756,611.873],
  [441,62.94,8.996,617.199],
  [442,62.94,9.0164,616.049],
  [443,62.94,9.0368,621.402],
  [444,62.94,9.0572,620.236],
  [445,62.94,9.0776,625.615],
  [446,62.94,9.098,624.431],
  [447,62.94,9.1184,629.838],
  [448,62.94,9.1388,628.636],
  [449,62.94,9.1592,634.07],
  [450,62.94,9.1796,632.851],
  [451,62.94,9.2,638.311],
  [452,62.94,9.2204,637.075],
  [453,62.94,9.2408,642.562],
  [454,62.94,9.2612,641.308],
  [455,62.94,9.2816,646.822],
  [456,62.94,9.302,645.551],
  [457,62.94,9.3224,651.092],
  [458,62.94,9.3428,649.802],
  [459,62.94,9.3632,655.371],
  [460,62.94,9.3836,654.064],
  [461,62.94,9.404,659.659],
  [462,62.94,9.4244,658.334],
  [463,62.94,9.4448,663.957],
  [464,62.94,9.4652,662.614],
  [465,62.94,9.4856,668.264],
  [466,62.94,9.506,666.903],
  [467,62.94,9.5264,672.58],
  [468,62.94,9.5468,671.201],
  [469,62.94,9.5672,676.906],
  [470,62.94,9.5876,675.508],
  [471,62.94,9.608,681.24],
  [472,62.94,9.6284,679.825],
  [473,62.94,9.6488,685.584],
  [474,62.94,9.6692,684.15],
  [475,62.94,9.6896,689.937],
  [476,62.94,9.71,688.485],
  [477,62.94,9.7304,694.299],
  [478,62.94,9.7508,692.829],
  [479,62.94,9.7712,698.671],
  [480,62.94,9.7916,697.182],
  [481,62.94,9.812,703.051],
  [482,62.94,9.8324,701.544],
  [483,62.94,9.8528,707.441],
  [484,62.94,9.8732,705.915],
  [485,62.94,9.8936,711.84],
  [486,62.94,9.914,710.296],
  [487,62.94,9.9344,716.248],
  [488,62.94,9.9548,714.685],
  [489,62.94,9.9752,720.665],
  [490,62.94,9.9956,719.083],
  [491,62.94,10.016,725.091],
  [492,62.94,10.0364,723.49],
  [493,62.94,10.0568,729.526],
  [494,62.94,10.0772,727.906],
  [495,62.94,10.0976,733.97],
  [496,62.94,10.118,732.332],
  [497,62.94,10.1384,738.422],
  [498,62.94,10.1588,736.766],
  [499,62.94,10.1792,742.884],
  [500,62.94,10.1996,741.209]
];

  // Linear interpolation lookup for any age within the data range.
  // For ages beyond the data (>500), values are clamped to the year-500 row.
  const lookupGrowth = (age) => {
    if (age <= GROWTH_DATA[0][0]) return GROWTH_DATA[0];
    if (age >= GROWTH_DATA[GROWTH_DATA.length - 1][0]) return GROWTH_DATA[GROWTH_DATA.length - 1];
    // Binary-search-friendly: data is age-sorted starting at age 1
    const lower = Math.floor(age) - 1; // index of floor age in 0-indexed array
    const upper = lower + 1;
    if (upper >= GROWTH_DATA.length) return GROWTH_DATA[lower];
    const a = GROWTH_DATA[lower];
    const b = GROWTH_DATA[upper];
    const t = age - a[0];
    return [
      age,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
      a[3] + (b[3] - a[3]) * t
    ];
  };

  const projectTree = (targetYear) => {
    const age = Math.max(0, targetYear - CURRENT_YEAR);
    const [, height, diameter] = lookupGrowth(age);
    return {
      height_m: Math.round(height * 10) / 10,
      trunk_m: Math.round(diameter * 100) / 100,
      age_years: age
    };
  };

  const projectCarbon = (age) => {
    const [, , , tCO2] = lookupGrowth(age);
    const display = tCO2 < 1 ? tCO2.toFixed(2) : tCO2 < 10 ? tCO2.toFixed(1) : Math.round(tCO2).toLocaleString();
    const cars = Math.round(tCO2 / 4.6);
    let equivalence;
    if (tCO2 < 0.5) equivalence = "The early years - most of your tree's carbon work is still ahead";
    else if (tCO2 < 2) equivalence = "About one car driven for several months";
    else if (tCO2 < 5) equivalence = "About one car's annual emissions";
    else equivalence = `Equivalent to taking ${cars.toLocaleString()} car${cars === 1 ? '' : 's'} off the road for a year`;

    return { tCO2, display, equivalence };
  };

  const getForestState = (age) => {
    if (age <= 5) return "The native canopy is establishing - oak, rowan, silver birch, and cherry are putting down their first roots alongside the young Sequoia. Scots Pine and Norway Spruce shelter it from Welsh wind.";
    if (age <= 15) return "The forest is finding its shape. Native species are knee-to-shoulder height. The nurse crops are doing their job, shielding the young Sequoia and shaping its growth.";
    if (age <= 40) return "The forest reads as a forest now. The native species are mature. The Sequoia has begun its long climb above them. The first nurse crops have been gradually managed out.";
    if (age <= 100) return "The Sequoia is now visible from a distance - taller than the surrounding canopy. The native woodland beneath is a complete, biodiverse ecosystem. The nurses are gone; the forest stands as it was designed to.";
    if (age <= 300) return "The Sequoia is one of the tallest trees in Wales. Generations of birds have nested in it. The native woodland around it has cycled through several generations of its own.";
    return "The Sequoia is among the oldest living things in Britain - still growing, still capturing carbon. The forest below has self-renewed many times. The tree itself shows no sign of aging in the way other trees do.";
  };

  // Plausible coordinates within Abergavenny Grove (Monmouthshire, Wales)
  const generateGPS = () => {
    const baseLat = 51.8200;
    const baseLng = -3.0250;
    const lat = baseLat + (Math.random() - 0.5) * 0.018;
    const lng = baseLng + (Math.random() - 0.5) * 0.018;
    return { lat: lat.toFixed(5), lng: lng.toFixed(5) };
  };

  const computeTargetYear = () => {
    if (framing === 'milestone') return CURRENT_YEAR + (milestoneAge - parseInt(lovedOneCurrentAge));
    if (framing === 'future') return futureYear;
    if (framing === 'lifespan') return CURRENT_YEAR + (100 - parseInt(userCurrentAge));
    return 2326;
  };

  const handleSubmit = () => {
    const targetYear = computeTargetYear();
    const tree = projectTree(targetYear);
    const gps = generateGPS();
    const forest = getForestState(tree.age_years);
    const carbon = projectCarbon(tree.age_years);

    let subjectName = lovedOneName || userName;
    let subjectAge = framing === 'milestone' ? milestoneAge : (framing === 'lifespan' ? 100 : null);

    setProjection({ targetYear, tree, gps, forest, carbon, subjectName, subjectAge, framing });
    setStep('loading');
    setTimeout(() => setStep('result'), 2800);
  };

  const reset = () => {
    setStep('intro');
    setUserName('');
    setFraming(null);
    setLovedOneName('');
    setLovedOneCurrentAge('');
    setMilestoneAge(50);
    setFutureYear(2100);
    setUserCurrentAge('');
    setProjection(null);
  };

  const canSubmit = () => {
    if (!userName.trim()) return false;
    if (framing === 'milestone') {
      const a = parseInt(lovedOneCurrentAge);
      return lovedOneName.trim() && a >= 0 && a < milestoneAge && milestoneAge <= 120;
    }
    if (framing === 'future') return !!futureYear;
    if (framing === 'lifespan') {
      const a = parseInt(userCurrentAge);
      return a >= 0 && a < 100;
    }
    return false;
  };

  // ===== SVG Tree =====
  // Conical Sequoia silhouette + true-to-scale 1.7m human stick figure.
  // EVERYTHING is rendered to a single scale: 1 metre = (maxDisplayPx / maxHeightM) px.
  // Tree height, trunk diameter, and human are all measured against the same ruler.
  // This is the point: the proportions are what they actually are.
  const SequoiaSVG = ({ height_m, trunk_m, showHuman = true }) => {
    const SVG_W = 400;
    const SVG_H = 380;
    const groundY = 360;
    const treeX = 175;

    const maxDisplayPx = 330;
    const maxHeightM = 65;  // matches data ceiling at ~63m
    const PX_PER_M = maxDisplayPx / maxHeightM;  // ~5.08 px per metre

    // Strict-scale dimensions
    const heightPx = height_m * PX_PER_M;
    const trunkWidthPx = trunk_m * PX_PER_M;
    const humanHeightPx = 1.7 * PX_PER_M;  // ~8.6px

    // Bare-trunk portion: more visible bare trunk on mature trees, like real Sequoias
    // Saplings: most of the visible plant IS the canopy/needle structure
    // Mature: 20–25% of the tree is bare trunk before the canopy starts
    const trunkPortion = height_m < 3 ? 0.35 : height_m < 10 ? 0.22 : 0.20;
    const trunkHeight = heightPx * trunkPortion;
    const trunkTop = groundY - trunkHeight;

    // Conical canopy above the trunk
    const canopyHeight = heightPx - trunkHeight;
    const canopyTopY = trunkTop - canopyHeight;
    // Canopy base width: real Sequoia canopies are ~10–13m wide at maturity,
    // so canopy base diameter is roughly 1.7× trunk diameter for mature trees,
    // wider proportionally for young trees
    const canopyBaseHalf = height_m < 5
      ? heightPx * 0.18
      : Math.max(trunkWidthPx * 1.1, heightPx * 0.10);

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a3520" />
            <stop offset="50%" stopColor="#b05432" />
            <stop offset="100%" stopColor="#5a2515" />
          </linearGradient>
          <linearGradient id="canopyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2c4738" />
            <stop offset="60%" stopColor="#1f3a2c" />
            <stop offset="100%" stopColor="#1B3128" />
          </linearGradient>
        </defs>

        {/* Ground line */}
        <line x1="20" y1={groundY} x2={SVG_W - 20} y2={groundY} stroke="#D4CDB8" strokeWidth="0.5" />

        {/* TREE - render proper structure if there's enough size to see it,
            otherwise just a small mark */}
        {heightPx >= 4 && (
          <>
            {/* Trunk */}
            <rect
              x={treeX - trunkWidthPx / 2}
              y={trunkTop}
              width={Math.max(trunkWidthPx, 0.8)}
              height={trunkHeight}
              fill="url(#trunkGrad)"
            />

            {/* Conical canopy */}
            <polygon
              points={`
                ${treeX},${canopyTopY}
                ${treeX + canopyBaseHalf},${trunkTop + 1}
                ${treeX - canopyBaseHalf},${trunkTop + 1}
              `}
              fill="url(#canopyGrad)"
            />

            {/* Inner tonal layer for depth on bigger trees */}
            {height_m > 8 && (
              <polygon
                points={`
                  ${treeX},${canopyTopY + canopyHeight * 0.15}
                  ${treeX + canopyBaseHalf * 0.7},${trunkTop + 1}
                  ${treeX - canopyBaseHalf * 0.7},${trunkTop + 1}
                `}
                fill="#1B3128"
                opacity="0.45"
              />
            )}
          </>
        )}

        {/* Tiny sapling - single mark instead of a structured shape */}
        {heightPx < 4 && (
          <line
            x1={treeX}
            y1={groundY}
            x2={treeX}
            y2={groundY - Math.max(heightPx, 1.5)}
            stroke="#3d5d44"
            strokeWidth={Math.max(trunkWidthPx, 0.8)}
            strokeLinecap="round"
          />
        )}

        {/* HUMAN - true-to-scale 1.7m stick figure */}
        {showHuman && (() => {
          const humanX = treeX + Math.max(45, canopyBaseHalf + trunkWidthPx / 2 + 25);
          const h = humanHeightPx;
          const stroke = '#3a4a41';
          const strokeW = Math.max(0.6, h * 0.06);
          const headR = Math.max(0.8, h * 0.13);
          const headCY = headR;
          const neckY = headCY + headR;
          const hipY = h * 0.55;
          const legBottomY = h;
          const armSpan = h * 0.18;

          return (
            <g transform={`translate(${humanX}, ${groundY - h})`} stroke={stroke} strokeWidth={strokeW} strokeLinecap="round">
              <circle cx="0" cy={headCY} r={headR} fill={stroke} stroke="none" />
              <line x1="0" y1={neckY} x2="0" y2={hipY} />
              <line x1={-armSpan} y1={hipY - h * 0.05} x2={armSpan} y2={hipY - h * 0.05} />
              <line x1="0" y1={hipY} x2={-h * 0.12} y2={legBottomY} />
              <line x1="0" y1={hipY} x2={h * 0.12} y2={legBottomY} />
              <text x="0" y={h + 10} textAnchor="middle" fontSize="8" fill="#7c8c7e" fontFamily="Inter, sans-serif" stroke="none">
                1.7m
              </text>
            </g>
          );
        })()}
      </svg>
    );
  };

  const fontStack = `'Fraunces', Georgia, serif`;
  const bodyFont = `'Inter', system-ui, sans-serif`;

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: '#FFFFFF', fontFamily: bodyFont, color: '#14201A' }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body, html { background: white !important; }
        }
        @keyframes growUp {
          from { transform: scaleY(0.1); opacity: 0.3; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .anim-grow { transform-origin: bottom; animation: growUp 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .anim-fade { animation: fadeIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .pulse { animation: pulse-soft 2s ease-in-out infinite; }
      `}</style>

      {/* ===== STEP: INTRO ===== */}
      {step === 'intro' && (
        <div className="min-h-screen flex flex-col bg-white">
          <header className="px-8 md:px-14 pt-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase no-print">
            <span className="font-semibold" style={{ color: '#1B3128' }}>The Great Reserve</span>
            <span style={{ color: '#7C8C7E' }}>A field instrument </span>
          </header>

          <div className="flex-1 flex items-start px-8 md:px-14 py-12 md:py-16 relative overflow-hidden">
            {/* Subtle ring decoration */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: '-200px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                border: '1px solid rgba(176,84,50,0.12)',
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                right: '-120px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '440px',
                height: '440px',
                borderRadius: '50%',
                border: '1px solid rgba(176,84,50,0.08)',
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                right: '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '1px solid rgba(176,84,50,0.05)',
              }}
            />

            <div className="max-w-3xl w-full relative z-10">
              <div
                className="text-xs tracking-[0.34em] uppercase font-semibold mb-10 anim-fade"
                style={{ color: '#B05432', animationDelay: '0.1s' }}
              >
                Your Forest
              </div>
              <h1
                className="anim-fade mb-7"
                style={{
                  fontFamily: fontStack,
                  fontWeight: 300,
                  fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.022em',
                  color: '#1B3128',
                  animationDelay: '0.25s'
                }}
              >
                See the tree<br />
                you would plant -<br />
                <em style={{ color: '#B05432', fontWeight: 400 }}>in the year that matters most.</em>
              </h1>
              <p
                className="text-base md:text-lg mb-12 max-w-xl anim-fade"
                style={{
                  color: '#3A4A41',
                  fontFamily: fontStack,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: '1.45',
                  animationDelay: '0.4s'
                }}
              >
                A Giant Sequoia planted in our Groves could live for 1,000+ years. We'll show you how tall yours could be - and how much carbon it will have stored - at any point in its life.
              </p>
              <button
                onClick={() => setStep('name')}
                className="anim-fade group inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all hover:gap-5"
                style={{
                  background: '#1B3128',
                  color: '#FFFFFF',
                  fontFamily: bodyFont,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  animationDelay: '0.55s'
                }}
              >
                Begin <ChevronRight size={18} strokeWidth={2.5} />
              </button>

              <div
                className="mt-20 pt-6 border-t text-xs anim-fade"
                style={{
                  borderColor: '#E5DFCE',
                  color: '#7C8C7E',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  animationDelay: '0.7s'
                }}
              >
                Takes 30 seconds · Yours to keep
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP: NAME ===== */}
      {step === 'name' && (
        <div className="min-h-screen flex flex-col bg-white">
          <header className="px-8 md:px-14 pt-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase no-print">
            <button
              onClick={() => setStep('intro')}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              style={{ color: '#3A4A41' }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <span style={{ color: '#7C8C7E' }}>Step 1 of 3</span>
          </header>

          <div className="flex-1 flex items-start justify-center px-8 md:px-14 pt-8 md:pt-12 pb-16">
            <div className="max-w-2xl w-full anim-fade">
              <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-6" style={{ color: '#B05432' }}>
                A small introduction
              </div>
              <label
                className="block mb-8"
                style={{
                  fontFamily: fontStack,
                  fontWeight: 400,
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  lineHeight: '1.15',
                  color: '#1B3128',
                  letterSpacing: '-0.012em'
                }}
              >
                What's your first name?
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Type it here"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter' && userName.trim()) setStep('framing'); }}
                className="w-full bg-transparent border-b-2 pb-3 outline-none transition-colors"
                style={{
                  borderColor: '#D4CDB8',
                  fontFamily: fontStack,
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: '#1B3128',
                  fontStyle: 'italic'
                }}
              />
              <p
                className="mt-4 text-sm"
                style={{ color: '#3A4A41', fontStyle: 'italic', fontFamily: fontStack }}
              >
                Just so we can address your forest properly.
              </p>

              <div className="mt-12">
                <button
                  onClick={() => setStep('framing')}
                  disabled={!userName.trim()}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all hover:gap-5 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: '#1B3128',
                    color: '#FFFFFF',
                    fontFamily: bodyFont,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Continue <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP: YEAR FRAMING CHOICE ===== */}
      {step === 'framing' && (
        <div className="min-h-screen flex flex-col bg-white">
          <header className="px-8 md:px-14 pt-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase no-print">
            <button
              onClick={() => setStep('name')}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              style={{ color: '#3A4A41' }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <span style={{ color: '#7C8C7E' }}>Step 2 of 3</span>
          </header>

          <div className="flex-1 flex items-start justify-center px-8 md:px-14 pt-8 md:pt-12 pb-12">
            <div className="max-w-3xl w-full anim-fade">
              <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-5" style={{ color: '#B05432' }}>
                Hello, {userName}
              </div>
              <h2
                className="mb-3"
                style={{
                  fontFamily: fontStack,
                  fontWeight: 400,
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  lineHeight: '1.15',
                  color: '#1B3128',
                  letterSpacing: '-0.012em'
                }}
              >
                Choose the year that matters to you.
              </h2>
              <p className="text-base mb-10" style={{ color: '#3A4A41', fontFamily: fontStack, fontStyle: 'italic', fontWeight: 400 }}>
                The forest will still be standing for thousands of years. Pick the moment in its future you'd most like to see.
              </p>

              <div className="grid gap-4">
                {[
                  { id: 'milestone', icon: Heart, title: "A loved one's milestone", sub: "The year my child turns 50, my parent turns 80, my partner turns 70…" },
                  { id: 'future', icon: Calendar, title: "A round future year", sub: "2226. 2326. 2426. 2526. The kind of date we don't usually let ourselves picture." },
                  { id: 'lifespan', icon: Heart, title: "The year I'd turn 100", sub: "If you lived to a hundred - what would your forest look like then?" }
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => { setFraming(opt.id); setStep('details'); }}
                      className="group text-left p-5 md:p-6 border transition-all hover:shadow-md hover:border-opacity-100"
                      style={{
                        background: '#FFFFFF',
                        borderColor: '#E5DFCE',
                        borderRadius: '4px'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                          style={{ background: '#1B3128' }}
                        >
                          <Icon size={16} color="#B05432" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            style={{
                              fontFamily: fontStack,
                              fontSize: '1.15rem',
                              fontWeight: 500,
                              color: '#1B3128',
                              marginBottom: '4px'
                            }}
                          >
                            {opt.title}
                          </div>
                          <div className="text-sm" style={{ color: '#3A4A41', fontStyle: 'italic', fontFamily: fontStack, fontWeight: 400 }}>
                            {opt.sub}
                          </div>
                        </div>
                        <ChevronRight size={20} className="flex-shrink-0 mt-2 transition-transform group-hover:translate-x-1" style={{ color: '#B05432' }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP: DETAILS ===== */}
      {step === 'details' && (
        <div className="min-h-screen flex flex-col bg-white">
          <header className="px-8 md:px-14 pt-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase no-print">
            <button
              onClick={() => setStep('framing')}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              style={{ color: '#3A4A41' }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <span style={{ color: '#7C8C7E' }}>Step 3 of 3</span>
          </header>

          <div className="flex-1 flex items-start justify-center px-8 md:px-14 pt-8 md:pt-12 pb-12">
            <div className="max-w-2xl w-full anim-fade">
              {framing === 'milestone' && (
                <>
                  <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-5" style={{ color: '#B05432' }}>
                    Your loved one
                  </div>
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 400,
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                      lineHeight: '1.18',
                      color: '#1B3128'
                    }}
                  >
                    Who are you planting for?
                  </h2>

                  <div className="space-y-7">
                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: '#3A4A41' }}>
                        Their name
                      </label>
                      <input
                        type="text"
                        value={lovedOneName}
                        onChange={(e) => setLovedOneName(e.target.value)}
                        placeholder="A first name"
                        className="w-full bg-transparent border-b-2 pb-2 outline-none"
                        style={{
                          borderColor: '#D4CDB8',
                          fontFamily: fontStack,
                          fontSize: '1.4rem',
                          color: '#1B3128',
                          fontStyle: 'italic'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase font-semibold mb-2" style={{ color: '#3A4A41' }}>
                        Their age now
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={lovedOneCurrentAge}
                        onChange={(e) => setLovedOneCurrentAge(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full bg-transparent border-b-2 pb-2 outline-none"
                        style={{
                          borderColor: '#D4CDB8',
                          fontFamily: fontStack,
                          fontSize: '1.4rem',
                          color: '#1B3128'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.18em] uppercase font-semibold mb-3" style={{ color: '#3A4A41' }}>
                        See the forest when {lovedOneName || 'they'} turn{lovedOneName && lovedOneName.endsWith('s') ? '' : 's'}…
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[40, 50, 60, 70, 80, 100].map((age) => (
                          <button
                            key={age}
                            onClick={() => setMilestoneAge(age)}
                            className="px-5 py-2 transition-all"
                            style={{
                              background: milestoneAge === age ? '#1B3128' : 'transparent',
                              color: milestoneAge === age ? '#FFFFFF' : '#1B3128',
                              border: `1px solid ${milestoneAge === age ? '#1B3128' : '#D4CDB8'}`,
                              borderRadius: '999px',
                              fontFamily: bodyFont,
                              fontSize: '0.9rem',
                              fontWeight: 500
                            }}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {lovedOneName && lovedOneCurrentAge && parseInt(lovedOneCurrentAge) < milestoneAge && (
                      <div
                        className="mt-6 p-5 rounded text-sm anim-fade"
                        style={{
                          background: '#FBF6EE',
                          color: '#1B3128',
                          fontFamily: fontStack,
                          fontStyle: 'italic',
                          fontSize: '1.05rem',
                          lineHeight: '1.5',
                          border: '1px solid #E5DFCE'
                        }}
                      >
                        That's the year <strong style={{ fontStyle: 'normal', fontWeight: 600 }}>{CURRENT_YEAR + (milestoneAge - parseInt(lovedOneCurrentAge))}</strong>. Your tree will be {milestoneAge - parseInt(lovedOneCurrentAge)} years old.
                      </div>
                    )}
                  </div>
                </>
              )}

              {framing === 'future' && (
                <>
                  <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-5" style={{ color: '#B05432' }}>
                    A future year
                  </div>
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 400,
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                      lineHeight: '1.18',
                      color: '#1B3128'
                    }}
                  >
                    Pick a year you'd like to see your forest in.
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[2226, 2326, 2426, 2526].map((y) => (
                      <button
                        key={y}
                        onClick={() => setFutureYear(y)}
                        className="py-5 transition-all"
                        style={{
                          background: futureYear === y ? '#1B3128' : 'transparent',
                          color: futureYear === y ? '#FFFFFF' : '#1B3128',
                          border: `1px solid ${futureYear === y ? '#1B3128' : '#D4CDB8'}`,
                          borderRadius: '4px',
                          fontFamily: fontStack,
                          fontSize: '1.5rem',
                          fontWeight: 400
                        }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: '#3A4A41', fontStyle: 'italic', fontFamily: fontStack }}>
                    In {futureYear}, your tree will be {futureYear - CURRENT_YEAR} years old.
                  </p>
                </>
              )}

              {framing === 'lifespan' && (
                <>
                  <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-5" style={{ color: '#B05432' }}>
                    Your lifespan
                  </div>
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 400,
                      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                      lineHeight: '1.18',
                      color: '#1B3128'
                    }}
                  >
                    How old are you now, {userName}?
                  </h2>

                  <div>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={userCurrentAge}
                      onChange={(e) => setUserCurrentAge(e.target.value)}
                      placeholder="e.g. 42"
                      className="w-full bg-transparent border-b-2 pb-2 outline-none"
                      style={{
                        borderColor: '#D4CDB8',
                        fontFamily: fontStack,
                        fontSize: '1.4rem',
                        color: '#1B3128'
                      }}
                    />
                    <p className="mt-3 text-sm" style={{ color: '#3A4A41', fontStyle: 'italic', fontFamily: fontStack }}>
                      We'll project your forest to the year you'd turn 100.
                    </p>

                    {userCurrentAge && parseInt(userCurrentAge) < 100 && (
                      <div
                        className="mt-6 p-5 rounded text-sm anim-fade"
                        style={{
                          background: '#FBF6EE',
                          color: '#1B3128',
                          fontFamily: fontStack,
                          fontStyle: 'italic',
                          fontSize: '1.05rem',
                          lineHeight: '1.5',
                          border: '1px solid #E5DFCE'
                        }}
                      >
                        That's the year <strong style={{ fontStyle: 'normal', fontWeight: 600 }}>{CURRENT_YEAR + (100 - parseInt(userCurrentAge))}</strong>. Your tree will be {100 - parseInt(userCurrentAge)} years old.
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="mt-12">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit()}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-sm transition-all hover:gap-5 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: '#1B3128',
                    color: '#FFFFFF',
                    fontFamily: bodyFont,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  See my forest <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP: LOADING ===== */}
      {step === 'loading' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16 no-print bg-white">
          <div className="max-w-md text-center anim-fade">
            <svg width="100" height="120" viewBox="0 0 100 120" className="mx-auto mb-10">
              <line x1="50" y1="118" x2="50" y2="40" stroke="#B05432" strokeWidth="3" strokeLinecap="round" className="anim-grow" />
              <ellipse cx="50" cy="40" rx="22" ry="35" fill="#3d5d44" className="anim-grow pulse" />
              <ellipse cx="50" cy="46" rx="16" ry="25" fill="#1b3128" opacity="0.6" className="anim-grow" />
              <line x1="20" y1="118" x2="80" y2="118" stroke="#7C8C7E" strokeWidth="0.5" />
            </svg>

            <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-4" style={{ color: '#B05432' }}>
              Calculating your projection
            </div>
            <p
              className="text-lg mb-2"
              style={{
                color: '#1B3128',
                fontFamily: fontStack,
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: '1.4'
              }}
            >
              Modelling growth in our Abergavenny Grove…
            </p>
            <p className="text-sm pulse" style={{ color: '#7C8C7E', fontFamily: fontStack, fontStyle: 'italic' }}>
              Calibrated to UCL/Royal Society UK Sequoia LiDAR research
            </p>
          </div>
        </div>
      )}

      {/* ===== STEP: RESULT ===== */}
      {step === 'result' && projection && (
        <div className="min-h-screen pb-20 bg-white">
          <header className="px-8 md:px-14 pt-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase no-print">
            <span className="font-semibold" style={{ color: '#1B3128' }}>The Great Reserve</span>
            <button
              onClick={reset}
              className="hover:opacity-60 transition-opacity"
              style={{ color: '#7C8C7E' }}
            >
              Start over
            </button>
          </header>

          <div className="max-w-5xl mx-auto px-6 md:px-14 pt-10">

            {/* Hero - emotional headline */}
            <div className="anim-fade mb-12" style={{ animationDelay: '0.1s' }}>
              <div className="text-xs tracking-[0.32em] uppercase font-semibold mb-5" style={{ color: '#B05432' }}>
                Your projection · Abergavenny Grove
              </div>
              <h1
                style={{
                  fontFamily: fontStack,
                  fontWeight: 300,
                  fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                  lineHeight: '1.04',
                  color: '#1B3128',
                  letterSpacing: '-0.022em'
                }}
              >
                {projection.subjectName}'s forest,<br />
                <em style={{ color: '#B05432', fontWeight: 400 }}>in the year {projection.targetYear}.</em>
              </h1>
              {projection.framing === 'milestone' && projection.subjectName !== userName && (
                <p
                  className="mt-5 text-lg max-w-2xl"
                  style={{ color: '#3A4A41', fontFamily: fontStack, fontStyle: 'italic', fontWeight: 400 }}
                >
                  The year {projection.subjectName} turns {projection.subjectAge}. Your tree will be {projection.tree.age_years} years old, planted in your name in {CURRENT_YEAR}.
                </p>
              )}
              {projection.framing === 'lifespan' && (
                <p
                  className="mt-5 text-lg max-w-2xl"
                  style={{ color: '#3A4A41', fontFamily: fontStack, fontStyle: 'italic', fontWeight: 400 }}
                >
                  The year you'd turn 100. Your tree will be {projection.tree.age_years} years old - and it will keep growing for many more to come! Some Giant Sequoia's have reached the grand age of 3,000 in the Sierra Nevada!
                </p>
              )}
              {projection.framing === 'future' && (
                <p
                  className="mt-5 text-lg max-w-2xl"
                  style={{ color: '#3A4A41', fontFamily: fontStack, fontStyle: 'italic', fontWeight: 400 }}
                >
                  {projection.tree.age_years} years after planting. Sequoias do not plateau the way other trees do - your tree will still be growing, and still capturing carbon, for thousands of years beyond this.
                </p>
              )}
            </div>

            {/* Visual + data */}
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div
                className="anim-fade p-6 md:p-8"
                style={{
                  background: '#FBF6EE',
                  border: '1px solid #E5DFCE',
                  borderRadius: '4px',
                  animationDelay: '0.3s'
                }}
              >
                <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: '#7C8C7E' }}>
                  At true scale
                </div>
                <SequoiaSVG height_m={projection.tree.height_m} trunk_m={projection.tree.trunk_m} />
                <div className="mt-4 text-xs text-center" style={{ color: '#7C8C7E', fontFamily: fontStack, fontStyle: 'italic' }}>
                  Your Sequoia at {projection.tree.age_years} years · Compared to a 1.7m person
                </div>
              </div>

              <div className="anim-fade space-y-7" style={{ animationDelay: '0.45s' }}>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: '#7C8C7E' }}>
                    Projected height
                  </div>
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontSize: 'clamp(2.5rem, 5vw, 3.6rem)',
                      fontWeight: 400,
                      lineHeight: '1',
                      color: '#B05432',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {projection.tree.height_m}<span style={{ fontSize: '0.5em', color: '#3A4A41' }}> m</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: '#7C8C7E' }}>
                    Trunk diameter
                  </div>
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                      fontWeight: 400,
                      lineHeight: '1',
                      color: '#1B3128',
                    }}
                  >
                    {projection.tree.trunk_m}<span style={{ fontSize: '0.6em', color: '#3A4A41' }}> m</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: '#7C8C7E' }}>
                    Tree age in {projection.targetYear}
                  </div>
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                      fontWeight: 400,
                      lineHeight: '1',
                      color: '#1B3128',
                    }}
                  >
                    {projection.tree.age_years} <span style={{ fontSize: '0.5em', color: '#3A4A41' }}>years old</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARBON BLOCK - featured */}
            <div
              className="anim-fade mb-10 p-8 md:p-10"
              style={{
                background: '#1B3128',
                color: '#FFFFFF',
                borderRadius: '4px',
                animationDelay: '0.55s'
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase font-semibold mb-3 flex items-center gap-2" style={{ color: '#B05432' }}>
                    <Wind size={14} strokeWidth={2} /> Carbon stored by {projection.targetYear}
                  </div>
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontSize: 'clamp(3rem, 7vw, 5rem)',
                      fontWeight: 300,
                      lineHeight: '0.95',
                      color: '#FFFFFF',
                      letterSpacing: '-0.025em',
                      marginBottom: '8px'
                    }}
                  >
                    {projection.carbon.display}<span style={{ fontSize: '0.4em', color: '#EAE0CC', fontWeight: 400 }}> tonnes CO₂</span>
                  </div>
                  <p
                    style={{
                      color: '#EAE0CC',
                      fontFamily: fontStack,
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: '1.05rem',
                      lineHeight: '1.45'
                    }}
                  >
                    {projection.carbon.equivalence}
                  </p>
                </div>

                <div className="md:border-l md:pl-10" style={{ borderColor: 'rgba(244,237,224,0.18)' }}>
                  <p
                    style={{
                      color: '#FFFFFF',
                      fontFamily: fontStack,
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: '1.05rem',
                      lineHeight: '1.55'
                    }}
                  >
                    {projection.forest}
                  </p>
                  <p
                    className="mt-4 text-xs"
                    style={{
                      color: '#7C8C7E',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Sequoias do not plateau. Some Giant Sequoia's have reached the grand age of 3,000 in the Sierra Nevada!
                  </p>
                </div>
              </div>
            </div>

            {/* Grove location */}
            <div
              className="anim-fade p-6 md:p-7 mb-10"
              style={{
                background: '#FBF6EE',
                border: '1px solid #E5DFCE',
                borderRadius: '4px',
                animationDelay: '0.7s'
              }}
            >
              <div className="flex items-start gap-4">
                <MapPin size={22} color="#B05432" strokeWidth={1.5} className="flex-shrink-0 mt-1" />
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase font-semibold mb-2" style={{ color: '#B05432' }}>
                    You are invited to plant in
                  </div>
                  <div
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 400,
                      fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                      lineHeight: '1.15',
                      color: '#1B3128'
                    }}
                  >
                    Our Abergavenny Grove
                  </div>
                  <div className="text-sm mt-2 font-mono tracking-wider" style={{ color: '#3A4A41' }}>
                    {projection.gps.lat}°N · {Math.abs(parseFloat(projection.gps.lng)).toFixed(5)}°W
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#7C8C7E', fontStyle: 'italic', fontFamily: fontStack }}>
                    Monmouthshire, Wales · A 1,000-year forest in design
                  </div>
                </div>
              </div>
            </div>

            {/* Single CTA */}
            <div className="anim-fade no-print mb-10" style={{ animationDelay: '0.85s' }}>
              <div
                className="p-8 md:p-10 grid md:grid-cols-5 gap-8 items-center"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #1B3128',
                  borderRadius: '4px'
                }}
              >
                <div className="md:col-span-3">
                  <div className="text-xs tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: '#B05432' }}>
                    Make this real
                  </div>
                  <h3
                    style={{
                      fontFamily: fontStack,
                      fontWeight: 400,
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      lineHeight: '1.15',
                      color: '#1B3128',
                      marginBottom: '10px'
                    }}
                  >
                    Plant {projection.subjectName !== userName ? `${projection.subjectName}'s tree` : 'your tree'} in our Abergavenny Grove.
                  </h3>
                  <p
                    style={{
                      color: '#3A4A41',
                      fontFamily: fontStack,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: '1.5'
                    }}
                  >
                    We plant in April and October. Your sponsorship gives you a named, GPS-tagged Giant Sequoia in a native & mixed-species 1,000-year forest in Wales.
                  </p>
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 justify-end">
                  <a
                    href="https://thegreatreserve.us/products/sponsor-a-sequoia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 transition-all hover:gap-5"
                    style={{
                      background: '#B05432',
                      color: '#FFFFFF',
                      fontFamily: bodyFont,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      borderRadius: '2px',
                      textDecoration: 'none'
                    }}
                  >
                    Sponsor your Sequoia <ChevronRight size={18} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs flex justify-between pt-6 border-t no-print" style={{ borderColor: '#E5DFCE', color: '#7C8C7E', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              <span>thegreatreserve.us</span>
              <span>Projection · {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
