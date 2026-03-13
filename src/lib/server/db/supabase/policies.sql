-- Enable RLS and all access is denied by default
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public can read seasons"
ON seasons FOR SELECT USING (true);
