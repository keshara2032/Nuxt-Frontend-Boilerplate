const middleware = {}

middleware['auth-admin'] = require('../middleware/auth-admin.js')
middleware['auth-admin'] = middleware['auth-admin'].default || middleware['auth-admin']

middleware['auth-user'] = require('../middleware/auth-user.js')
middleware['auth-user'] = middleware['auth-user'].default || middleware['auth-user']

middleware['guest'] = require('../middleware/guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

export default middleware
