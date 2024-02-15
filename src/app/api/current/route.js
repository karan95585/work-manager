import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.status(401).json({ error: "Unauthorized" });
  }

  let data;
  try {
    data = jwt.verify(authToken, process.env.JWT_KEY);
  } catch (error) {
    return NextResponse.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findById(data._id).select("-password");
  return NextResponse.status(200).json(user);
}