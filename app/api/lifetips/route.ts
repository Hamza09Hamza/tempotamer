import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3306,
});

export async function GET() {
  try {
    console.log("Getting user data...");
    console.log({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: 3306,
    });
    const [rows] = await db.query("SELECT * FROM lifeTips ORDER BY id ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching tips:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
