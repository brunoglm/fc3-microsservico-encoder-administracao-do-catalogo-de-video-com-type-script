import UniqueEntityId from '../unique-entity-id.vo'
import InvalidUuidError from '../../../errors/invalid-uuid.error'
import { validate as uuidValidate } from 'uuid'

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
// }

describe('UniqueEntityId unit Tests', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks()
  // })

  const validadeSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
  // beforeEach(() => validadeSpy.mockClear())

  it('should throw error when uuid is invalid', () => {
    // const validadeSpy = spyValidateMethod()
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError())
    expect(validadeSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    // const validadeSpy = spyValidateMethod()
    const uuid = '5c60938a-39fc-40b7-811c-d3520dd906eb'
    const vo = new UniqueEntityId(uuid)
    expect(vo.value).toBe(uuid)
    expect(validadeSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    // const validadeSpy = spyValidateMethod()
    const vo = new UniqueEntityId()
    expect(uuidValidate(vo.value)).toBeTruthy()
    expect(validadeSpy).toHaveBeenCalled()
  })
})
