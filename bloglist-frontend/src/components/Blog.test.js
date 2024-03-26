import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, getByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog Component', () => {
  const blog = {
    id: 1,
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10,
    user: {
      username: 'johndoe',
    },
  }

  test('renders title and author by default', () => {
    render(<Blog blog={blog} />)
    const titleElement = screen.getByText(/Test Blog/i)
    const authorElement = screen.getByText(/by John Doe/i)
    const urlElement = screen.queryByText(/URL: https:\/\/example\.com/i)
    const likesElement = screen.queryByText(/Likes: 10/i)

    expect(titleElement).toBeTruthy()
    expect(authorElement).toBeTruthy()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('shows URL and number of likes when the button is clicked', () => {
    render(<Blog blog={blog} />)
    const viewDetailsButton = screen.getByText('View Details')
    fireEvent.click(viewDetailsButton)

    const element = screen.getByText('https://example.com')
    const element_likes = screen.getByText('Likes: 10')
    expect(element).toBeDefined()
    expect(element_likes).toBeDefined()
  })

  test('clicking the like button calls event handler twice', async () => {
    const blog = {
      id: 1,
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10,
      user: {
        username: 'johndoe',
      },
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const viewDetailsButton = screen.getByText('View Details')
    fireEvent.click(viewDetailsButton)
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

test('BlogForm updates and calls submit', async () => {
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog} />)

  const blogNameInput = screen.getByLabelText('Blog name:')
  const blogAuthorInput = screen.getByLabelText('Blog author:')
  const blogUrlInput = screen.getByLabelText('Blog URL:')
  const sendButton = screen.getByText('Save')

  await userEvent.type(blogNameInput, 'Testing Blog')
  await userEvent.type(blogAuthorInput, 'John Doe')
  await userEvent.type(blogUrlInput, 'https://www.example.com')
  await userEvent.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Blog',
    author: 'John Doe',
    url: 'https://www.example.com',
    likes: 0,
  })
})
