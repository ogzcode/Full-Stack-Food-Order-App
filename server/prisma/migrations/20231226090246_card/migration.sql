-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNo" TEXT NOT NULL,
    "totalPrice" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "cardType" TEXT NOT NULL DEFAULT 'cash',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "orderNo", "status", "totalPrice", "userId") SELECT "createdAt", "id", "orderNo", "status", "totalPrice", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNo_key" ON "Order"("orderNo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
