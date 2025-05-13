import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Kết nối database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Kiểm tra xem đã có user admin chưa
    const adminExists = await User.findOne({ role: "admin" });
    
    if (!adminExists) {
      // Tạo user admin nếu chưa có
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }

    // Đóng kết nối
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

// Chạy seed
seedAdmin();
