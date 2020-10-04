import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/06'
import App from '../exercise/06'

beforeEach(() => jest.spyOn(window, 'fetch'))
afterEach(() => (window.fetch as jest.Mock).mockRestore())

test('displays the pokemon', async () => {
  render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  userEvent.type(input, 'pikachu')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /pikachu/i})

  // verify that a request is made when props change
  userEvent.clear(input)
  userEvent.type(input, 'ditto')
  userEvent.click(submit)

  // TODO: uncomment and fix that
  // await screen.findByRole('heading', {name: /ditto/i})

  // verify that when props remain the same a request is not made
  ;(window.fetch as jest.Mock).mockClear()
  userEvent.click(submit)

  // await screen.findByRole('heading', {name: /ditto/i})

  expect(
    window.fetch,
    'Make certain that you are providing a dependencies list in useEffect!',
  ).not.toHaveBeenCalled()
})