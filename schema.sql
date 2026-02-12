DROP TABLE IF EXISTS invite_codes;
CREATE TABLE invite_codes (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  addedBy TEXT
);
