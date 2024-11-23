import { width, height } from "@fortawesome/free-solid-svg-icons/fa0";
import { style } from "d3";
import { map } from "leaflet";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you import Link from react-router-dom
import { FaUsers, FaHandsHelping, FaBalanceScale, FaBriefcase, FaHeart, FaShieldAlt } from 'react-icons/fa';


const HeartModel = () => {
  console.log('Heart is rendering...');

  const [hoveredArea, setHoveredArea] = useState(null);

  const cards = [
    {
      heading: "Ending Sexual and Gender Based Violence (SGBV):",
      desc: "Rescue from Sexual Abuse, Child Marriage & Child Labor",
      icon: "./icons/first-icon.png",
      color: "#671c0f",
      ico: <FaShieldAlt />
    },
    {
      heading: "Continuum of Care:",
      desc: "Access & Equity in Education, Healthcare & Life Skills through Arts and Technology",
      icon: "./icons/second-icon.png",
      color: "#962820",
      ico: <FaHandsHelping />

    },
    {
      heading: "Livelihoods, Rights & Entitlements:",
      desc: "Linkages with Government Schemes and Employability Enhancement Opportunities",
      icon: "./icons/third-icon.png",
      color: "#dd4826",
      ico: <FaHeart />

    },
  ];

  const mobQuickLink = [
    {
      href: "/health",
      title: "Health",
      points:
        "532.209 99.6315 558.693 132.422 585.178 170.256 610.401 215.658 633.102 269.888 648.236 325.379 654.541 382.131 682.287 355.647 703.727 340.513 733.994 325.379 768.046 315.29 795.791 312.767 822.275 314.029 844.976 319.073 867.677 327.901 889.117 340.513 906.773 354.386 919.385 366.997 940.824 396.004 952.175 388.437 968.57 377.086 984.965 366.997 998.838 358.169 1024.06 344.296 1059.37 326.64 1095.95 312.767 1131.26 301.417 1170.36 293.85 1204.41 288.805 1242.24 287.544 1275.03 290.066 1266.2 258.538 1257.38 238.359 1239.72 205.569 1213.23 168.995 1184.23 137.466 1152.7 107.198 1117.39 83.2365 1084.6 65.5802 1055.59 54.2298 1024.06 44.1406 990.01 40.3571 945.869 36.5736 906.773 40.3571 866.416 47.924 829.842 59.2745 788.224 76.9307 746.606 99.6315 712.555 124.855 679.764 152.6 652.019 184.129 640.669 171.518 620.49 148.817 591.483 124.855 568.783 107.198 553.649 98.3704 530.948 85.7588 509.508 74.4084",
      index: "1",
    },
    {
      href: "/education",
      title: "Education",
      points:
        "990.01 427.533 1020.28 407.354 1048.02 390.959 1075.77 377.086 1102.25 366.997 1128.74 358.169 1157.74 349.341 1189.27 345.557 1215.76 340.513 1251.07 341.774 1272.51 343.035 1286.38 344.296 1286.38 360.691 1288.9 379.609 1287.64 406.093 1286.38 433.839 1281.34 461.584 1275.03 485.546 1266.2 519.597 1253.59 552.387 1240.98 577.611 1225.85 607.878 1201.88 649.497 1180.44 678.503 1156.48 710.032 1131.26 739.039 1093.42 781.918 1061.9 812.186 1048.02 800.836 1032.89 789.485 1015.23 773.09 996.315 759.217 969.831 744.084 944.608 728.95 909.295 712.555 877.766 699.943 855.066 692.376 900.467 641.93 928.213 601.573 947.13 567.521 958.481 535.992 966.047 493.113 962.264 448.972 976.137 437.622 988.748 427.533",
      index: "2",
    },
    {
      href: "/Art",
      title: "Art",
      points:
        "757.956 770.568 808.403 733.994 847.499 746.606 891.639 764.262 937.041 785.702 979.92 814.708 1005.14 834.887 1022.8 850.021 981.181 885.333 926.952 928.213 873.983 966.047 813.447 1010.19 757.956 1049.28 716.338 1079.55 688.593 1099.73 657.064 1119.91 649.497 1119.91 643.191 1118.65 585.178 1077.03 547.343 1049.28 514.553 1027.84 528.425 984.965 544.82 947.13 573.827 895.423 591.483 866.416 620.49 824.798 650.758 843.715 659.586 842.454 682.287 824.798",
      index: "3",
    },
    {
      href: "/rights",
      title: "Rights",
      points:
        "49.1852 544.82 88.2811 524.642 119.81 512.03 152.6 501.941 180.346 494.374 210.613 489.33 245.926 485.546 288.805 485.546 326.64 489.33 340.513 493.113 343.035 519.597 349.341 543.559 360.691 570.044 374.564 597.789 387.176 620.49 412.399 653.28 437.622 678.503 466.629 707.51 498.158 733.994 529.687 757.956 577.611 792.008 566.26 807.141 548.604 834.887 532.209 858.849 515.814 887.856 501.941 914.34 484.285 953.436 467.89 992.532 443.928 974.876 411.138 953.436 377.086 926.952 334.207 894.161 300.156 865.155 237.098 808.403 196.741 765.523 124.855 682.287 87.0199 620.49 59.2745 568.783",
      index: "4",
    },
    {
      href: "/technology",
      title: "Technology",
      points:
        "348.08 437.622 295.111 432.577 232.053 432.577 175.301 441.406 139.989 448.972 78.1918 470.412 31.529 491.852 20.1785 445.189 15.1339 383.392 18.9174 334.207 27.7455 295.111 46.6629 243.404 64.3191 208.091 97.1092 162.689 133.683 124.855 179.085 87.0199 235.837 59.2745 283.761 44.1406 334.207 37.8348 383.392 39.0959 412.399 59.2745 446.45 88.2811 486.807 128.638 518.336 168.995 546.082 209.352 572.566 261.06 587.7 307.723 596.528 339.252 561.216 321.595 518.336 312.767 475.457 315.29 441.406 325.379 406.093 346.819 377.086 377.086 356.908 408.615 351.863 422.488",
      index: "5",
    },
  ];

const handleTooltip = (e, text) => {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY - 20}px`;
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
  }
};

const hideTooltip = () => {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.opacity = 0;
  }
};


  return (
    <div className="flex justify-center items-center flex-col min-h-screen  mb-10 font-lato">
      <div className="text-center  text-[24px] leading-[34px] text-[#3c3950] font-lato font-normal mb-4">
        <h4>
          Protsahan’s Adolescent Girl Framework
          <br />
          Empowering the Agency of Girls in Underserved Communities
          <br />
          Through The Lens of Intersectionality
        </h4>
      </div>
      {/* <div className="w-[70%] flex flex-col items-center ">
      <svg
  style={{ width: "100%" }}
  className="hidden md:block max-w-full h-auto"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 2742 1542"
>
  <image href="heart-model.jpeg" style={{ width: "2742px" }} />
  {quickLink.map((item, ind) => {
    return (
      <Link key={ind} to={item.href}  title={item.title}>
        <g>
          <polygon
            className="image-mapper-shape"
            data-index={item.index}
            points={item.points}
          />
        </g>
      </Link>
    );
  })}

 
</svg>

      </div> */}

      <div className="bg-[#e04729] p-5 px-12 text-white font-bold font-montserrat text-justify mx-0 mt-8 w-2/3 text-xl max-md:w-full max-md:text-center max-md:px-2 ">
        <h1>
          Protsahan's H.E.A.R.T model is a holistic, flexible, first-of its kind gender transformative approach seamlessly blending physical, mental, material and emotional well-being of a survivor of sexual and gender based violence(SGBV)
        </h1>
        <hr className="my-4 "/>
        <h1 className="text-xl" >USE THE HEART MODEL BELOW TO UNDERSTAND OUR IMPACT IN DIFFERENT DOMAINS</h1>
      </div>

     <div className="flex flex-col h-auto py-9 max-md:w-full w-[45vw] p-4 items-center">
  <svg
    style={{ width: "100%", height: "auto" }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1328 1126"
  >
    <style>
      {`
        .image-mapper-shape {
          fill: rgba(0, 0, 0, 0); /* Transparent fill */
          stroke: transparent; /* Default stroke color */
          transition: all 0.3s ease; /* Smooth transition */
        }
        g:hover .image-mapper-shape {
          stroke: rgba(255, 255, 255, 0.2); /* Light glowing stroke on hover */
          stroke-width: 3px; /* Increased stroke width on hover */
          opacity: 1; /* Full opacity on hover */
          fill: rgba(255, 255, 255, 0.3); /* Slightly visible fill */
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7)); /* Futuristic glow effect */
        }
      `}
    </style>

    {/* Background Image */}
    <image
      xlinkHref="mobi-heart.jpeg"
      width="1328"
      height="1126"
    />

    {/* Technology Links */}
    {mobQuickLink.map((item, ind) => (
      <Link key={ind} to={item.href}>
        <g
          className="group"
          onMouseEnter={(e) => handleTooltip(e, `Hi, I am ${item.title}`)}
          onMouseLeave={hideTooltip}
        >
          <polygon className="image-mapper-shape" points={item.points} />
        </g>
      </Link>
    ))}
  </svg>

  {/* Tooltip */}
  <div
  id="tooltip"
  className="fixed p-3 rounded-lg shadow-xl opacity-0 scale-90 transform transition-all duration-300 pointer-events-none bg-gradient-to-r from-[#ce441a] via-[#ce441a] to-[#ce441a] text-white text-xs 
  animate-tooltip-tooltipIn hover:opacity-100 hover:scale-100 hover:translate-y-2"  style={{
    pointerEvents: "none",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(4px)",
    filter: "brightness(1.3)",
    animation: "tooltip-glow 1.5s infinite alternate, tooltip-slide 0.3s ease-out",
  }}
/>
</div>

<style jsx>{`
  @keyframes tooltip-glow {
    0% {
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    }
    100% {
      box-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 105, 180, 1);
    }
  }

  @keyframes tooltip-slide {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  #tooltip {
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255,);
    filter: brightness(1.3);
    animation: tooltip-glow 1.5s infinite alternate, tooltip-slide 0.3s ease-out;
  }

  @media (prefers-reduced-motion: no-preference) {
    #tooltip {
      animation: tooltip-glow 2s infinite alternate, tooltip-slide 0.3s ease-out;
    }
  }
`}</style>



      {/* THIS IS OUR CARDS AREA WHICH ARE GETTING DATA FROM THE ARRAY OBJECT  */}
      <div className=" w-full bg-[#212331] flex justify-center gap-5 p-4 max-md:flex-col flex-wrap">
        {cards.map((item, index) => (
          <div
            key={index}
            className="max-md:mb-4 p-5 h-[38vh] max-xs:overflow-hidden  max-md:h-full flex justify-evenly rounded-lg max-xs:flex-col max-xs:items-center lg:w-[30%]  flex-col items-center w-[45%] max-md:w-full"
            style={{ backgroundColor: item.color }}
          >
            <div className="max-xs:text-center text-center text-white flex flex-col flex-wrap ">
              <h1 className="py-2 font-medium text-2xl max-md:text-3xl max-xs:text-2xl">{item.heading}</h1>
              <p className="text-base ">{item.desc}</p>
            </div>
            <div className="text-6xl max-md:text-6xl w-full text-white flex justify-center p-4">

              {item.ico}
            </div>
          </div>
        ))}



      </div>


    </div>
  );
};


export default HeartModel;
