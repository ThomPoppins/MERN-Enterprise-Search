GitHub Copilot: To create a one-to-one relationship between a `User` model and an `Owner` model, you can add a `userId` field to the `Owner` model that references the `_id` field of the `User` model. This will allow you to associate each `Owner` document with a single `User` document.

Here's an example of how you can set up the `Owner` model with a `userId` field:

```javascript
const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
})

const Owner = mongoose.model('Owner', ownerSchema)

module.exports = Owner
```

In this example, the `userId` field is a `ObjectId` reference to the `User` model, and the `ref` option specifies the name of the referenced model. The `required` option specifies that the `userId` field is required, and the `unique` option specifies that the `userId` field must be unique.

To create a new `Owner` document associated with a `User` document, you can create a new `Owner` document that includes the `userId` field. For example:

```javascript
const Owner = require('./models/owner')

const user = new User({ name: 'John Doe', email: 'johndoe@example.com' })

user.save()

const owner = new Owner({
  name: 'Acme Inc.',
  userId: user._id,
})

owner.save()
```

In this example, a new `User` document is created and saved to the database. A new `Owner` document is then created that includes the `userId` field, which references the `_id` field of the `user` document.

To query for the `Owner` document associated with a `User` document, you can use the `findOne()` method on the `Owner` model to find the document that has a `userId` field matching the `_id` of the `user` document. For example:

```javascript
Owner.findOne({ userId: user._id }, (err, owner) => {
  console.log(owner)
})
```

In this example, the `findOne()` method is used to find the document in the `Owner` collection that has a `userId` field matching the `_id` of the `user` document. The result is then logged to the console.

By using a `userId` field in this way, you can represent a one-to-one relationship between a `User` model and an `Owner` model in MongoDB.
