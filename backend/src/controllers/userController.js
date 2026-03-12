import User from "../models/User.js";

// POST /api/users      (admin)
export const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Full name, email, and password are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ fullName, email, password, role: role || "employee" });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// GET /api/users       (admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.json({ success: true, data: { users, total, page, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id   (admin)
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id   (admin)
export const updateUser = async (req, res, next) => {
  try {
    const { fullName, email, role, leaveBalance } = req.body;

    if (email !== undefined || role !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Email and role cannot be changed from the admin panel",
      });
    }

    const updates = {};

    if (fullName !== undefined) updates.fullName = fullName;
    if (leaveBalance !== undefined) updates.leaveBalance = leaveBalance;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields provided for update" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id   (admin)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ success: false, message: "Admin accounts cannot be deleted" });
    }

    await user.deleteOne();

    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
