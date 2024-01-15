import { generateElement } from '@/core/Renderer/definitions/generators';

export const Indicator = generateElement('Indicator', {
  elementAttributes:{
    className: "absolute indicator-shadow bg-gradient-to-r from-red-light to-red-dark shadow-lg h-10 transition-all duration-300 ease-in-out rounded-full cursor-pointer",
    style: {
      transform: "translateY(-72px)",
      width: "42px",
    }
  }
});