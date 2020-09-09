import { IRound } from "../interfaces/app.interface";
export const calculate = (points: IRound[]): number[] => {
    const results: number[] = []
    for (let index = 0; index < points.length && index <= 9; index++) {
        const currentFrame = points[index]
        const firstThrow = currentFrame[0];
        const secondThrow = currentFrame[1]
        const nextResult = points[index + 1] || []
        const thirdResult = points[index + 2] || []
        const prevResult = results[index - 1] || 0;
        //2  extra balls  on the last round if it is a strike
        if (firstThrow === 10 && index === 9) {
            results[index] = prevResult+  firstThrow + nextResult[0] +  nextResult[1] ;
            return results;
        }
        else {
         //add the throws to the prev
            results[index] = prevResult + firstThrow + secondThrow
        }
        if (firstThrow + secondThrow === 10 && nextResult.length > 0 ) {
            //strike?
            if (firstThrow === 10) {
                if (nextResult[0] === 10 && thirdResult.length > 0) {
                    results[index] += nextResult[0] + thirdResult[0];
                }
                else {
                        results[index] += nextResult[0] + nextResult[1]
                }
            }
            else {
                results[index] += nextResult[0];
            }
        }  
    }
    return results;
}
export const isValidPoints = (points: IRound[]):boolean =>{
    if(!Array.isArray(points)){
        //case if points is not array.
      return false;
    }
    
    if(points.length === 0) {
        //case if array is empty
        return false
    }
    
    const hasInvalidThrow = points.some((frame,index)=>{
        if(!Array.isArray(frame) || frame.length  !==2 ){
            // frame does not contain throws or it does not contain exactly 2 throws.
            return true
        }
        const isExtraThrows  = index + 1 === points.length && points.length === 11;
        if(isExtraThrows)
        {
            return false;
        }
        const firstThrow = frame[0];
        const secondThrow = frame[1];
        // first + second throw exceeds 10
        return firstThrow + secondThrow > 10;
    })
    
    
    return !hasInvalidThrow
}