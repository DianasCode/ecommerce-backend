UPDATE "Product"
SET "imageUrl" = CASE "id"
  WHEN 1 THEN '/wireless-headphones.jpg'
  WHEN 2 THEN '/minimal-backpack.jpg'
  WHEN 3 THEN '/smart-desk-lamp.jpg'
  WHEN 4 THEN '/mechanical-keyboard.jpg'
  WHEN 5 THEN '/everyday-sneakers.jpg'
  WHEN 6 THEN '/travel-bottle.jpg'
  ELSE "imageUrl"
END
WHERE "id" IN (1, 2, 3, 4, 5, 6);
