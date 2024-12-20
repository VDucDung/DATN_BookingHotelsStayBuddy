//không có đơn vị 'px'
export const breakpointsWithoutPx: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

//có đơn vị 'px' từ phiên bản không có px
export const breakpoints: Record<string, string> = Object.fromEntries(
  Object.entries(breakpointsWithoutPx).map(([key, value]) => [
    key,
    `${value}px`,
  ])
);
