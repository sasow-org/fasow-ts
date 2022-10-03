
export const handlePercentageValueRange = (newValue) => {
    if(newValue < 0.001 && newValue > 0 ){
        return 0.001;
    }else if(newValue > 100){
        return 100;
    }
    return newValue;
}
