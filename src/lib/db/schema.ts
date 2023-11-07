import {
  boolean,
  date,
  numeric,
  pgTable,
  real,
  serial,
  text,
  varchar
} from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  paid: boolean("paid"),
  expense: text("expense").notNull(),
  monthlyValue: real("monthly_value").notNull(),
  date: date("date").notNull().defaultNow(),
  installments: numeric("installments").notNull(),
  totalValue: real("total_value").notNull(),
  description: text("description"),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});


