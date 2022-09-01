const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateProductQuantity = (req, res, next) => {
  const [product] = req.body;

  if (product.quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (product.quantity <= 0) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

const validateProductId = (req, res, next) => {
  const [body] = req.body;
  if (body.productId === undefined) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

module.exports = {
  nameValidation,
  validateProductQuantity,
  validateProductId,
};
