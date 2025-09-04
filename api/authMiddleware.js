export const authMiddleware = (req, res, next) => {
  if (req.currentUser) {
    next()
  } else {
    res.status(405).json({ error: 'Unauthorized' })
  }
}
