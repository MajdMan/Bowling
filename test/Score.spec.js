import {calculate,isValidPoints} from '@/logic/calculateScore'

describe('Calculating different bowling scores', () => {
  test('Calculate score all 3', () => {
    const result = calculate([[3,3],[3,3]])

    expect(result).toEqual([6,12])
  })
    test('Calculate score  spare', () => {
      const result = calculate([[5,5],[3,2]])
      expect(result).toEqual([13,18])
    })

    test('Calculate score  strike and spares', () => {
        const result = calculate([[5,5],[10,0],[5,5],[5,5]])
        expect(result).toEqual([20,40,55,65])
      })

      test('Calculate score with mixed input', () => {
        const result = calculate([[5,5],[10,0],[2,8],[5,3]])
        expect(result).toEqual([20,40,55,63])
      })

      test('Calculate score  strike and ones', () => {
        const result = calculate([[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[1,1],[1,1] ])
        expect(result).toEqual([30,60,90,120,150,180,201,213,215,217])
      })
      
      test('Calculate score  perfect game ', () => {
        const result = calculate([[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10] ])
        expect(result).toEqual([30,60,90,120,150,180,210,240,270,300])
      })
            
      test('Calculate score  perfect game ', () => {
        const result = calculate([[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[9,1],[3,3]])
        expect(result).toEqual([30,60,90,120,150,180,209,229,242,248])
      })
  })


  describe('Validate end-point input', () => {
    test('Should return false if points is undefined ', () => {
      const result = isValidPoints()
      expect(result).toEqual(false)
    })

    test('Should return false if points is empty', () => {
      const result = isValidPoints([])
      expect(result).toEqual(false)
    })
    
    test('Should return false if a frame does not have exactly 2 throws ', () => {
      const result = isValidPoints([[1,2],[2,2,3],[2,5]])
      expect(result).toEqual(false)
    })

    test('Should return false if a frame is not an array  ', () => {
      const result = isValidPoints([[1,2],[2,2,3],{}])
      expect(result).toEqual(false)
    })

    
    test('Should return false if a frame sum is more than 10 and not a bonus throw ', () => {
      const result = isValidPoints([[10,10],[0,2],[1,5]])
      expect(result).toEqual(false)
    })

    test('Should return true if input is valid', () => {
      const result = isValidPoints([[10,0],[0,2],[1,5]])
      expect(result).toEqual(true)
    })

    test('Should return true if input is valid withb extre throw', () => {
      const result = isValidPoints([[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10]])
      expect(result).toEqual(true)
    })
  })
 

