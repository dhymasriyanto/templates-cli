UPDATE service set 
-- Your column to update here
WHERE id = ${id}
RETURNING id
