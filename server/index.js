const express = require('express');
const app = express();
const PORT = 8000;

const { body, validationResult } = require('express-validator');
const { User } = require('./models');

function UserValidation() {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('identity_number')
      .notEmpty()
      .withMessage('Identity number is required')
      .matches(/^\d+$/)
      .withMessage('Invalid identity number format'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('date_of_birth')
      .notEmpty()
      .withMessage('Date of birth is required')
      .isDate()
      .withMessage('Invalid date of birth format'),
  ];
}

app.use(express.json());

app.post('/users', UserValidation(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, identity_number, email, date_of_birth } = req.body;

  try {
    const result = await User.create({
      name,
      identity_number,
      email,
      date_of_birth,
    });

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}`);
});
