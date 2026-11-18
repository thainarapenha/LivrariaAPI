
BEGIN;

-- Create categories
CREATE TABLE categories (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create book categories relationship
CREATE TABLE book_categories (
  book_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (book_id, category_id),
  CONSTRAINT book_categories_book_fk
    FOREIGN KEY (book_id)
    REFERENCES books(id)
    ON DELETE CASCADE,
  CONSTRAINT book_categories_category_fk
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);

-- Add catalog fields to books
ALTER TABLE books
  ADD COLUMN is_preorder BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN release_date DATE,
  ADD COLUMN is_new_release BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN promotion_price NUMERIC(10, 2),
  ADD COLUMN promotion_starts_at TIMESTAMPTZ,
  ADD COLUMN promotion_ends_at TIMESTAMPTZ;

-- Validate promotion data
ALTER TABLE books
  ADD CONSTRAINT books_promotion_check
  CHECK (
    (
      promotion_price IS NULL
      AND promotion_starts_at IS NULL
      AND promotion_ends_at IS NULL
    )
    OR
    (
      promotion_price IS NOT NULL
      AND promotion_price > 0
      AND promotion_price < price
      AND promotion_starts_at IS NOT NULL
      AND promotion_ends_at IS NOT NULL
      AND promotion_starts_at < promotion_ends_at
    )
  );

-- Create indexes
CREATE INDEX book_categories_category_id_idx
  ON book_categories(category_id);

CREATE INDEX books_preorder_idx
  ON books(is_preorder)
  WHERE is_preorder = TRUE;

CREATE INDEX books_new_release_idx
  ON books(is_new_release)
  WHERE is_new_release = TRUE;

-- Insert initial categories
INSERT INTO categories (name, slug)
VALUES
  ('Ficção', 'ficcao'),
  ('Terror e suspense', 'terror-e-suspense'),
  ('HQs e mangás', 'hqs-e-mangas'),
  ('Fantasia', 'fantasia'),
  ('Romance', 'romance'),
  ('Infantil', 'infantil'),
  ('Ação', 'acao'),
  ('Serial killers', 'serial-killers'),
  ('Poesia', 'poesia'),
  ('Não ficção', 'nao-ficcao')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
