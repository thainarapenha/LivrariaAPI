BEGIN;

-- Books
CREATE TABLE books (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(150) NOT NULL,
  publisher VARCHAR(150),
  isbn VARCHAR(20),
  description TEXT,
  image_url TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_preorder BOOLEAN NOT NULL DEFAULT FALSE,
  release_date DATE,
  is_new_release BOOLEAN NOT NULL DEFAULT FALSE,
  promotion_price NUMERIC(10, 2),
  promotion_starts_at TIMESTAMPTZ,
  promotion_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT books_isbn_unique UNIQUE (isbn),

  CONSTRAINT books_promotion_check
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
    )
);

-- Categories
CREATE TABLE categories (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Book categories relationship
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

-- Customers
CREATE TABLE customers (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX customers_email_unique
  ON customers (LOWER(email));

-- Orders
CREATE TABLE orders (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'confirmed',
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT orders_customer_fk
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
    ON DELETE RESTRICT,

  CONSTRAINT orders_status_check
    CHECK (status IN ('confirmed', 'cancelled'))
);

-- Order items
CREATE TABLE order_items (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id INTEGER NOT NULL,
  book_id INTEGER,
  book_title VARCHAR(200) NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT order_items_order_fk
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE RESTRICT,

  CONSTRAINT order_items_book_fk
    FOREIGN KEY (book_id)
    REFERENCES books(id)
    ON DELETE SET NULL,

  CONSTRAINT order_items_subtotal_nonnegative_check
    CHECK (subtotal >= 0),

  CONSTRAINT order_items_subtotal_matches_quantity_check
    CHECK (subtotal = unit_price * quantity)
);

-- Initial categories
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

-- Indexes
CREATE INDEX orders_customer_created_at_idx
  ON orders (customer_id, created_at DESC);

CREATE INDEX order_items_order_id_idx
  ON order_items (order_id);

CREATE INDEX books_active_idx
  ON books (is_active);

CREATE INDEX book_categories_category_id_idx
  ON book_categories (category_id);

CREATE INDEX books_preorder_idx
  ON books (is_preorder)
  WHERE is_preorder = TRUE;

CREATE INDEX books_new_release_idx
  ON books (is_new_release)
  WHERE is_new_release = TRUE;

COMMIT;