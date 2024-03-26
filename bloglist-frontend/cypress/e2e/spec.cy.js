describe('Front page loads', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })
})


describe('User Creation and Login', function() {
  it('should create a new user and login', function() {
    const username = 'user-' + Math.floor(Math.random() * 1000) + 1

    cy.request('POST', 'http://localhost:3000/api/users', {
      username: username,
      password: 'testpassword'
    }).then(createResponse => {
      expect(createResponse.status).to.eq(201) 

      cy.request('POST', 'http://localhost:3000/api/login', {
        username: username,
        password: 'testpassword'
      }).then(loginResponse => {
        expect(loginResponse.status).to.eq(200)

      })
    })
  })
})

describe('Blog app', function() {
  const username = 'user-' + Math.floor(Math.random() * 10000) + 1
  let authToken

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/users', {
        username: username,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201) 
        cy.request('POST', 'http://localhost:3000/api/login', {
          username: username,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 

          authToken = loginResponse.body.token
        })
      })
    })

    it('A blog can be created', function() {

      const blogName = 'Blog ' + Date.now()

      cy.visit('http://localhost:3000')
      cy.contains('Login').click()
      cy.get('input[name="username"]').type(username)
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()

      cy.contains('new blog').should('be.visible')

      cy.contains('new blog').click()
      cy.get('input[name="blogName"]').type(blogName)
      cy.get('input[name="blogAuthor"]').type('John Doe')
      cy.get('input[name="blogUrl"]').type('https://example.com')

      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          title: blogName,
          author: 'John Doe',
          url: 'https://example.com'
        }
      }).then(blogResponse => {
        expect(blogResponse.status).to.eq(201) 

        cy.reload()

        cy.contains(blogName).should('be.visible')
      })

    })
  })
})

describe('Blog app', function() {
  const username = 'user--' + Date.now()
  let authToken
  let blogId

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/users', {
        username: username,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201)

        cy.request('POST', 'http://localhost:3000/api/login', {
          username: username,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 

          authToken = loginResponse.body.token
        })
      })
    })

    it('Users can like a blog', function() {

      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          title: 'Test Blog',
          author: 'John Doe',
          url: 'https://example.com'
        }
      }).then(blogResponse => {
        expect(blogResponse.status).to.eq(201) 

        blogId = blogResponse.body.id
      })

      cy.visit('http://localhost:3000')

      cy.contains('Test Blog').parent().find('button').click()
      cy.contains('Like').click()
      cy.wait(1000)
      cy.contains('Likes: 1')
    })
  })
})



describe('Blog app', function() {
  const username = 'user-' + Math.floor(Math.random() * 10000) + 1
  let authToken
  let blogId

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/users', {
        username: username,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201) 
        cy.request('POST', 'http://localhost:3000/api/login', {
          username: username,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 

          authToken = loginResponse.body.token
        })
      })
    })

    it('A blog can be created and deleted by the user', function() {
      const blogName = 'Blog-' + Math.floor(Math.random() * 100) + 1

      cy.visit('http://localhost:3000')
      cy.contains('Login').click()
      cy.get('input[name="username"]').type(username)
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()

      cy.contains('new blog').should('be.visible')

      cy.contains('new blog').click()
      cy.get('input[name="blogName"]').type(blogName)
      cy.get('input[name="blogAuthor"]').type('John Doe')
      cy.get('input[name="blogUrl"]').type('https://example.com')


      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          title: blogName,
          author: 'John Doe',
          url: 'https://example.com'
        }
      }).then(blogResponse => {
        expect(blogResponse.status).to.eq(201) 

        blogId = blogResponse.body.id

        cy.reload()

        cy.contains(blogName).should('be.visible')
      })

      cy.contains(blogName).parent().within(() => {
        cy.contains('View Details').click()
        cy.contains('Delete').click()
      })

      cy.contains(blogName).should('not.exist')
    })
  })
})

describe('Blog app', function() {
  const creatorUsername = 'user-' + Date.now()
  const otherUsername = 'user-' + (Date.now() + 1)
  let creatorAuthToken
  let otherAuthToken
  let blogId

  describe('When logged in', function() {
    beforeEach(function() {
      
      cy.request('POST', 'http://localhost:3000/api/users', {
        username: creatorUsername,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201) 
        
        cy.request('POST', 'http://localhost:3000/api/login', {
          username: creatorUsername,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 

          creatorAuthToken = loginResponse.body.token
        })
      })

      cy.request('POST', 'http://localhost:3000/api/users', {
        username: otherUsername,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201) 

      
        cy.request('POST', 'http://localhost:3000/api/login', {
          username: otherUsername,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 

          otherAuthToken = loginResponse.body.token
        })
      })
    })

    it('Creator can see the delete button, others cannot', function() {
      const blogName = 'Blog ' + Date.now()
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `Bearer ${creatorAuthToken}`
        },
        body: {
          title: blogName,
          author: 'John Doe',
          url: 'https://example.com'
        }
      }).then(blogResponse => {
        expect(blogResponse.status).to.eq(201) 
        blogId = blogResponse.body.id
      })


      cy.visit('http://localhost:3000')
      cy.contains('Login').click()
      cy.get('input[name="username"]').type(creatorUsername)
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()

      cy.contains(blogName).parent().within(() => {
        cy.contains('View Details').click({ force: true })
        cy.contains('Delete').should('be.visible')
      })

      cy.contains('Logout').click()

      cy.contains('Login').click()
      cy.get('input[name="username"]').type(otherUsername)
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()

      cy.contains(blogName).parent().within(() => {
        cy.contains('View Details').click({ force: true })
        cy.contains('Delete').should('not.exist')
      })
    })

    after(function() {
      cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/api/blogs/${blogId}`,
        headers: {
          Authorization: `Bearer ${creatorAuthToken}`
        }
      }).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(204) 
      })
    })
  })
})


describe('Blog app', function() {
  const username = 'user-' + Math.floor(Math.random() * 1000) + 1
  let authToken

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/users', {
        username: username,
        password: 'testpassword'
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201) 

        cy.request('POST', 'http://localhost:3000/api/login', {
          username: username,
          password: 'testpassword'
        }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200) 
          authToken = loginResponse.body.token
        })
      })
    })

    it('Blogs are ordered by likes', function() {
      const blog1 = {
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com',
        likes: 5
      }
      const blog2 = {
        title: 'Blog 2',
        author: 'Author 2',
        url: 'https://example.com',
        likes: 10
      }
      const blog3 = {
        title: 'Blog 3',
        author: 'Author 3',
        url: 'https://example.com',
        likes: 3
      }
    
      cy.visit('http://localhost:3000')
      cy.contains('Login').click()
      cy.get('input[name="username"]').type(username)
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button[type="submit"]').click()
      
      cy.contains('new blog').should('be.visible')
      
      createBlog(blog1)
      createBlog(blog2)
      createBlog(blog3)
      
      // Increase likes
      for (let i = 0 i < 5 i++) {
        likeBlog(blog1)
      }
      
      for (let i = 0 i < 3 i++) {
        likeBlog(blog3)
      }
    
      cy.reload()
      
      cy.get('.blog').eq(0).should('contain', blog1.title)
      cy.get('.blog').eq(1).should('contain', blog2.title)
      cy.get('.blog').eq(2).should('contain', blog3.title)
    })

    function createBlog(blog) {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: {
          title: blog.title,
          author: blog.author,
          url: blog.url
        }
      }).then(blogResponse => {
        expect(blogResponse.status).to.eq(201) 

        cy.reload()
      })
    }

    function likeBlog(blog) {
      cy.contains(blog.title).parent().find('button').contains('View Details').click({ force: true }).wait(500)
      cy.contains(blog.title).parent().find('button').contains('Like').should('be.visible').click({ force: true }).wait(500)
    }
  })
})