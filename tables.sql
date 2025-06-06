CREATE TABLE staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE customers
ADD COLUMN image_url VARCHAR(255);
ALTER TABLE customers
ADD COLUMN gender ENUM('male', 'female', 'other') DEFAULT NULL;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  category VARCHAR(50),
  image_url VARCHAR(255),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES staff(id) ON DELETE CASCADE
);
ALTER TABLE products
ADD COLUMN age_group VARCHAR(10) NOT NULL DEFAULT '0+',
ADD COLUMN volume INT,
ADD COLUMN items_in_set INT DEFAULT 1,
ADD COLUMN is_hypoallergenic BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN application TEXT,
ADD COLUMN composition TEXT,
ADD COLUMN brand VARCHAR(100),
ADD COLUMN contraindications TEXT,
ADD COLUMN type VARCHAR(100) NOT NULL DEFAULT 'hand cream';

CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


INSERT INTO products (
  name, description, price,
  stock_quantity, category, image_url,
  created_by, age_group, volume,
  items_in_set, is_hypoallergenic, application,
  composition, brand, contraindications, type,
  is_bestseller)
  VALUES (
    'test', '', 1000,
    100, 'Cleaning', '/images/aha.png',
    '1', '0+', 90,
    0, true, '',
    '', 'some by mi', '', 'Cleansing gel',
    false);
