BEGIN;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM unnest(
      ARRAY[
        'ficcao',
        'terror-e-suspense',
        'hqs-e-mangas',
        'fantasia',
        'romance',
        'infantil',
        'acao',
        'serial-killers',
        'poesia',
        'nao-ficcao'
      ]::text[]
    ) AS expected(slug)
    WHERE NOT EXISTS (
      SELECT 1
      FROM categories
      WHERE categories.slug = expected.slug
    )
  ) THEN
    RAISE EXCEPTION 'Uma ou mais categorias esperadas não existem';
  END IF;
END
$$;

WITH seed_books (
  title,
  author,
  publisher,
  isbn,
  description,
  image_url,
  price,
  stock_quantity,
  is_active,
  is_preorder,
  release_date,
  is_new_release,
  promotion_price,
  promotion_starts_at,
  promotion_ends_at
) AS (
  VALUES
    (
      'O Mapa das Marés',
      'Helena Duarte',
      'Editora Horizonte',
      '9786500001001',
      'Uma cartógrafa retorna à cidade costeira onde cresceu para decifrar um mapa que muda a cada maré.',
      NULL,
      54.90,
      18,
      TRUE,
      FALSE,
      CURRENT_DATE - 120,
      FALSE,
      44.90,
      CURRENT_TIMESTAMP - INTERVAL '15 days',
      CURRENT_TIMESTAMP + INTERVAL '15 days'
    ),
    (
      'A Casa no Fim da Linha',
      'Rafael Montenegro',
      'Sombra Editorial',
      '9786500001002',
      'Uma investigadora encontra registros de desaparecimentos ligados a uma casa abandonada na última estação.',
      NULL,
      69.90,
      11,
      TRUE,
      FALSE,
      CURRENT_DATE - 45,
      FALSE,
      54.90,
      CURRENT_TIMESTAMP - INTERVAL '10 days',
      CURRENT_TIMESTAMP + INTERVAL '35 days'
    ),
    (
      'Jardim de Vidro',
      'Lívia Campos',
      'Pétala Livros',
      '9786500001003',
      'Em uma cidade onde as plantas guardam memórias, uma jovem jardineira precisa escolher quais lembranças salvar.',
      NULL,
      82.50,
      7,
      TRUE,
      FALSE,
      CURRENT_DATE - 30,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Cartas para Aurora',
      'Marina Valença',
      'Casa das Letras',
      '9786500001004',
      'Cartas encontradas em um sótão reconstroem uma história de amor atravessada por décadas e silêncios.',
      NULL,
      42.90,
      23,
      TRUE,
      FALSE,
      CURRENT_DATE - 210,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Asas de Papel',
      'Caio Nogueira',
      'Pequeno Leitor',
      '9786500001005',
      'Duas crianças constroem uma cidade de papel para descobrir que coragem também pode ser delicada.',
      NULL,
      34.90,
      31,
      TRUE,
      FALSE,
      CURRENT_DATE - 365,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'O Último Farol',
      'Otávio Reis',
      'Norte Sul',
      '9786500001006',
      'O novo faroleiro precisa manter a luz acesa enquanto uma tempestade revela segredos enterrados na ilha.',
      NULL,
      64.90,
      14,
      TRUE,
      FALSE,
      CURRENT_DATE - 12,
      TRUE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Manual das Pequenas Invenções',
      'Beatriz Tavares',
      'Oficina do Saber',
      '9786500001007',
      'Experimentos simples e ideias práticas para transformar curiosidade em invenções feitas em casa.',
      NULL,
      48.00,
      26,
      TRUE,
      FALSE,
      CURRENT_DATE - 90,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'O Reino Depois da Chuva',
      'Samuel Ferraz',
      'Editora Horizonte',
      '9786500001008',
      'Após uma chuva que dura cem anos, três irmãos atravessam um reino submerso em busca de sua origem.',
      NULL,
      99.90,
      9,
      TRUE,
      FALSE,
      CURRENT_DATE - 20,
      FALSE,
      79.90,
      CURRENT_TIMESTAMP - INTERVAL '5 days',
      CURRENT_TIMESTAMP + INTERVAL '20 days'
    ),
    (
      'Anatomia de um Silêncio',
      'Joana Ribeiro',
      'Casa das Letras',
      '9786500001009',
      'Poemas sobre ausência, cuidado e as palavras que continuam vivas mesmo depois de não serem ditas.',
      NULL,
      39.90,
      16,
      TRUE,
      FALSE,
      CURRENT_DATE - 180,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'O Colecionador de Ecos',
      'Daniel Vilar',
      'Sombra Editorial',
      '9786500001010',
      'Um perito em gravações antigas percebe que os ecos de uma coleção escondem pistas de crimes esquecidos.',
      NULL,
      89.90,
      5,
      TRUE,
      FALSE,
      CURRENT_DATE - 240,
      FALSE,
      69.90,
      CURRENT_TIMESTAMP - INTERVAL '120 days',
      CURRENT_TIMESTAMP - INTERVAL '60 days'
    ),
    (
      'Histórias do Bairro Azul',
      'Marta Silveira',
      'Pequeno Leitor',
      '9786500001011',
      'Narrativas curtas sobre os moradores de um bairro onde cada janela guarda uma aventura diferente.',
      NULL,
      29.90,
      40,
      TRUE,
      FALSE,
      CURRENT_DATE - 300,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Revolução em Quadrinhos',
      'Igor Paes',
      'Traço Livre',
      '9786500001012',
      'Uma graphic novel sobre jovens artistas que transformam um pequeno estúdio em ponto de encontro da cidade.',
      NULL,
      59.90,
      12,
      TRUE,
      FALSE,
      CURRENT_DATE - 8,
      TRUE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Depois do Inverno',
      'Clara Monteiro',
      'Pétala Livros',
      '9786500001014',
      'Duas pessoas se reencontram em uma estação serrana e precisam decidir o que fazer com uma promessa antiga.',
      NULL,
      45.90,
      19,
      TRUE,
      FALSE,
      CURRENT_DATE - 18,
      TRUE,
      NULL,
      NULL,
      NULL
    ),
    (
      'A Biblioteca do Amanhã',
      'Teresa Avelar',
      'Norte Sul',
      '9786500001015',
      'Uma bibliotecária descobre que os livros de uma sala secreta contam acontecimentos que ainda não ocorreram.',
      NULL,
      119.90,
      0,
      TRUE,
      TRUE,
      CURRENT_DATE + 90,
      FALSE,
      NULL,
      NULL,
      NULL
    ),
    (
      'Navegantes do Vento',
      'Lucas Andrade',
      'Editora Horizonte',
      '9786500001016',
      'Pilotos de navios voadores atravessam arquipélagos suspensos para impedir que o céu perca suas correntes.',
      NULL,
      109.90,
      0,
      TRUE,
      TRUE,
      CURRENT_DATE + 150,
      FALSE,
      NULL,
      NULL,
      NULL
    )
),
inserted_books AS (
  INSERT INTO books (
    title,
    author,
    publisher,
    isbn,
    description,
    image_url,
    price,
    stock_quantity,
    is_active,
    is_preorder,
    release_date,
    is_new_release,
    promotion_price,
    promotion_starts_at,
    promotion_ends_at
  )
  SELECT
    title,
    author,
    publisher,
    isbn,
    description,
    image_url,
    price,
    stock_quantity,
    is_active,
    is_preorder,
    release_date,
    is_new_release,
    promotion_price,
    promotion_starts_at,
    promotion_ends_at
  FROM seed_books
  ON CONFLICT (isbn) DO NOTHING
  RETURNING id, isbn
),
seed_categories (isbn, category_slug) AS (
  VALUES
    ('9786500001001', 'ficcao'),
    ('9786500001001', 'acao'),
    ('9786500001002', 'terror-e-suspense'),
    ('9786500001002', 'serial-killers'),
    ('9786500001003', 'fantasia'),
    ('9786500001003', 'romance'),
    ('9786500001004', 'romance'),
    ('9786500001004', 'poesia'),
    ('9786500001005', 'infantil'),
    ('9786500001005', 'ficcao'),
    ('9786500001006', 'ficcao'),
    ('9786500001006', 'acao'),
    ('9786500001007', 'nao-ficcao'),
    ('9786500001007', 'infantil'),
    ('9786500001008', 'fantasia'),
    ('9786500001008', 'acao'),
    ('9786500001009', 'poesia'),
    ('9786500001009', 'romance'),
    ('9786500001010', 'terror-e-suspense'),
    ('9786500001010', 'serial-killers'),
    ('9786500001011', 'infantil'),
    ('9786500001011', 'ficcao'),
    ('9786500001012', 'hqs-e-mangas'),
    ('9786500001012', 'acao'),
    ('9786500001014', 'romance'),
    ('9786500001014', 'ficcao'),
    ('9786500001015', 'fantasia'),
    ('9786500001015', 'ficcao'),
    ('9786500001016', 'fantasia'),
    ('9786500001016', 'hqs-e-mangas')
)
INSERT INTO book_categories (book_id, category_id)
SELECT inserted_books.id, categories.id
FROM seed_categories
INNER JOIN inserted_books
  ON inserted_books.isbn = seed_categories.isbn
INNER JOIN categories
  ON categories.slug = seed_categories.category_slug
ON CONFLICT (book_id, category_id) DO NOTHING;

COMMIT;
