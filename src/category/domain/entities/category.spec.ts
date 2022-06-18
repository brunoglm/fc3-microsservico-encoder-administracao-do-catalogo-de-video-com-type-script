import Category, { CategoryProperties } from './category'
import { omit } from 'lodash'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'

describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    let category = new Category({ name: 'Movie' })
    let props = omit(category.props, 'created_at')
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    })
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    })

    category = new Category({
      name: 'Movie',
      description: 'other description',
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    })

    category = new Category({
      name: 'Movie',
      is_active: true,
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    })

    created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at,
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    })
  })

  test('id field', () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId }
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ]

    data.forEach((i) => {
      const category = new Category(i.props, i.id)
      expect(category.id).not.toBeNull()
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    })
  })

  test('getter of name prop', () => {
    const category = new Category({ name: 'Movie' })
    expect(category.name).toBe('Movie')
  })

  test('getter and setter of description prop', () => {
    let category = new Category({ name: 'Movie' })
    expect(category.description).toBeNull()

    category = new Category({ name: 'Movie', description: 'some description' })
    expect(category.description).toBe('some description')

    category = new Category({
      name: 'Movie',
    })

    category['description'] = 'other description'
    expect(category.description).toBe('other description')

    category['description'] = undefined
    expect(category.description).toBeNull()

    category['description'] = null
    expect(category.description).toBeNull()
  })

  test('getter and setter of is_active prop', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: true,
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: false,
    })
    expect(category.is_active).toBeFalsy()
  })

  test('getter of created_at prop', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at,
    })
    expect(category.created_at).toBe(created_at)
  })

  test('Given that the update method was called, then it should update correctly', () => {
    const category = new Category({
      name: 'first name',
      description: 'first description',
    })

    const categoryDataToUpdate = {
      name: 'second name',
      description: 'second description',
    }

    category.update(categoryDataToUpdate.name, categoryDataToUpdate.description)

    expect(category.name).toBe(categoryDataToUpdate.name)
    expect(category.description).toBe(categoryDataToUpdate.description)
  })

  test('Given that the update method was called and description is null, then it should update correctly', () => {
    const category = new Category({
      name: 'first name',
      description: 'first description',
    })

    const categoryDataToUpdate = {
      name: 'second name',
    }

    category.update(categoryDataToUpdate.name, undefined)

    expect(category.name).toBe(categoryDataToUpdate.name)
    expect(category.description).toBeNull()
  })

  test('Given that the deactivate method was called, then it should change the category status to false', () => {
    const category = new Category({ name: 'Movie' })

    category.deactivate()

    expect(category.is_active).toBeFalsy()
  })

  test('Given that the activate method was called, then it should change the category status to true', () => {
    const category = new Category({ name: 'Movie', is_active: false })

    category.activate()

    expect(category.is_active).toBeTruthy()
  })
})