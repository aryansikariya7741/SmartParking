export const getDynamicPrice = (hour, demand) => {
    let basePrice = 50; // Base price
  
    if (hour >= 8 && hour <= 18) {
      basePrice *= 1.5; // Peak hours
    }
  
    if (demand > 70) {
      basePrice *= 1.2; // High demand surcharge
    }
  
    return basePrice.toFixed(2);
  };
  